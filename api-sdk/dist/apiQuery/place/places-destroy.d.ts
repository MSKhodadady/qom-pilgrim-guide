import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, ModelNotFoundExceptionResponse } from '../model';
export type placesDestroyResponse204 = {
    data: void;
    status: 204;
};
export type placesDestroyResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type placesDestroyResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type placesDestroyResponseSuccess = (placesDestroyResponse204) & {
    headers: Headers;
};
export type placesDestroyResponseError = (placesDestroyResponse401 | placesDestroyResponse404) & {
    headers: Headers;
};
export type placesDestroyResponse = (placesDestroyResponseSuccess | placesDestroyResponseError);
export declare const getPlacesDestroyUrl: (place: number) => string;
/**
 * @summary Delete a place
 */
export declare const placesDestroy: (place: number, options?: RequestInit) => Promise<placesDestroyResponse>;
export declare const getPlacesDestroyMutationKey: () => readonly ["placesDestroy"];
export declare const getPlacesDestroyMutationOptions: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof placesDestroy>>, TError, PlacesDestroyMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof placesDestroy>>, TError, PlacesDestroyMutationVariables, TContext>;
export type PlacesDestroyMutationResult = NonNullable<Awaited<ReturnType<typeof placesDestroy>>>;
export type PlacesDestroyMutationError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse;
export type PlacesDestroyMutationVariables = {
    place: number;
};
/**
* @summary Delete a place
*/
export declare const usePlacesDestroy: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof placesDestroy>>, TError, PlacesDestroyMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof placesDestroy>>, TError, PlacesDestroyMutationVariables, TContext>;
//# sourceMappingURL=places-destroy.d.ts.map