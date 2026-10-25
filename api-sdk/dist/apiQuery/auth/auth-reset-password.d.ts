import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthResetPassword200, ResetPasswordRequest, ValidationExceptionResponse } from '../model';
export type authResetPasswordResponse200 = {
    data: AuthResetPassword200;
    status: 200;
};
export type authResetPasswordResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type authResetPasswordResponseSuccess = (authResetPasswordResponse200) & {
    headers: Headers;
};
export type authResetPasswordResponseError = (authResetPasswordResponse422) & {
    headers: Headers;
};
export type authResetPasswordResponse = (authResetPasswordResponseSuccess | authResetPasswordResponseError);
export declare const getAuthResetPasswordUrl: () => string;
/**
 * @summary Reset an admin's password and return a fresh token
 */
export declare const authResetPassword: (resetPasswordRequest: ResetPasswordRequest, options?: RequestInit) => Promise<authResetPasswordResponse>;
export declare const getAuthResetPasswordMutationKey: () => readonly ["authResetPassword"];
export declare const getAuthResetPasswordMutationOptions: <TError = ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof authResetPassword>>, TError, AuthResetPasswordMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof authResetPassword>>, TError, AuthResetPasswordMutationVariables, TContext>;
export type AuthResetPasswordMutationResult = NonNullable<Awaited<ReturnType<typeof authResetPassword>>>;
export type AuthResetPasswordMutationBody = ResetPasswordRequest;
export type AuthResetPasswordMutationError = ValidationExceptionResponse;
export type AuthResetPasswordMutationVariables = {
    data: ResetPasswordRequest;
};
/**
* @summary Reset an admin's password and return a fresh token
*/
export declare const useAuthResetPassword: <TError = ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof authResetPassword>>, TError, AuthResetPasswordMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof authResetPassword>>, TError, AuthResetPasswordMutationVariables, TContext>;
//# sourceMappingURL=auth-reset-password.d.ts.map