import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, ModelNotFoundExceptionResponse, RoutePlaceAssignmentsUpdate200, UpdateRoutePlaceAssignmentRequest, ValidationExceptionResponse } from '../model';
export type routePlaceAssignmentsUpdateResponse200 = {
    data: RoutePlaceAssignmentsUpdate200;
    status: 200;
};
export type routePlaceAssignmentsUpdateResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type routePlaceAssignmentsUpdateResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type routePlaceAssignmentsUpdateResponse422 = {
    data: ValidationExceptionResponse;
    status: 422;
};
export type routePlaceAssignmentsUpdateResponseSuccess = (routePlaceAssignmentsUpdateResponse200) & {
    headers: Headers;
};
export type routePlaceAssignmentsUpdateResponseError = (routePlaceAssignmentsUpdateResponse401 | routePlaceAssignmentsUpdateResponse404 | routePlaceAssignmentsUpdateResponse422) & {
    headers: Headers;
};
export type routePlaceAssignmentsUpdateResponse = (routePlaceAssignmentsUpdateResponseSuccess | routePlaceAssignmentsUpdateResponseError);
export declare const getRoutePlaceAssignmentsUpdateUrl: (routePlaceAssignment: number) => string;
/**
 * @summary Update an existing route place assignment
 */
export declare const routePlaceAssignmentsUpdate: (routePlaceAssignment: number, updateRoutePlaceAssignmentRequest: UpdateRoutePlaceAssignmentRequest, options?: RequestInit) => Promise<routePlaceAssignmentsUpdateResponse>;
export declare const getRoutePlaceAssignmentsUpdateMutationKey: () => readonly ["routePlaceAssignmentsUpdate"];
export declare const getRoutePlaceAssignmentsUpdateMutationOptions: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof routePlaceAssignmentsUpdate>>, TError, RoutePlaceAssignmentsUpdateMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof routePlaceAssignmentsUpdate>>, TError, RoutePlaceAssignmentsUpdateMutationVariables, TContext>;
export type RoutePlaceAssignmentsUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof routePlaceAssignmentsUpdate>>>;
export type RoutePlaceAssignmentsUpdateMutationBody = UpdateRoutePlaceAssignmentRequest;
export type RoutePlaceAssignmentsUpdateMutationError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse;
export type RoutePlaceAssignmentsUpdateMutationVariables = {
    routePlaceAssignment: number;
    data: UpdateRoutePlaceAssignmentRequest;
};
/**
* @summary Update an existing route place assignment
*/
export declare const useRoutePlaceAssignmentsUpdate: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse | ValidationExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof routePlaceAssignmentsUpdate>>, TError, RoutePlaceAssignmentsUpdateMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof routePlaceAssignmentsUpdate>>, TError, RoutePlaceAssignmentsUpdateMutationVariables, TContext>;
//# sourceMappingURL=route-place-assignments-update.d.ts.map