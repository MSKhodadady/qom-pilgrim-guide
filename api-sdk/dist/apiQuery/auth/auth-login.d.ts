import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthLogin200, AuthenticationExceptionResponse, LoginRequest, ValidationExceptionResponse } from '../model';
export type authLoginResponse200 = {
    data: AuthLogin200;
    status: 200;
};
export type authLoginResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type authLoginResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type authLoginResponseSuccess = (authLoginResponse200) & {
    headers: Headers;
};
export type authLoginResponseError = (authLoginResponse401 | authLoginResponse422) & {
    headers: Headers;
};
export type authLoginResponse = (authLoginResponseSuccess | authLoginResponseError);
export declare const getAuthLoginUrl: () => string;
/**
 * @summary Authenticate an admin and return a token
 */
export declare const authLogin: (loginRequest: LoginRequest, options?: RequestInit) => Promise<authLoginResponse>;
export declare const getAuthLoginMutationKey: () => readonly ["authLogin"];
export declare const getAuthLoginMutationOptions: <TError = AuthenticationExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof authLogin>>, TError, AuthLoginMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof authLogin>>, TError, AuthLoginMutationVariables, TContext>;
export type AuthLoginMutationResult = NonNullable<Awaited<ReturnType<typeof authLogin>>>;
export type AuthLoginMutationBody = LoginRequest;
export type AuthLoginMutationError = AuthenticationExceptionResponse | ValidationExceptionResponse;
export type AuthLoginMutationVariables = {
    data: LoginRequest;
};
/**
* @summary Authenticate an admin and return a token
*/
export declare const useAuthLogin: <TError = AuthenticationExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof authLogin>>, TError, AuthLoginMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof authLogin>>, TError, AuthLoginMutationVariables, TContext>;
//# sourceMappingURL=auth-login.d.ts.map