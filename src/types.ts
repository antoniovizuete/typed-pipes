export type Fn = (a: any) => any

export type Head<T extends any[]> = T extends [infer H, ...infer _] ? H : never

export type Last<T extends any[]> = T extends [infer _]
  ? never
  : T extends [...infer _, infer Tl]
  ? Tl
  : never

export type Allowed<T extends Fn[], Cache extends Fn[] = []> = T extends []
  ? Cache
  : T extends [infer Lst]
  ? Lst extends Fn
    ? Allowed<[], [...Cache, Lst]>
    : never
  : T extends [infer Fst, ...infer Lst]
  ? Fst extends Fn
    ? Lst extends Fn[]
      ? Head<Lst> extends Fn
        ? ReturnType<Fst> extends Head<Parameters<Head<Lst>>>
          ? Allowed<Lst, [...Cache, Fst]>
          : never
        : never
      : never
    : never
  : never

export type FirstParameterOf<T extends Fn[]> = Head<T> extends Fn
  ? Head<Parameters<Head<T>>>
  : never

export type Return<T extends Fn[]> = Last<T> extends Fn ? ReturnType<Last<T>> : never
