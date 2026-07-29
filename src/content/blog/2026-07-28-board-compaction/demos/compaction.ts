// Board-compaction harness. Pure functions on a sparse board — no UI, no DOM.
// Ported from the strategy handoff; shared by every demo and the metrics panel.
//
// Board = Map<cellId, stackId>. cellId = row*STRIDE + col, so numeric cellId
// order equals reading order (top-to-bottom, left-to-right). stackId is a
// stable chip identity that survives compaction — that's what lets us count
// how many chips actually MOVED between two settled boards.

export const STRIDE = 65536

export type Board = Map<number, number> // cellId -> stackId

export const toCell = (r: number, c: number) => r * STRIDE + c
export const rowOf = (cell: number) => Math.floor(cell / STRIDE)
export const colOf = (cell: number) => cell % STRIDE

/** A full `side`×`side` grid; stack ids assigned in reading order. */
export function fullGrid(side: number): Board {
  const b: Board = new Map()
  let id = 0
  for (let r = 0; r < side; r++)
    for (let c = 0; c < side; c++) b.set(toCell(r, c), id++)
  return b
}

const clone = (b: Board): Board => new Map(b)

/** Push v onto the array at m[k], creating it if absent. */
function group<T>(m: Map<number, T[]>, k: number, v: T): void {
  const a = m.get(k)
  if (a) a.push(v)
  else m.set(k, [v])
}

/** stackId -> cellId, for identity-preserving comparisons. */
function byStack(b: Board): Map<number, number> {
  const m = new Map<number, number>()
  for (const [cell, id] of b) m.set(id, cell)
  return m
}

// A settled board is stable in BOTH occupancy and assignment, so the fixpoint
// key includes the stackId — that's what makes settle-jitter observable.
const key = (b: Board): string =>
  [...b].map(([cell, id]) => `${cell}:${id}`).sort().join(",")

function fixpoint(b: Board, step: (x: Board) => Board): Board {
  let cur = b
  let prev = ""
  while (key(cur) !== prev) {
    prev = key(cur)
    cur = step(cur)
  }
  return cur
}

// --- Corner-pack (baseline): hole-free, local, lopsided ------------------

export function packRowsLeft(b: Board): Board {
  const rows = new Map<number, [number, number][]>() // r -> [col, id]
  for (const [cell, id] of b) group(rows, rowOf(cell), [colOf(cell), id])
  const out: Board = new Map()
  for (const [r, cells] of rows) {
    cells.sort((a, c) => a[0] - c[0])
    cells.forEach(([, id], i) => out.set(toCell(r, i), id))
  }
  return out
}

export function packColumnsUp(b: Board): Board {
  const cols = new Map<number, [number, number][]>() // c -> [row, id]
  for (const [cell, id] of b) group(cols, colOf(cell), [rowOf(cell), id])
  const out: Board = new Map()
  for (const [c, cells] of cols) {
    cells.sort((a, d) => a[0] - d[0])
    cells.forEach(([, id], i) => out.set(toCell(i, c), id))
  }
  return out
}

/** The status quo. Converges to a top-left Young staircase. */
export const compactCorner = (b: Board): Board =>
  fixpoint(b, x => packColumnsUp(packRowsLeft(x)))

// --- √-wrap: square but NON-LOCAL (cascades) -----------------------------

/** Lay every stack into a ⌈√n⌉-wide grid in reading order. A single mid-board
 *  removal re-indexes everything after it → the whole board slides. */
export function compactWrap(b: Board): Board {
  const ids = [...b].sort((a, c) => a[0] - c[0]).map(([, id]) => id)
  const W = Math.max(1, Math.ceil(Math.sqrt(ids.length)))
  const out: Board = new Map()
  ids.forEach((id, i) => out.set(toCell(Math.floor(i / W), i % W), id))
  return out
}

// --- Brick: even rows left, odd rows right → islands + parity teleport ----

export function compactBrick(b: Board): Board {
  const base = compactCorner(b)
  const width = Math.max(0, ...[...base.keys()].map(colOf)) + 1
  const rowWidth = new Map<number, number>()
  for (const cell of base.keys())
    rowWidth.set(rowOf(cell), (rowWidth.get(rowOf(cell)) ?? 0) + 1)

  const out: Board = new Map()
  for (const [cell, id] of base) {
    const r = rowOf(cell)
    if (r % 2 === 0) out.set(cell, id) // left-flushed
    else out.set(toCell(r, colOf(cell) + (width - rowWidth.get(r)!)), id) // right-flushed → hole on the left
  }
  return out
}

// --- Native down-pack: the CORRECT "resting on the floor" (a real fixpoint) --

/** Pack each column against the floor at row H-1, preserving top-to-bottom order. */
export function packColumnsDown(b: Board, H: number): Board {
  const cols = new Map<number, [number, number][]>()
  for (const [cell, id] of b) group(cols, colOf(cell), [rowOf(cell), id])
  const out: Board = new Map()
  for (const [c, cells] of cols) {
    cells.sort((a, d) => a[0] - d[0])
    const k = cells.length
    cells.forEach(([, id], i) => out.set(toCell(H - k + i, c), id))
  }
  return out
}

export const compactDown = (b: Board): Board =>
  fixpoint(b, x => {
    const left = packRowsLeft(x)
    const colCount = new Map<number, number>()
    for (const cell of left.keys())
      colCount.set(colOf(cell), (colCount.get(colOf(cell)) ?? 0) + 1)
    const H = Math.max(1, ...colCount.values())
    return packColumnsDown(left, H)
  })

// --- Mirror-down: DELIBERATELY WRONG. Non-idempotent, jitters. Demo D. -----

/** Vertical mirror of the corner-packer's output. The trap in "just flip it":
 *  re-compacting a settled board permutes stack assignments → settle-jitter. */
export function compactMirrorDown(b: Board): Board {
  const corner = compactCorner(b)
  const H = Math.max(0, ...[...corner.keys()].map(rowOf)) + 1
  const out: Board = new Map()
  for (const [cell, id] of corner)
    out.set(toCell(H - 1 - rowOf(cell), colOf(cell)), id)
  return out
}

// --- Metrics -------------------------------------------------------------

/** The single most important number: chips present in both boards that moved.
 *  (A removed/added stack is the event, not a slide, so it isn't counted.) */
export function countChipsMoved(before: Board, after: Board): number {
  const a = byStack(before)
  const b = byStack(after)
  let n = 0
  for (const [id, cell] of a) if (b.has(id) && b.get(id) !== cell) n++
  return n
}

function longestRun(groups: Map<number, number[]>): number {
  let best = 0
  for (const arr of groups.values()) {
    arr.sort((x, y) => x - y)
    let run = arr.length ? 1 : 0
    let longest = run
    for (let i = 1; i < arr.length; i++) {
      run = arr[i] === arr[i - 1] + 1 ? run + 1 : 1
      longest = Math.max(longest, run)
    }
    best = Math.max(best, longest)
  }
  return best
}

/** Lopsidedness. 1.0 = a perfect square; higher = more staircase. */
export function elongation(b: Board): number {
  const n = b.size
  if (!n) return 0
  const rows = new Map<number, number[]>()
  const cols = new Map<number, number[]>()
  for (const cell of b.keys()) {
    group(rows, rowOf(cell), colOf(cell))
    group(cols, colOf(cell), rowOf(cell))
  }
  return (longestRun(rows) + longestRun(cols)) / (2 * Math.ceil(Math.sqrt(n)))
}

/** The literal complaint. 1.0 = both origin edges span the whole block. */
export function originEdgeLoad(b: Board): number {
  if (!b.size) return 0
  const cells = [...b.keys()]
  const minR = Math.min(...cells.map(rowOf))
  const minC = Math.min(...cells.map(colOf))
  const maxR = Math.max(...cells.map(rowOf))
  const maxC = Math.max(...cells.map(colOf))
  let inTop = 0
  let inLeft = 0
  for (const cell of cells) {
    if (rowOf(cell) === minR) inTop++
    if (colOf(cell) === minC) inLeft++
  }
  return (inTop + inLeft) / (maxC - minC + 1 + (maxR - minR + 1))
}

/** Settle-jitter — MUST be 0. A resting board that reshuffles on re-compaction
 *  (no player action) is disqualified. This is what killed the mirror. */
export const settleJitter = (compact: (b: Board) => Board, x: Board): number =>
  countChipsMoved(compact(x), compact(compact(x)))

// --- Seeded replay (reproducible metrics across machines) -----------------

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Remove one stack chosen by rank in the SORTED stack-id list, so every
 *  strategy faces the identical removal stream — layout is the only variable. */
export function removeRandomStack(b: Board, rng: () => number): Board {
  const ids = [...b.values()].sort((x, y) => x - y)
  if (!ids.length) return b
  const victim = ids[Math.floor(rng() * ids.length)]
  const out = clone(b)
  for (const [cell, id] of out)
    if (id === victim) {
      out.delete(cell)
      break
    }
  return out
}

// --- Self-check: `node compaction.ts` (Node 24 strips the types) ----------

export function selfCheck(): void {
  const assert = (c: boolean, m: string) => {
    if (!c) throw new Error(`selfCheck: ${m}`)
  }
  const grid = fullGrid(6)

  // Every fixpoint-based strategy is idempotent by construction.
  assert(settleJitter(compactCorner, grid) === 0, "corner must not jitter")
  assert(settleJitter(compactDown, grid) === 0, "native down must not jitter")

  // The mirror is the trap: a settled board reshuffles with no move made.
  assert(settleJitter(compactMirrorDown, grid) > 0, "mirror should jitter")

  // Locality: on the same removal, corner-pack moves no more chips than √-wrap.
  const removed = removeRandomStack(grid, mulberry32(7))
  const cornerMoved = countChipsMoved(compactCorner(grid), compactCorner(removed))
  const wrapMoved = countChipsMoved(compactWrap(grid), compactWrap(removed))
  assert(cornerMoved <= wrapMoved, "corner should move no more than wrap")

  // eslint-disable-next-line no-console
  console.log(`selfCheck ok — corner moved ${cornerMoved}, wrap moved ${wrapMoved}`)
}

if (typeof process !== "undefined" && import.meta.url === `file://${process.argv[1]}`)
  selfCheck()
