import type { DataTag, DefinedInitialDataOptions, DefinedUseQueryResult, QueryClient, QueryKey, UndefinedInitialDataOptions, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, ModelNotFoundExceptionResponse, StayModesShow200 } from '../model';
export type stayModesShowResponse200 = {
    data: StayModesShow200;
    status: 200;
};
export type stayModesShowResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type stayModesShowResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type stayModesShowResponseSuccess = (stayModesShowResponse200) & {
    headers: Headers;
};
export type stayModesShowResponseError = (stayModesShowResponse401 | stayModesShowResponse404) & {
    headers: Headers;
};
export type stayModesShowResponse = (stayModesShowResponseSuccess | stayModesShowResponseError);
export declare const getStayModesShowUrl: (stayMode: number) => string;
/**
 * @summary Show a single stay mode
 */
export declare const stayModesShow: (stayMode: number, options?: RequestInit) => Promise<stayModesShowResponse>;
export declare const getStayModesShowQueryKey: (stayMode: number) => readonly [`/stay-modes/${number}`];
export declare const getStayModesShowQueryOptions: <TData = Awaited<ReturnType<typeof stayModesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(stayMode: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof stayModesShow>>, TError, TData>>;
    fetch?: RequestInit;
}) => UseQueryOptions<Awaited<ReturnType<typeof stayModesShow>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export type StayModesShowQueryResult = NonNullable<Awaited<ReturnType<typeof stayModesShow>>>;
export type StayModesShowQueryError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse;
export declare function useStayModesShow<TData = Awaited<ReturnType<typeof stayModesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(stayMode: number, options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof stayModesShow>>, TError, TData>> & Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof stayModesShow>>, TError, Awaited<ReturnType<typeof stayModesShow>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): DefinedUseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useStayModesShow<TData = Awaited<ReturnType<typeof stayModesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(stayMode: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof stayModesShow>>, TError, TData>> & Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof stayModesShow>>, TError, Awaited<ReturnType<typeof stayModesShow>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useStayModesShow<TData = Awaited<ReturnType<typeof stayModesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(stayMode: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof stayModesShow>>, TError, TData>>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
//# sourceMappingURL=stay-modes-show.d.ts.map