import type { DataTag, DefinedInitialDataOptions, DefinedUseQueryResult, QueryClient, QueryKey, UndefinedInitialDataOptions, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, EntryRoutesIndex200 } from '../model';
export type entryRoutesIndexResponse200 = {
    data: EntryRoutesIndex200;
    status: 200;
};
export type entryRoutesIndexResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type entryRoutesIndexResponseSuccess = (entryRoutesIndexResponse200) & {
    headers: Headers;
};
export type entryRoutesIndexResponseError = (entryRoutesIndexResponse401) & {
    headers: Headers;
};
export type entryRoutesIndexResponse = (entryRoutesIndexResponseSuccess | entryRoutesIndexResponseError);
export declare const getEntryRoutesIndexUrl: () => string;
/**
 * @summary List the entry routes ordered by their configured display order
 */
export declare const entryRoutesIndex: (options?: RequestInit) => Promise<entryRoutesIndexResponse>;
export declare const getEntryRoutesIndexQueryKey: () => readonly ["/entry-routes"];
export declare const getEntryRoutesIndexQueryOptions: <TData = Awaited<ReturnType<typeof entryRoutesIndex>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof entryRoutesIndex>>, TError, TData>>;
    fetch?: RequestInit;
}) => UseQueryOptions<Awaited<ReturnType<typeof entryRoutesIndex>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export type EntryRoutesIndexQueryResult = NonNullable<Awaited<ReturnType<typeof entryRoutesIndex>>>;
export type EntryRoutesIndexQueryError = AuthenticationExceptionResponse;
export declare function useEntryRoutesIndex<TData = Awaited<ReturnType<typeof entryRoutesIndex>>, TError = AuthenticationExceptionResponse>(options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof entryRoutesIndex>>, TError, TData>> & Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof entryRoutesIndex>>, TError, Awaited<ReturnType<typeof entryRoutesIndex>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): DefinedUseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useEntryRoutesIndex<TData = Awaited<ReturnType<typeof entryRoutesIndex>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof entryRoutesIndex>>, TError, TData>> & Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof entryRoutesIndex>>, TError, Awaited<ReturnType<typeof entryRoutesIndex>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useEntryRoutesIndex<TData = Awaited<ReturnType<typeof entryRoutesIndex>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof entryRoutesIndex>>, TError, TData>>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
//# sourceMappingURL=entry-routes-index.d.ts.map