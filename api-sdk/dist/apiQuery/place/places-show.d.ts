import type { DataTag, DefinedInitialDataOptions, DefinedUseQueryResult, QueryClient, QueryKey, UndefinedInitialDataOptions, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, ModelNotFoundExceptionResponse, PlacesShow200 } from '../model';
export type placesShowResponse200 = {
    data: PlacesShow200;
    status: 200;
};
export type placesShowResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type placesShowResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type placesShowResponseSuccess = (placesShowResponse200) & {
    headers: Headers;
};
export type placesShowResponseError = (placesShowResponse401 | placesShowResponse404) & {
    headers: Headers;
};
export type placesShowResponse = (placesShowResponseSuccess | placesShowResponseError);
export declare const getPlacesShowUrl: (place: number) => string;
/**
 * @summary Show a single place
 */
export declare const placesShow: (place: number, options?: RequestInit) => Promise<placesShowResponse>;
export declare const getPlacesShowQueryKey: (place: number) => readonly [`/places/${number}`];
export declare const getPlacesShowQueryOptions: <TData = Awaited<ReturnType<typeof placesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(place: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof placesShow>>, TError, TData>>;
    fetch?: RequestInit;
}) => UseQueryOptions<Awaited<ReturnType<typeof placesShow>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export type PlacesShowQueryResult = NonNullable<Awaited<ReturnType<typeof placesShow>>>;
export type PlacesShowQueryError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse;
export declare function usePlacesShow<TData = Awaited<ReturnType<typeof placesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(place: number, options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof placesShow>>, TError, TData>> & Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof placesShow>>, TError, Awaited<ReturnType<typeof placesShow>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): DefinedUseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function usePlacesShow<TData = Awaited<ReturnType<typeof placesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(place: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof placesShow>>, TError, TData>> & Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof placesShow>>, TError, Awaited<ReturnType<typeof placesShow>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function usePlacesShow<TData = Awaited<ReturnType<typeof placesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(place: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof placesShow>>, TError, TData>>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
//# sourceMappingURL=places-show.d.ts.map