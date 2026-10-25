import type { DataTag, DefinedInitialDataOptions, DefinedUseQueryResult, QueryClient, QueryKey, UndefinedInitialDataOptions, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, ModelNotFoundExceptionResponse, RoutePlaceAssignmentsShow200 } from '../model';
export type routePlaceAssignmentsShowResponse200 = {
    data: RoutePlaceAssignmentsShow200;
    status: 200;
};
export type routePlaceAssignmentsShowResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type routePlaceAssignmentsShowResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type routePlaceAssignmentsShowResponseSuccess = (routePlaceAssignmentsShowResponse200) & {
    headers: Headers;
};
export type routePlaceAssignmentsShowResponseError = (routePlaceAssignmentsShowResponse401 | routePlaceAssignmentsShowResponse404) & {
    headers: Headers;
};
export type routePlaceAssignmentsShowResponse = (routePlaceAssignmentsShowResponseSuccess | routePlaceAssignmentsShowResponseError);
export declare const getRoutePlaceAssignmentsShowUrl: (routePlaceAssignment: number) => string;
/**
 * @summary Show a single route place assignment with its linked records
 */
export declare const routePlaceAssignmentsShow: (routePlaceAssignment: number, options?: RequestInit) => Promise<routePlaceAssignmentsShowResponse>;
export declare const getRoutePlaceAssignmentsShowQueryKey: (routePlaceAssignment: number) => readonly [`/route-place-assignments/${number}`];
export declare const getRoutePlaceAssignmentsShowQueryOptions: <TData = Awaited<ReturnType<typeof routePlaceAssignmentsShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(routePlaceAssignment: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof routePlaceAssignmentsShow>>, TError, TData>>;
    fetch?: RequestInit;
}) => UseQueryOptions<Awaited<ReturnType<typeof routePlaceAssignmentsShow>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export type RoutePlaceAssignmentsShowQueryResult = NonNullable<Awaited<ReturnType<typeof routePlaceAssignmentsShow>>>;
export type RoutePlaceAssignmentsShowQueryError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse;
export declare function useRoutePlaceAssignmentsShow<TData = Awaited<ReturnType<typeof routePlaceAssignmentsShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(routePlaceAssignment: number, options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof routePlaceAssignmentsShow>>, TError, TData>> & Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof routePlaceAssignmentsShow>>, TError, Awaited<ReturnType<typeof routePlaceAssignmentsShow>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): DefinedUseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useRoutePlaceAssignmentsShow<TData = Awaited<ReturnType<typeof routePlaceAssignmentsShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(routePlaceAssignment: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof routePlaceAssignmentsShow>>, TError, TData>> & Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof routePlaceAssignmentsShow>>, TError, Awaited<ReturnType<typeof routePlaceAssignmentsShow>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useRoutePlaceAssignmentsShow<TData = Awaited<ReturnType<typeof routePlaceAssignmentsShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(routePlaceAssignment: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof routePlaceAssignmentsShow>>, TError, TData>>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
//# sourceMappingURL=route-place-assignments-show.d.ts.map