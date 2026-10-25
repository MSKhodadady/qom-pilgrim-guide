import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, RoutePlaceAssignmentsStore201, StoreRoutePlaceAssignmentRequest, ValidationExceptionResponse } from '../model';
export type routePlaceAssignmentsStoreResponse201 = {
    data: RoutePlaceAssignmentsStore201;
    status: 201;
};
export type routePlaceAssignmentsStoreResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type routePlaceAssignmentsStoreResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type routePlaceAssignmentsStoreResponseSuccess = (routePlaceAssignmentsStoreResponse201) & {
    headers: Headers;
};
export type routePlaceAssignmentsStoreResponseError = (routePlaceAssignmentsStoreResponse401 | routePlaceAssignmentsStoreResponse422) & {
    headers: Headers;
};
export type routePlaceAssignmentsStoreResponse = (routePlaceAssignmentsStoreResponseSuccess | routePlaceAssignmentsStoreResponseError);
export declare const getRoutePlaceAssignmentsStoreUrl: () => string;
/**
 * @summary Create a new route place assignment
 */
export declare const routePlaceAssignmentsStore: (storeRoutePlaceAssignmentRequest: StoreRoutePlaceAssignmentRequest, options?: RequestInit) => Promise<routePlaceAssignmentsStoreResponse>;
export declare const getRoutePlaceAssignmentsStoreMutationKey: () => readonly ["routePlaceAssignmentsStore"];
export declare const getRoutePlaceAssignmentsStoreMutationOptions: <TError = AuthenticationExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof routePlaceAssignmentsStore>>, TError, RoutePlaceAssignmentsStoreMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof routePlaceAssignmentsStore>>, TError, RoutePlaceAssignmentsStoreMutationVariables, TContext>;
export type RoutePlaceAssignmentsStoreMutationResult = NonNullable<Awaited<ReturnType<typeof routePlaceAssignmentsStore>>>;
export type RoutePlaceAssignmentsStoreMutationBody = StoreRoutePlaceAssignmentRequest;
export type RoutePlaceAssignmentsStoreMutationError = AuthenticationExceptionResponse | ValidationExceptionResponse;
export type RoutePlaceAssignmentsStoreMutationVariables = {
    data: StoreRoutePlaceAssignmentRequest;
};
/**
* @summary Create a new route place assignment
*/
export declare const useRoutePlaceAssignmentsStore: <TError = AuthenticationExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof routePlaceAssignmentsStore>>, TError, RoutePlaceAssignmentsStoreMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof routePlaceAssignmentsStore>>, TError, RoutePlaceAssignmentsStoreMutationVariables, TContext>;
//# sourceMappingURL=route-place-assignments-store.d.ts.map