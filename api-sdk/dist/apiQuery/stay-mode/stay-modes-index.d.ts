import type { DataTag, DefinedInitialDataOptions, DefinedUseQueryResult, QueryClient, QueryKey, UndefinedInitialDataOptions, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, StayModesIndex200 } from '../model';
export type stayModesIndexResponse200 = {
    data: StayModesIndex200;
    status: 200;
};
export type stayModesIndexResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type stayModesIndexResponseSuccess = (stayModesIndexResponse200) & {
    headers: Headers;
};
export type stayModesIndexResponseError = (stayModesIndexResponse401) & {
    headers: Headers;
};
export type stayModesIndexResponse = (stayModesIndexResponseSuccess | stayModesIndexResponseError);
export declare const getStayModesIndexUrl: () => string;
/**
 * @summary List the stay modes in a stable order
 */
export declare const stayModesIndex: (options?: RequestInit) => Promise<stayModesIndexResponse>;
export declare const getStayModesIndexQueryKey: () => readonly [`${string}/stay-modes`];
export declare const getStayModesIndexQueryOptions: <TData = Awaited<ReturnType<typeof stayModesIndex>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof stayModesIndex>>, TError, TData>>;
    fetch?: RequestInit;
}) => UseQueryOptions<Awaited<ReturnType<typeof stayModesIndex>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export type StayModesIndexQueryResult = NonNullable<Awaited<ReturnType<typeof stayModesIndex>>>;
export type StayModesIndexQueryError = AuthenticationExceptionResponse;
export declare function useStayModesIndex<TData = Awaited<ReturnType<typeof stayModesIndex>>, TError = AuthenticationExceptionResponse>(options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof stayModesIndex>>, TError, TData>> & Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof stayModesIndex>>, TError, Awaited<ReturnType<typeof stayModesIndex>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): DefinedUseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useStayModesIndex<TData = Awaited<ReturnType<typeof stayModesIndex>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof stayModesIndex>>, TError, TData>> & Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof stayModesIndex>>, TError, Awaited<ReturnType<typeof stayModesIndex>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useStayModesIndex<TData = Awaited<ReturnType<typeof stayModesIndex>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof stayModesIndex>>, TError, TData>>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
//# sourceMappingURL=stay-modes-index.d.ts.map