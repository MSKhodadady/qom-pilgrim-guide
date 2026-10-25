import type { DataTag, DefinedInitialDataOptions, DefinedUseQueryResult, QueryClient, QueryKey, UndefinedInitialDataOptions, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, PlacesIndex200 } from '../model';
export type placesIndexResponse200 = {
    data: PlacesIndex200;
    status: 200;
};
export type placesIndexResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type placesIndexResponseSuccess = (placesIndexResponse200) & {
    headers: Headers;
};
export type placesIndexResponseError = (placesIndexResponse401) & {
    headers: Headers;
};
export type placesIndexResponse = (placesIndexResponseSuccess | placesIndexResponseError);
export declare const getPlacesIndexUrl: () => string;
/**
 * @summary List the places in a stable order
 */
export declare const placesIndex: (options?: RequestInit) => Promise<placesIndexResponse>;
export declare const getPlacesIndexQueryKey: () => readonly ["/places"];
export declare const getPlacesIndexQueryOptions: <TData = Awaited<ReturnType<typeof placesIndex>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof placesIndex>>, TError, TData>>;
    fetch?: RequestInit;
}) => UseQueryOptions<Awaited<ReturnType<typeof placesIndex>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export type PlacesIndexQueryResult = NonNullable<Awaited<ReturnType<typeof placesIndex>>>;
export type PlacesIndexQueryError = AuthenticationExceptionResponse;
export declare function usePlacesIndex<TData = Awaited<ReturnType<typeof placesIndex>>, TError = AuthenticationExceptionResponse>(options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof placesIndex>>, TError, TData>> & Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof placesIndex>>, TError, Awaited<ReturnType<typeof placesIndex>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): DefinedUseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function usePlacesIndex<TData = Awaited<ReturnType<typeof placesIndex>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof placesIndex>>, TError, TData>> & Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof placesIndex>>, TError, Awaited<ReturnType<typeof placesIndex>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function usePlacesIndex<TData = Awaited<ReturnType<typeof placesIndex>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof placesIndex>>, TError, TData>>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
//# sourceMappingURL=places-index.d.ts.map