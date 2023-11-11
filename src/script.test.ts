import { NumberParams, add, substract, multiply, divide } from "./script";

describe("パラメーターのテスト", () => {
  it("NumbersParamに文字が混じってたらエラー", () => {
    const param = ["a", 4];
    expect(Number.isFinite(param[0])).toBeFalsy();
    const actual = () => new NumberParams(param as unknown as number[]);
    expect(actual).toThrowError();
  });

  it("30個を超える引数を入れたらエラー", () => {
    const param = [
      2, 5, 2, 5, 2, 5, 2, 5, 2, 5, 2, 5, 2, 5, 2, 5, 2, 5, 2, 5, 2, 5, 2, 5, 2,
      5, 2, 5, 2, 5, 2,
    ];
    // 3
    expect(param.length).toBeGreaterThan(30); //30を超える

    const actual = () => new NumberParams(param);
    expect(actual).toThrowError();
  });
  it("30個以内であればエラーは出ない", () => {
    const param = [
      5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      5, 5, 5, 5, 5,
    ];
    expect(param.length).toBeLessThanOrEqual(30); //30以下

    const actual = () => new NumberParams(param);
    expect(actual).not.toThrowError();
  });
});

describe("addのテスト", () => {
  it("3と10と3を入れたら16", () => {
    const array = [3, 10, 3];
    const param = new NumberParams(array);

    const actual = add(param);
    const addExpect = 16;
    expect(actual).toBe(addExpect);
  });
  it("2と5を入れたら7", () => {
    const array = [2, 5];
    const param = new NumberParams(array);
    const actual = add(param);
    const addExpect = 7;
    expect(actual).toBe(addExpect);
  });

  it("足し算の場合、計算結果が1000を超える場合は合計ではなく「too big」と文字列が返る", () => {
    const array = [1, 1000];
    const param = new NumberParams(array);

    const actual = add(param);
    expect(actual).toEqual("too big");
  });
  it("足し算の場合、計算結果が1000を超えない場合は数値が返る", () => {
    const array = [1000, 0];
    const param = new NumberParams(array);

    const actual = add(param);
    expect(Number.isFinite(actual)).toBeTruthy();
  });
});

describe("substractのテスト", () => {
  it("30と10と3を入れたら17", () => {
    const array = [30, 10, 3];
    const param = new NumberParams(array);
    const actual = substract(param);
    const substractExpect = 17;
    expect(actual).toBe(substractExpect);
  });
  it("5と2を入れたら3", () => {
    const array = [5, 2];
    const param = new NumberParams(array);
    const actual = substract(param);
    const substractExpect = 3;
    expect(actual).toBe(substractExpect);
  });

  it("引き算の場合、計算結果がマイナスの場合は「negative number」と文字列が返る", () => {
    const array = [1, 5];
    const param = new NumberParams(array);

    const actual = substract(param);
    expect(actual).toEqual("negative number");
  });
  it("引き算の場合、計算結果がプラス場合は数値が返る", () => {
    const array = [1, 0];
    const param = new NumberParams(array);

    const actual = substract(param);
    expect(Number.isFinite(actual)).toBeTruthy();
  });
});

describe("multiplyのテスト", () => {
  it("3と10と3を入れたら90", () => {
    const array = [3, 10, 3];
    const param = new NumberParams(array);
    const actual = multiply(param);
    const multiplyExpect = 90;
    expect(actual).toBe(multiplyExpect);
  });
  it("2と5を入れたら10", () => {
    const array = [2, 5];
    const param = new NumberParams(array);
    const actual = multiply(param);
    const multiplyExpect = 10;
    expect(actual).toBe(multiplyExpect);
  });

  it("かけ算の場合、計算結果が1000を越える場合は「big big number」と文字列が返る", () => {
    const array = [10, 10, 10.1];
    const param = new NumberParams(array);

    const actual = multiply(param);
    expect(actual).toEqual("big big number");
  });
  it("かけ算の場合、計算結果が1000を越えない場合は数値が返る", () => {
    const array = [10, 10, 10];
    const param = new NumberParams(array);

    const actual = multiply(param);
    expect(Number.isFinite(actual)).toBeTruthy();
  });
});
describe("divideのテスト", () => {
  it("100と10を入れたら10", () => {
    const array = [100, 10];
    const param = new NumberParams(array);
    const actual = divide(param);
    const divideExpect = 10;
    expect(actual).toBe(divideExpect);
  });
  it("2と5を入れたら0.4", () => {
    const array = [2, 5];
    const param = new NumberParams(array);
    const actual = divide(param);
    const divideExpect = 0.4;
    expect(actual).toBe(divideExpect);
  });
  it("0が引数に入っていたらエラーが返る", () => {
    const array = [1, 2, 0, 10];
    const param = new NumberParams(array);

    const actual = () => divide(param);
    expect(actual).toThrow();
  });
  it("割り算の場合、計算結果が小数点3位以下になる場合は「too small」と文字列が返る", () => {
    const array = [1, 1000];
    const param = new NumberParams(array);

    const actual = divide(param);
    expect(actual).toEqual("too small");
  });
  it("割り算の場合、計算結果が小数点2位以上は数値が返る", () => {
    const array = [1, 10];
    const param = new NumberParams(array);

    const actual = divide(param);
    expect(Number.isFinite(actual)).toBeTruthy();
  });
});
