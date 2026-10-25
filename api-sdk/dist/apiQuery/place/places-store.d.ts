import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, PlacesStore201, StorePlaceRequest, ValidationExceptionResponse } from '../model';
export type placesStoreResponse201 = {
    data: PlacesStore201;
    status: 201;
};
export type placesStoreResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type placesStoreResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type placesStoreResponseSuccess = (placesStoreResponse201) & {
    headers: Headers;
};
export type placesStoreResponseError = (placesStoreResponse401 | placesStoreResponse422) & {
    headers: Headers;
};
export type placesStoreResponse = (placesStoreResponseSuccess | placesStoreResponseError);
export declare const getPlacesStoreUrl: () => string;
/**
 * @summary Create a new place
 */
export declare const placesStore: (storePlaceRequest: StorePlaceRequest, options?: RequestInit) => Promise<placesStoreResponse>;
export declare const getPlacesStoreMutationKey: () => readonly ["placesStore"];
export declare const getPlacesStoreMutationOptions: <TError = AuthenticationExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof placesStore>>, TError, PlacesStoreMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof placesStore>>, TError, PlacesStoreMutationVariables, TContext>;
export type PlacesStoreMutationResult = NonNullable<Awaited<ReturnType<typeof placesStore>>>;
export type PlacesStoreMutationBody = StorePlaceRequest;
export type PlacesStoreMutationError = AuthenticationExceptionResponse | ValidationExceptionResponse;
export type PlacesStoreMutationVariables = {
    data: StorePlaceRequest;
};
/**
* @summary Create a new place
*/
export declare const usePlacesStore: <TError = AuthenticationExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof placesStore>>, TError, PlacesStoreMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof placesStore>>, TError, PlacesStoreMutationVariables, TContext>;
//# sourceMappingURL=places-store.d.ts.map