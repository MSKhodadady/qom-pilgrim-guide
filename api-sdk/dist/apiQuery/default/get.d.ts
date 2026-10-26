import type { DataTag, DefinedInitialDataOptions, DefinedUseQueryResult, QueryClient, QueryKey, UndefinedInitialDataOptions, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
export type getResponse200 = {
    data: 'HEllo world!';
    status: 200;
};
export type getResponseSuccess = (getResponse200) & {
    headers: Headers;
};
export type getResponse = (getResponseSuccess);
export declare const getGetUrl: () => string;
export declare const get: (options?: RequestInit) => Promise<getResponse>;
export declare const getGetQueryKey: () => readonly [`${string}/`];
export declare const getGetQueryOptions: <TData = Awaited<ReturnType<typeof get>>, TError = unknown>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof get>>, TError, TData>>;
    fetch?: RequestInit;
}) => UseQueryOptions<Awaited<ReturnType<typeof get>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export type GetQueryResult = NonNullable<Awaited<ReturnType<typeof get>>>;
export type GetQueryError = unknown;
export declare function useGet<TData = Awaited<ReturnType<typeof get>>, TError = unknown>(options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof get>>, TError, TData>> & Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof get>>, TError, Awaited<ReturnType<typeof get>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): DefinedUseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useGet<TData = Awaited<ReturnType<typeof get>>, TError = unknown>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof get>>, TError, TData>> & Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof get>>, TError, Awaited<ReturnType<typeof get>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useGet<TData = Awaited<ReturnType<typeof get>>, TError = unknown>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof get>>, TError, TData>>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
//# sourceMappingURL=get.d.ts.map