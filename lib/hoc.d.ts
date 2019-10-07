import React from "react";
import { FormValues, StandardErrorType, FormProps, HOCWrappedComponentFormProps } from "./types";
export declare function withForm<Values extends FormValues, ErrorType = StandardErrorType>(ownProps: FormProps<Values, ErrorType>): <T extends HOCWrappedComponentFormProps<Values, ErrorType>>(WrappedComponent: React.ComponentType<T>) => (outsideProps: Pick<T, import("utility-types").SetDifference<keyof T, "form">>) => JSX.Element;
