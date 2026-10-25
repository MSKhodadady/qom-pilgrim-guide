import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, ModelNotFoundExceptionResponse, PlacesUpdate200, UpdatePlaceRequest, ValidationExceptionResponse } from '../model';
export type placesUpdateResponse200 = {
    data: PlacesUpdate200;
    status: 200;
};
export type placesUpdateResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type placesUpdateResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type placesUpdateResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type placesUpdateResponseSuccess = (placesUpdateResponse200) & {
    headers: Headers;
};
export type placesUpdateResponseError = (placesUpdateResponse401 | placesUpdateResponse404 | placesUpdateResponse422) & {
    headers: Headers;
};
export type placesUpdateResponse = (placesUpdateResponseSuccess | placesUpdateResponseError);
export declare const getPlacesUpdateUrl: (place: number) => string;
/**
 * @summary Update an existing place
 */
export declare const placesUpdate: (place: number, updatePlaceRequest?: UpdatePlaceRequest, options?: RequestInit) => Promise<placesUpdateResponse>;
export declare const getPlacesUpdateMutationKey: () => readonly ["placesUpdate"];
export declare const getPlacesUpdateMutationOptions: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof placesUpdate>>, TError, PlacesUpdateMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof placesUpdate>>, TError, PlacesUpdateMutationVariables, TContext>;
export type PlacesUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof placesUpdate>>>;
export type PlacesUpdateMutationBody = UpdatePlaceRequest | undefined;
export type PlacesUpdateMutationError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse;
export type PlacesUpdateMutationVariables = {
    place: number;
    data?: UpdatePlaceRequest;
};
/**
* @summary Update an existing place
*/
export declare const usePlacesUpdate: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof placesUpdate>>, TError, PlacesUpdateMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof placesUpdate>>, TError, PlacesUpdateMutationVariables, TContext>;
//# sourceMappingURL=places-update.d.ts.map