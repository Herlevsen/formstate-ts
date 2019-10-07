/**
 * A function that you can use to validate a single field, without having to reference the same value x number of times
 *
 * Usage:
 * ```ts
 * validateValue(
 *   [stringGreaterThanOrEqual(6), 'Username must be at least 6 characters'],
 *   [stringLessThanOrEqual(20)  , 'Username must be maximum 20 characters'],
 * )(username)
 * ```
 * @param tuples A variable number of tuples where the first item is a function that takes a value T and returns a boolean, and the second item is an error message that is used if the condition fails
 */
export declare function validateField<T>(...tuples: Array<[(str: T) => boolean, string]>): (value: T) => string | undefined;
export declare const stringGreaterThan: (length: number) => (str: string) => boolean;
export declare const stringGreaterThanOrEqual: (length: number) => (str: string) => boolean;
export declare const stringLessThan: (length: number) => (str: string) => boolean;
export declare const stringLessThanOrEqual: (length: number) => (str: string) => boolean;
export declare const numberGreaterThan: (otherNum: number) => (num: number) => boolean;
export declare const numberGreaterThanOrEqual: (otherNum: number) => (num: number) => boolean;
export declare const numberLessThan: (otherNum: number) => (num: number) => boolean;
export declare const numberLessThanOrEqual: (otherNum: number) => (num: number) => boolean;
export declare const isInteger: (num: number) => boolean;
export declare const isFloat: (num: number) => boolean;
