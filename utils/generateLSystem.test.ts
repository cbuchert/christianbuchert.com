import { describe, expect, it } from "vitest"
import { generateLSystem } from "./generateLSystem"

describe("generateLSystem", () => {
  it("should generate the correct output for a single rule and one iteration", () => {
    const axiom = "F"
    const rules = new Map<string, string>()
    rules.set("F", "F+F−F−F+F")
    const iterations = 1
    const result = generateLSystem(axiom, rules, iterations)
    expect(result)
    .toBe("F+F−F−F+F")
  })

  it("should generate the correct output for multiple rules and multiple iterations", () => {
    const axiom = "X"
    const rules = new Map<string, string>()
    rules.set("X", "F+[[X]-X]-F[-FX]+X")
    rules.set("F", "FF")
    const iterations = 2
    const result = generateLSystem(axiom, rules, iterations)
    expect(result)
    .toBe("FF+[[F+[[X]-X]-F[-FX]+X]-F+[[X]-X]-F[-FX]+X]-FF[-FFF+[[X]-X]-F[-FX]+X]+F+[[X]-X]-F[-FX]+X")
  })

  it("should return the axiom when no rules are given", () => {
    const axiom = "F+F−F−F+F"
    const rules = new Map<string, string>()
    const iterations = 2
    const result = generateLSystem(axiom, rules, iterations)
    expect(result)
    .toBe(axiom)
  })

  it("should return the same string for zero iterations", () => {
    const axiom = "F+F−F−F+F"
    const rules = new Map<string, string>()
    rules.set("F", "F+F−F−F+F")
    const iterations = 0
    const result = generateLSystem(axiom, rules, iterations)
    expect(result)
    .toBe(axiom)
  })
})

