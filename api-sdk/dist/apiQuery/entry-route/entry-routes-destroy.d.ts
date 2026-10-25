import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, ModelNotFoundExceptionResponse } from '../model';
export type entryRoutesDestroyResponse204 = {
    data: void;
    status: 204;
};
export type entryRoutesDestroyResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type entryRoutesDestroyResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type entryRoutesDestroyResponseSuccess = (entryRoutesDestroyResponse204) & {
    headers: Headers;
};
export type entryRoutesDestroyResponseError = (entryRoutesDestroyResponse401 | entryRoutesDestroyResponse404) & {
    headers: Headers;
};
export type entryRoutesDestroyResponse = (entryRoutesDestroyResponseSuccess | entryRoutesDestroyResponseError);
export declare const getEntryRoutesDestroyUrl: (entryRoute: number) => string;
/**
 * @summary Delete an entry route
 */
export declare const entryRoutesDestroy: (entryRoute: number, options?: RequestInit) => Promise<entryRoutesDestroyResponse>;
export declare const getEntryRoutesDestroyMutationKey: () => readonly ["entryRoutesDestroy"];
export declare const getEntryRoutesDestroyMutationOptions: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof entryRoutesDestroy>>, TError, EntryRoutesDestroyMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof entryRoutesDestroy>>, TError, EntryRoutesDestroyMutationVariables, TContext>;
export type EntryRoutesDestroyMutationResult = NonNullable<Awaited<ReturnType<typeof entryRoutesDestroy>>>;
export type EntryRoutesDestroyMutationError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse;
export type EntryRoutesDestroyMutationVariables = {
    entryRoute: number;
};
/**
* @summary Delete an entry route
*/
export declare const useEntryRoutesDestroy: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof entryRoutesDestroy>>, TError, EntryRoutesDestroyMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof entryRoutesDestroy>>, TError, EntryRoutesDestroyMutationVariables, TContext>;
//# sourceMappingURL=entry-routes-destroy.d.ts.map