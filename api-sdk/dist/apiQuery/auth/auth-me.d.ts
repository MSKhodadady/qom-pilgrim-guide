import type { DataTag, DefinedInitialDataOptions, DefinedUseQueryResult, QueryClient, QueryKey, UndefinedInitialDataOptions, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AuthMe200, AuthenticationExceptionResponse } from '../model';
export type authMeResponse200 = {
    data: AuthMe200;
    status: 200;
};
export type authMeResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type authMeResponseSuccess = (authMeResponse200) & {
    headers: Headers;
};
export type authMeResponseError = (authMeResponse401) & {
    headers: Headers;
};
export type authMeResponse = (authMeResponseSuccess | authMeResponseError);
export declare const getAuthMeUrl: () => string;
/**
 * @summary Return the currently authenticated admin
 */
export declare const authMe: (options?: RequestInit) => Promise<authMeResponse>;
export declare const getAuthMeQueryKey: () => readonly ["/auth/me"];
export declare const getAuthMeQueryOptions: <TData = Awaited<ReturnType<typeof authMe>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof authMe>>, TError, TData>>;
    fetch?: RequestInit;
}) => UseQueryOptions<Awaited<ReturnType<typeof authMe>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export type AuthMeQueryResult = NonNullable<Awaited<ReturnType<typeof authMe>>>;
export type AuthMeQueryError = AuthenticationExceptionResponse;
export declare function useAuthMe<TData = Awaited<ReturnType<typeof authMe>>, TError = AuthenticationExceptionResponse>(options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof authMe>>, TError, TData>> & Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof authMe>>, TError, Awaited<ReturnType<typeof authMe>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): DefinedUseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useAuthMe<TData = Awaited<ReturnType<typeof authMe>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof authMe>>, TError, TData>> & Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof authMe>>, TError, Awaited<ReturnType<typeof authMe>>>, 'initialData'>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
export declare function useAuthMe<TData = Awaited<ReturnType<typeof authMe>>, TError = AuthenticationExceptionResponse>(options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof authMe>>, TError, TData>>;
    fetch?: RequestInit;
}, queryClient?: QueryClient): UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
};
//# sourceMappingURL=auth-me.d.ts.map