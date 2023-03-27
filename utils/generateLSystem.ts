export type LSystemRules = Map<string, string>;

export const generateLSystem = (axiom: string, rules: LSystemRules, iterations: number): string => {
  let current = axiom;
  for (let i = 0; i < iterations; i++) {
    current = current
      .split("")
      .map((c) => rules.get(c) || c)
      .join("");
  }
  return current;
}
