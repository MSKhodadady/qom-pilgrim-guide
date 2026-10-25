import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthRegister201, RegisterRequest, ValidationExceptionResponse } from '../model';
export type authRegisterResponse201 = {
    data: AuthRegister201;
    status: 201;
};
export type authRegisterResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type authRegisterResponseSuccess = (authRegisterResponse201) & {
    headers: Headers;
};
export type authRegisterResponseError = (authRegisterResponse422) & {
    headers: Headers;
};
export type authRegisterResponse = (authRegisterResponseSuccess | authRegisterResponseError);
export declare const getAuthRegisterUrl: () => string;
/**
 * @summary Register a new admin and return a token for the new account
 */
export declare const authRegister: (registerRequest: RegisterRequest, options?: RequestInit) => Promise<authRegisterResponse>;
export declare const getAuthRegisterMutationKey: () => readonly ["authRegister"];
export declare const getAuthRegisterMutationOptions: <TError = ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof authRegister>>, TError, AuthRegisterMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof authRegister>>, TError, AuthRegisterMutationVariables, TContext>;
export type AuthRegisterMutationResult = NonNullable<Awaited<ReturnType<typeof authRegister>>>;
export type AuthRegisterMutationBody = RegisterRequest;
export type AuthRegisterMutationError = ValidationExceptionResponse;
export type AuthRegisterMutationVariables = {
    data: RegisterRequest;
};
/**
* @summary Register a new admin and return a token for the new account
*/
export declare const useAuthRegister: <TError = ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof authRegister>>, TError, AuthRegisterMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof authRegister>>, TError, AuthRegisterMutationVariables, TContext>;
//# sourceMappingURL=auth-register.d.ts.map