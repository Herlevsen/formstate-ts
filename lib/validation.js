"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function validateField() {
    var tuples = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        tuples[_i] = arguments[_i];
    }
    return function (value) { return tuples.reduce(function (result, _a) {
        var func = _a[0], errMessage = _a[1];
        if (result)
            return result;
        return func(value) ? undefined : errMessage;
    }, undefined); };
}
exports.validateField = validateField;
// TODO: Add more validation functions
// String validation
exports.stringGreaterThan = function (length) { return function (str) { return str.length > length; }; };
exports.stringGreaterThanOrEqual = function (length) { return function (str) { return str.length >= length; }; };
exports.stringLessThan = function (length) { return function (str) { return str.length < length; }; };
exports.stringLessThanOrEqual = function (length) { return function (str) { return str.length <= length; }; };
// Number validation
exports.numberGreaterThan = function (length) { return function (num) { return num > length; }; };
exports.numberGreaterThanOrEqual = function (length) { return function (num) { return num >= length; }; };
exports.numberLessThan = function (length) { return function (num) { return num < length; }; };
exports.numberLessThanOrEqual = function (length) { return function (num) { return num <= length; }; };
exports.isInteger = function (num) { return num % 1 === 0; };
exports.isFloat = function (num) { return num % 1 !== 0; };
