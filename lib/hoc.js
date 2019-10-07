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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var form_1 = require("./form");
function withForm(ownProps) {
    return function (WrappedComponent) {
        return function (outsideProps) {
            return (react_1.default.createElement(form_1.Form, __assign({}, ownProps), function (form) {
                var props = __assign(__assign({}, outsideProps), { form: form }); // TODO: How to avoid casting to T?
                return react_1.default.createElement(WrappedComponent, __assign({}, props));
            }));
        };
    };
}
exports.withForm = withForm;
