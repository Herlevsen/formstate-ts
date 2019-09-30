"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
/**
 * The form component. You are required to pass in the initialProps and the field types will be inferred from here.
 * You can optionally set the fields types with the generic parameter Values, like so:
 * <Form<{username: string, password: string}> initialValues={....} >
 *
 * You can change the type of the errors with the second generic parameter. By default it is "string | undefined"
 */
exports.Form = function (props) {
    var _a = React.useState(props.initialValues), stateFields = _a[0], setFields = _a[1];
    var _b = React.useState({}), touched = _b[0], setTouched = _b[1];
    var validationResult = props.validation ? props.validation(stateFields) : {};
    var fields = Object.entries(stateFields).reduce(function (result, entry) {
        var _a;
        var key = entry[0];
        var value = entry[1];
        var field = {
            name: key,
            value: value,
            touched: touched[key] || false,
            error: validationResult[key],
            onChange: function (value) {
                var _a;
                return setFields(__assign(__assign({}, stateFields), (_a = {}, _a[key] = value, _a)));
            },
            onBlur: function () {
                var _a;
                return setTouched(__assign(__assign({}, touched), (_a = {}, _a[key] = true, _a)));
            }
        };
        return __assign(__assign({}, result), (_a = {}, _a[key] = field, _a));
    }, {});
    return props.children({
        fields: fields,
        values: stateFields,
        validate: function () { return props.validation ? props.validation(stateFields) : {}; },
        setAllFields: setFields,
        setSomeFields: function (fieldValues) { return setFields(__assign(__assign({}, stateFields), fieldValues)); },
        reset: function () {
            setFields(props.initialValues);
            setTouched({});
        }
    });
};
