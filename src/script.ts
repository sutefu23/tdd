export class NumberParams {
  public readonly values: number[];
  constructor(numbers: number[]) {
    numbers.forEach((num, index) => {
      if (typeof num !== "number")
        throw new Error(`${index + 1}番目の引数が数値ではありません`);
    });
    if (numbers.length > 30)
      throw new Error("引数の数は30個以内にしてください。");

    this.values = numbers;
  }
}
export const add = (params: NumberParams) => {
  const result = params.values.reduce((acc, cur) => acc + cur, 0);
  return result > 1000 ? "too big" : result;
};
export const substract = (params: NumberParams) => {
  const result = params.values
    .slice(1)
    .reduce((acc, cur) => acc - cur, params.values[0]);
  return result < 0 ? "negative number" : result;
};

export const multiply = (params: NumberParams) => {
  const result = params.values.reduce((acc, cur) => acc * cur, 1);
  return result > 1000 ? "big big number" : result;
};

export const divide = (params: NumberParams) => {
  if (params.values.some((param) => param === 0))
    throw new Error("0で割り算をすることは出来ません。");

  const result = params.values
    .slice(1)
    .reduce((acc, cur) => acc / cur, params.values[0]);

  const numberString = result.toString();
  if (numberString.indexOf(".") === -1) return result;

  return numberString.split(".")[1].length >= 3 ? "too small" : result;
};
