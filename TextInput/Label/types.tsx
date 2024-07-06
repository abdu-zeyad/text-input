import type { MD3TypescaleKey } from "../generalTypes";

export type VariantProp<T> =
  | (T extends string ? (string extends T ? never : T) : never)
  | keyof typeof MD3TypescaleKey;
