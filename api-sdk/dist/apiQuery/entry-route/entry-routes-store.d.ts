import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, EntryRoutesStore201, StoreEntryRouteRequest, ValidationExceptionResponse } from '../model';
export type entryRoutesStoreResponse201 = {
    data: EntryRoutesStore201;
    status: 201;
};
export type entryRoutesStoreResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type entryRoutesStoreResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type entryRoutesStoreResponseSuccess = (entryRoutesStoreResponse201) & {
    headers: Headers;
};
export type entryRoutesStoreResponseError = (entryRoutesStoreResponse401 | entryRoutesStoreResponse422) & {
    headers: Headers;
};
export type entryRoutesStoreResponse = (entryRoutesStoreResponseSuccess | entryRoutesStoreResponseError);
export declare const getEntryRoutesStoreUrl: () => string;
/**
 * @summary Create a new entry route
 */
export declare const entryRoutesStore: (storeEntryRouteRequest: StoreEntryRouteRequest, options?: RequestInit) => Promise<entryRoutesStoreResponse>;
export declare const getEntryRoutesStoreMutationKey: () => readonly ["entryRoutesStore"];
export declare const getEntryRoutesStoreMutationOptions: <TError = AuthenticationExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof entryRoutesStore>>, TError, EntryRoutesStoreMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof entryRoutesStore>>, TError, EntryRoutesStoreMutationVariables, TContext>;
export type EntryRoutesStoreMutationResult = NonNullable<Awaited<ReturnType<typeof entryRoutesStore>>>;
export type EntryRoutesStoreMutationBody = StoreEntryRouteRequest;
export type EntryRoutesStoreMutationError = AuthenticationExceptionResponse | ValidationExceptionResponse;
export type EntryRoutesStoreMutationVariables = {
    data: StoreEntryRouteRequest;
};
/**
* @summary Create a new entry route
*/
export declare const useEntryRoutesStore: <TError = AuthenticationExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof entryRoutesStore>>, TError, EntryRoutesStoreMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof entryRoutesStore>>, TError, EntryRoutesStoreMutationVariables, TContext>;
//# sourceMappingURL=entry-routes-store.d.ts.map