export type Primitive = string | number;
export type IsPrimitive<T> = T extends Primitive ? true : false;

export type PrimitiveKeys<T> = {
  [K in keyof T]: IsPrimitive<T[K]> extends true ? K : never
}[keyof T];
