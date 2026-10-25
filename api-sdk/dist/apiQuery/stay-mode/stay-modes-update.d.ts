import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, ModelNotFoundExceptionResponse, StayModesUpdate200, UpdateStayModeRequest, ValidationExceptionResponse } from '../model';
export type stayModesUpdateResponse200 = {
    data: StayModesUpdate200;
    status: 200;
};
export type stayModesUpdateResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type stayModesUpdateResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type stayModesUpdateResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type stayModesUpdateResponseSuccess = (stayModesUpdateResponse200) & {
    headers: Headers;
};
export type stayModesUpdateResponseError = (stayModesUpdateResponse401 | stayModesUpdateResponse404 | stayModesUpdateResponse422) & {
    headers: Headers;
};
export type stayModesUpdateResponse = (stayModesUpdateResponseSuccess | stayModesUpdateResponseError);
export declare const getStayModesUpdateUrl: (stayMode: number) => string;
/**
 * @summary Update an existing stay mode
 */
export declare const stayModesUpdate: (stayMode: number, updateStayModeRequest?: UpdateStayModeRequest, options?: RequestInit) => Promise<stayModesUpdateResponse>;
export declare const getStayModesUpdateMutationKey: () => readonly ["stayModesUpdate"];
export declare const getStayModesUpdateMutationOptions: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof stayModesUpdate>>, TError, StayModesUpdateMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof stayModesUpdate>>, TError, StayModesUpdateMutationVariables, TContext>;
export type StayModesUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof stayModesUpdate>>>;
export type StayModesUpdateMutationBody = UpdateStayModeRequest | undefined;
export type StayModesUpdateMutationError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse;
export type StayModesUpdateMutationVariables = {
    stayMode: number;
    data?: UpdateStayModeRequest;
};
/**
* @summary Update an existing stay mode
*/
export declare const useStayModesUpdate: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof stayModesUpdate>>, TError, StayModesUpdateMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof stayModesUpdate>>, TError, StayModesUpdateMutationVariables, TContext>;
//# sourceMappingURL=stay-modes-update.d.ts.map