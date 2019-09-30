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
export function validateField<T>(...tuples: Array<[(str: T) => boolean, string]>) {
  return (value: T) => tuples.reduce<string | undefined>((result, [func, errMessage]) => {
    if (result) return result
    return func(value) ? undefined : errMessage
  }, undefined)
}

// TODO: Add more validation functions

// String validation
export const stringGreaterThan = (length: number) => (str: string) => str.length > length
export const stringGreaterThanOrEqual = (length: number) => (str: string) => str.length >= length
export const stringLessThan = (length: number) => (str: string) => str.length < length
export const stringLessThanOrEqual = (length: number) => (str: string) => str.length <= length

// Number validation
export const numberGreaterThan = (otherNum: number) => (num: number) => num > otherNum
export const numberGreaterThanOrEqual = (otherNum: number) => (num: number) => num >= otherNum
export const numberLessThan = (otherNum: number) => (num: number) => num < otherNum
export const numberLessThanOrEqual = (otherNum: number) => (num: number) => num <= otherNum
export const isInteger = (num: number) => num % 1 === 0
export const isFloat = (num: number) => num % 1 !== 0