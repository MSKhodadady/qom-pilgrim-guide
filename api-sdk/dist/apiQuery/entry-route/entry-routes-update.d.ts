import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, EntryRoutesUpdate200, ModelNotFoundExceptionResponse, UpdateEntryRouteRequest, ValidationExceptionResponse } from '../model';
export type entryRoutesUpdateResponse200 = {
    data: EntryRoutesUpdate200;
    status: 200;
};
export type entryRoutesUpdateResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type entryRoutesUpdateResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type entryRoutesUpdateResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type entryRoutesUpdateResponseSuccess = (entryRoutesUpdateResponse200) & {
    headers: Headers;
};
export type entryRoutesUpdateResponseError = (entryRoutesUpdateResponse401 | entryRoutesUpdateResponse404 | entryRoutesUpdateResponse422) & {
    headers: Headers;
};
export type entryRoutesUpdateResponse = (entryRoutesUpdateResponseSuccess | entryRoutesUpdateResponseError);
export declare const getEntryRoutesUpdateUrl: (entryRoute: number) => string;
/**
 * @summary Update an existing entry route
 */
export declare const entryRoutesUpdate: (entryRoute: number, updateEntryRouteRequest?: UpdateEntryRouteRequest, options?: RequestInit) => Promise<entryRoutesUpdateResponse>;
export declare const getEntryRoutesUpdateMutationKey: () => readonly ["entryRoutesUpdate"];
export declare const getEntryRoutesUpdateMutationOptions: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof entryRoutesUpdate>>, TError, EntryRoutesUpdateMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof entryRoutesUpdate>>, TError, EntryRoutesUpdateMutationVariables, TContext>;
export type EntryRoutesUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof entryRoutesUpdate>>>;
export type EntryRoutesUpdateMutationBody = UpdateEntryRouteRequest | undefined;
export type EntryRoutesUpdateMutationError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse;
export type EntryRoutesUpdateMutationVariables = {
    entryRoute: number;
    data?: UpdateEntryRouteRequest;
};
/**
* @summary Update an existing entry route
*/
export declare const useEntryRoutesUpdate: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof entryRoutesUpdate>>, TError, EntryRoutesUpdateMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof entryRoutesUpdate>>, TError, EntryRoutesUpdateMutationVariables, TContext>;
//# sourceMappingURL=entry-routes-update.d.ts.map