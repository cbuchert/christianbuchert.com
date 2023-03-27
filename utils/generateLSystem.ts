export const generateLSystem = (axiom: string, rules: Map<string, string>, iterations: number): string => {
  let result = axiom;
  for (let i = 0; i < iterations; i++) {
    let newResult = "";
    for (let j = 0; j < result.length; j++) {
      let char = result[j];
      if (rules.has(char)) {
        newResult += rules.get(char);
      } else {
        newResult += char;
      }
    }
    result = newResult;
  }
  return result;
}
