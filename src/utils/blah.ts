export const sort = (nums: number[]) => nums.toSorted((a, b) => a - b);

export const arrayEquals = (arr1: number[], arr2: number[]) => {
  return arr1.length === arr2.length &&
    arr1.every((arr1Val, index) => arr1Val === arr2[index]);
};
