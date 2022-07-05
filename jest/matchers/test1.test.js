const sum = require("./test1");

// it("add 1+2 equal 3", () => {
//   const result = sum(1, 2);
//   expect(result).toBe(3);
// });

describe("example tests", () => {
  it("add 1+2 equal 3", () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
  it("object assignment", () => {
    const obj = {};
    expect(obj).toEqual({});
  });
});

describe("Truethy or falsey", () => {
  it("null", () => {
    const n = null;
    expect(n).toBeFalsy();
    expect(n).not.toBeTruthy();
    expect(n).toBeNull();
    expect(n).not.toBeUndefined();
  });
});

describe("numbers", () => {
  it("two plus two", () => {
    const value = 2 + 2;
    expect(value).toBe(4);
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(4);
    expect(value).toBeLessThan(7);
    expect(value).toBeLessThanOrEqual(4);
  });

  it("adding floats", () => {
    const value = 0.1 + 0.2;
    expect(value).toBeCloseTo(0.299999);
  });
});

describe("Strings", () => {
  it("there is no I in team", () => {
    expect("team").not.toMatch(/I/);
  });
});

describe("Arrays", () => {
  it("there is no I in team", () => {
    const shoppingLists = ["diapers", "kleenex", "milk"];

    expect(shoppingLists).toContain("milk");
  });
});

function compileandiodCode() {
  throw new Error("you are using the wrong TDK");
}

describe("exceptions", () => {
  it("compiling andriod goes as expected", () => {
    expect(() => compileandiodCode()).toThrow(Error);
  });
});
