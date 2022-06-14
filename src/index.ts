import { pipe } from "./pipe";

type Bar = {
  prop1: string;
  prop2: number;
}

type Qux = Bar & {
  prop3: boolean
}

const foo = (arg: string): number[] => Array(arg.length).fill(1).map((_, i) => i+1)
const baz = (arg: number[]): number => arg.reduce((a, c) => a + c)
const bar = (arg: number): Bar[] => Array(arg).fill(undefined).map((_, i) => ({ prop1: "cosa"+i, prop2: Math.random()}) as Bar)
const qux = (arg: Bar[]): Qux[] => arg.map(o => ({...o, prop3: o.prop2 > 0.5}))

const check = pipe(qux)([{ prop1: "d", prop2: 1}, { prop1: "a", prop2: 2}])
const check2 = pipe(foo, baz, bar, qux)("foo")

console.log(check, check2)

