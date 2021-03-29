const str = 3;
console.log(str);

const num = "hi";
console.log(num);

interface C {
  str: string;
  num: number;
  fun: (p1: string) => string;
}

export const c: C = {
  str: num,
  num: str,
  fun: (val) => {
    console.log(val);
    return val;
  },
};
