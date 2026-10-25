import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, StayModesStore201, StoreStayModeRequest, ValidationExceptionResponse } from '../model';
export type stayModesStoreResponse201 = {
    data: StayModesStore201;
    status: 201;
};
export type stayModesStoreResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type stayModesStoreResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type stayModesStoreResponseSuccess = (stayModesStoreResponse201) & {
    headers: Headers;
};
export type stayModesStoreResponseError = (stayModesStoreResponse401 | stayModesStoreResponse422) & {
    headers: Headers;
};
export type stayModesStoreResponse = (stayModesStoreResponseSuccess | stayModesStoreResponseError);
export declare const getStayModesStoreUrl: () => string;
/**
 * @summary Create a new stay mode
 */
export declare const stayModesStore: (storeStayModeRequest: StoreStayModeRequest, options?: RequestInit) => Promise<stayModesStoreResponse>;
export declare const getStayModesStoreMutationKey: () => readonly ["stayModesStore"];
export declare const getStayModesStoreMutationOptions: <TError = AuthenticationExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof stayModesStore>>, TError, StayModesStoreMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof stayModesStore>>, TError, StayModesStoreMutationVariables, TContext>;
export type StayModesStoreMutationResult = NonNullable<Awaited<ReturnType<typeof stayModesStore>>>;
export type StayModesStoreMutationBody = StoreStayModeRequest;
export type StayModesStoreMutationError = AuthenticationExceptionResponse | ValidationExceptionResponse;
export type StayModesStoreMutationVariables = {
    data: StoreStayModeRequest;
};
/**
* @summary Create a new stay mode
*/
export declare const useStayModesStore: <TError = AuthenticationExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof stayModesStore>>, TError, StayModesStoreMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof stayModesStore>>, TError, StayModesStoreMutationVariables, TContext>;
//# sourceMappingURL=stay-modes-store.d.ts.map