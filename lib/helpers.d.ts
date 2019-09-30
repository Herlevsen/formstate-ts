/// <reference types="react" />
/**
 * Use this to wrap an onChange handler for a string field, so that it can be passed to an input elements onChange prop
 * @param onChangeFunc The fields onChange handler
 */
export declare const strHandler: (onChangeFunc: (value: string) => void) => (e: import("react").ChangeEvent<HTMLInputElement>) => void;
/**
 * Use this to wrap an onChange handler for a number field, so that it can be passed to an input elements onChange prop
 * @param onChangeFunc The fields onChange handler
 * @param defaultValue A default value for the field, if the input can not be parsed as a number
 */
export declare const numberHandler: (onChangeFunc: (value: number) => void, defaultValue: number) => (e: import("react").ChangeEvent<HTMLInputElement>) => void;
