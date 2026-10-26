import type { DataTag, DefinedInitialDataOptions, DefinedUseQueryResult, QueryClient, QueryKey, UndefinedInitialDataOptions, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, EntryRoutesShow200, ModelNotFoundExceptionResponse } from '../model';
export type entryRoutesShowResponse200 = {
    data: EntryRoutesShow200;
    status: 200;
};
export type entryRoutesShowResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type entryRoutesShowResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type entryRoutesShowResponseSuccess = (entryRoutesShowResponse200) & {
    headers: Headers;
};
export type entryRoutesShowResponseError = (entryRoutesShowResponse401 | entryRoutesShowResponse404) & {
    headers: Headers;
};
export type entryRoutesShowResponse = (entryRoutesShowResponseSuccess | entryRoutesShowResponseError);
export declare const getEntryRoutesShowUrl: (entryRoute: number) => string;
/**
 * @summary Show a single entry route
 */
export declare const entryRoutesShow: (entryRoute: number, options?: RequestInit) => Promise<entryRoutesShowResponse>;
export declare const getEntryRoutesShowQueryKey: (entryRoute: number) => readonly [`undefined/entry-routes/${number}` | `${string}/entry-routes/${number}`];
export declare const getEntryRoutesShowQueryOptions: <TData = Awaited<ReturnType<typeof entryRoutesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(entryRoute: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof entryRoutesShow>>, TError, TData>>;
    fetch?: RequestInit;
}) => UseQueryOptions<Awaited<ReturnType<typeof entryRoutesShow>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export type EntryRoutesShowQueryResult = NonNullable<Awaited<ReturnType<typeof entryRoutesShow>>>;
export type EntryRoutesShowQueryError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse;
export declare function useEntryRoutesShow<TData = Awaited<ReturnType<typeof entryRoutesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(entryRoute: number, options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof entryRoutesShow>>, TError, TData>> & Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof entryRoutesShow>>, TError, Awaited<ReturnType<typeof entryRoutesShow>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): DefinedUseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useEntryRoutesShow<TData = Awaited<ReturnType<typeof entryRoutesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(entryRoute: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof entryRoutesShow>>, TError, TData>> & Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof entryRoutesShow>>, TError, Awaited<ReturnType<typeof entryRoutesShow>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useEntryRoutesShow<TData = Awaited<ReturnType<typeof entryRoutesShow>>, TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse>(entryRoute: number, options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof entryRoutesShow>>, TError, TData>>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
//# sourceMappingURL=entry-routes-show.d.ts.map