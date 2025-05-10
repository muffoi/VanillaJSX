type KeysMatching<I extends object, T> = {
    [K in keyof I]: I[K] extends T ? K : never
}[keyof I];

type KeysNotMatching<I extends object, T> = {
    [K in keyof I]: I[K] extends T ? never : K
}[keyof I];