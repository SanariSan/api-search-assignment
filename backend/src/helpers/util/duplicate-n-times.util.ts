function duplicateNTimes(str: string | number, n = 1): string {
  return String(str).repeat(n);

  // let output = ``;
  // for (let i = 0; i < n; i += 1) output += str;
  // return output;
}

export { duplicateNTimes };
