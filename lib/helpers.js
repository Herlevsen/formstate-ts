"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Use this to wrap an onChange handler for a string field, so that it can be passed to an input elements onChange prop
 * @param onChangeFunc The fields onChange handler
 */
exports.strHandler = function (onChangeFunc) { return function (e) { return onChangeFunc(e.target.value); }; };
/**
 * Use this to wrap an onChange handler for a number field, so that it can be passed to an input elements onChange prop
 * @param onChangeFunc The fields onChange handler
 * @param defaultValue A default value for the field, if the input can not be parsed as a number
 */
exports.numberHandler = function (onChangeFunc, defaultValue) { return function (e) { return onChangeFunc(Number.parseFloat(e.target.value) || defaultValue); }; };
