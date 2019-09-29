/**
 * Use this to wrap an onChange handler for a string field, so that it can be passed to an input elements onChange prop
 * @param onChangeFunc The fields onChange handler
 */
export const strHandler = (onChangeFunc: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => onChangeFunc(e.target.value)

/**
 * Use this to wrap an onChange handler for a number field, so that it can be passed to an input elements onChange prop
 * @param onChangeFunc The fields onChange handler
 * @param defaultValue A default value for the field, if the input can not be parsed as a number
 */
export const numberHandler = (onChangeFunc: (value: number) => void, defaultValue: number) => (e: React.ChangeEvent<HTMLInputElement>) => onChangeFunc(Number.parseFloat(e.target.value) || defaultValue)