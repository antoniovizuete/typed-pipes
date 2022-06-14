import type { Allowed, FirstParameterOf, Fn, Return } from "./types";

function pipe<
T extends Fn,
Fns extends T[],
Allow extends {
  0: [never]
  1: [FirstParameterOf<Fns>]
}[Allowed<Fns> extends never ? 0 : 1]
>(...args: [...Fns]): (...data: Allow) => Return<Fns>

function pipe<T extends Fn, Fns extends T[], Allow extends unknown[]>(
...args: [...Fns]
) {
return (...data: Allow) => args.reduce((acc, elem) => elem(acc), ...(data as unknown as []))
}

export { pipe };