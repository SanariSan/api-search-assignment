enum ELOG_LEVEL {
  ERROR,
  WARN,
  INFO,
  DEBUG,
  SILLY,
}

// deep modify if needed https://stackoverflow.com/a/65561287
// /\ not working as expected, missing old object (TA) types, they become unknown, fixed version below
// however still smth to notice, mapping modifiers (?:) from old object not overriden in new, even with Required<NonNullable<target>>
type TObjectAny = {
  [key: string]: any;
};
type TDeepPartialAny<T> = {
  [K in keyof T]?: T[K] extends TObjectAny ? TDeepPartialAny<T[K]> : any;
};
type TModifyDeep<TA extends TObjectAny, TB extends TDeepPartialAny<TA>> = {
  [K in keyof TA]: K extends string & keyof TB
    ? TB[K] extends TObjectAny
      ? TModifyDeep<TA[K], TB[K]>
      : Required<TB[K]>
    : TA[K];
} & Omit<TB, keyof TA>;

type TPrettify<TX> = {
  [key in keyof TX]: TX[key];
};

// type TA = { b: { c: { d: number } } };
// type TB = { x: boolean; b: { c: { d: string } } };
// type TC = TModifyDeep<TA, TB>;
// const x: TC = { x: true, b: { c: { d: 'deep modified type' } } };

export type { TModifyDeep, TPrettify };
export { ELOG_LEVEL };
