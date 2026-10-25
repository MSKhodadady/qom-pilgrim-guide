import type { DataTag, DefinedInitialDataOptions, DefinedUseQueryResult, QueryClient, QueryKey, UndefinedInitialDataOptions, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, RoutePlaceAssignmentsIndex200, RoutePlaceAssignmentsIndexParams, ValidationExceptionResponse } from '../model';
export type routePlaceAssignmentsIndexResponse200 = {
    data: RoutePlaceAssignmentsIndex200;
    status: 200;
};
export type routePlaceAssignmentsIndexResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type routePlaceAssignmentsIndexResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type routePlaceAssignmentsIndexResponseSuccess = (routePlaceAssignmentsIndexResponse200) & {
    headers: Headers;
};
export type routePlaceAssignmentsIndexResponseError = (routePlaceAssignmentsIndexResponse401 | routePlaceAssignmentsIndexResponse422) & {
    headers: Headers;
};
export type routePlaceAssignmentsIndexResponse = (routePlaceAssignmentsIndexResponseSuccess | routePlaceAssignmentsIndexResponseError);
export declare const getRoutePlaceAssignmentsIndexUrl: (params?: RoutePlaceAssignmentsIndexParams) => string;
/**
 * @summary List the route place assignments, optionally filtered by entry route
and stay mode. Each filter accepts either an id or a slug
 */
export declare const routePlaceAssignmentsIndex: (params?: RoutePlaceAssignmentsIndexParams, options?: RequestInit) => Promise<routePlaceAssignmentsIndexResponse>;
export declare const getRoutePlaceAssignmentsIndexQueryKey: (params?: RoutePlaceAssignmentsIndexParams) => readonly ["/route-place-assignments", ...RoutePlaceAssignmentsIndexParams[]];
export declare const getRoutePlaceAssignmentsIndexQueryOptions: <TData = Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>, TError = AuthenticationExceptionResponse | ValidationExceptionResponse>(params?: RoutePlaceAssignmentsIndexParams, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>, TError, TData>>;
    fetch?: RequestInit;
}) => UseQueryOptions<Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export type RoutePlaceAssignmentsIndexQueryResult = NonNullable<Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>>;
export type RoutePlaceAssignmentsIndexQueryError = AuthenticationExceptionResponse | ValidationExceptionResponse;
export declare function useRoutePlaceAssignmentsIndex<TData = Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>, TError = AuthenticationExceptionResponse | ValidationExceptionResponse>(params: undefined | RoutePlaceAssignmentsIndexParams, options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>, TError, TData>> & Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>, TError, Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): DefinedUseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useRoutePlaceAssignmentsIndex<TData = Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>, TError = AuthenticationExceptionResponse | ValidationExceptionResponse>(params?: RoutePlaceAssignmentsIndexParams, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>, TError, TData>> & Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>, TError, Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useRoutePlaceAssignmentsIndex<TData = Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>, TError = AuthenticationExceptionResponse | ValidationExceptionResponse>(params?: RoutePlaceAssignmentsIndexParams, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof routePlaceAssignmentsIndex>>, TError, TData>>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
//# sourceMappingURL=route-place-assignments-index.d.ts.map