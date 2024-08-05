export const kebabToCapitalized = (str: string) => {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

export const checkPrime = (num: number) => {
  let i, flag = true;
  for (i = 2; i <= num - 1; i++) {
      if (num % i === 0) {
          flag = false;
          break;
      }
  }
  return flag
}

export const getNewName = (str: string, newNumber: number) => {
  if (str.match(/-\d+$/)) {
      // If the string ends with a hyphen followed by numbers, replace the numbers
      return str.replace(/-\d+$/, `-${newNumber}`);
  } else {
      // If the string does not end with numbers, append the new number with a hyphen
      return `${str}-${newNumber}`;
  }
}