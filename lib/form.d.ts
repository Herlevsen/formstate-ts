import * as React from 'react';
import { FormValues, FormComponentProps } from './types';
/**
 * The form component. You are required to pass in the initialProps and the field types will be inferred from here.
 * You can optionally set the fields types with the generic parameter Values, like so:
 * <Form<{username: string, password: string}> initialValues={....} >
 *
 * You can change the type of the errors with the second generic parameter. By default it is "string | undefined"
 */
export declare const Form: <Values extends FormValues, ErrorType = string | undefined>(props: FormComponentProps<Values, ErrorType>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
