import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, ModelNotFoundExceptionResponse } from '../model';
export type stayModesDestroyResponse204 = {
    data: void;
    status: 204;
};
export type stayModesDestroyResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type stayModesDestroyResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type stayModesDestroyResponseSuccess = (stayModesDestroyResponse204) & {
    headers: Headers;
};
export type stayModesDestroyResponseError = (stayModesDestroyResponse401 | stayModesDestroyResponse404) & {
    headers: Headers;
};
export type stayModesDestroyResponse = (stayModesDestroyResponseSuccess | stayModesDestroyResponseError);
export declare const getStayModesDestroyUrl: (stayMode: number) => string;
/**
 * @summary Delete a stay mode
 */
export declare const stayModesDestroy: (stayMode: number, options?: RequestInit) => Promise<stayModesDestroyResponse>;
export declare const getStayModesDestroyMutationKey: () => readonly ["stayModesDestroy"];
export declare const getStayModesDestroyMutationOptions: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof stayModesDestroy>>, TError, StayModesDestroyMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof stayModesDestroy>>, TError, StayModesDestroyMutationVariables, TContext>;
export type StayModesDestroyMutationResult = NonNullable<Awaited<ReturnType<typeof stayModesDestroy>>>;
export type StayModesDestroyMutationError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse;
export type StayModesDestroyMutationVariables = {
    stayMode: number;
};
/**
* @summary Delete a stay mode
*/
export declare const useStayModesDestroy: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof stayModesDestroy>>, TError, StayModesDestroyMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof stayModesDestroy>>, TError, StayModesDestroyMutationVariables, TContext>;
//# sourceMappingURL=stay-modes-destroy.d.ts.map