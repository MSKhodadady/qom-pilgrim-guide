import type { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import type { AuthenticationExceptionResponse, ModelNotFoundExceptionResponse } from '../model';
export type routePlaceAssignmentsDestroyResponse204 = {
    data: void;
    status: 204;
};
export type routePlaceAssignmentsDestroyResponse401 = {
    data: AuthenticationExceptionResponse;
    status: 401;
};
export type routePlaceAssignmentsDestroyResponse404 = {
    data: ModelNotFoundExceptionResponse;
    status: 404;
};
export type routePlaceAssignmentsDestroyResponseSuccess = (routePlaceAssignmentsDestroyResponse204) & {
    headers: Headers;
};
export type routePlaceAssignmentsDestroyResponseError = (routePlaceAssignmentsDestroyResponse401 | routePlaceAssignmentsDestroyResponse404) & {
    headers: Headers;
};
export type routePlaceAssignmentsDestroyResponse = (routePlaceAssignmentsDestroyResponseSuccess | routePlaceAssignmentsDestroyResponseError);
export declare const getRoutePlaceAssignmentsDestroyUrl: (routePlaceAssignment: number) => string;
/**
 * @summary Delete a route place assignment
 */
export declare const routePlaceAssignmentsDestroy: (routePlaceAssignment: number, options?: RequestInit) => Promise<routePlaceAssignmentsDestroyResponse>;
export declare const getRoutePlaceAssignmentsDestroyMutationKey: () => readonly ["routePlaceAssignmentsDestroy"];
export declare const getRoutePlaceAssignmentsDestroyMutationOptions: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof routePlaceAssignmentsDestroy>>, TError, RoutePlaceAssignmentsDestroyMutationVariables, TContext>;
    fetch?: RequestInit;
}) => UseMutationOptions<Awaited<ReturnType<typeof routePlaceAssignmentsDestroy>>, TError, RoutePlaceAssignmentsDestroyMutationVariables, TContext>;
export type RoutePlaceAssignmentsDestroyMutationResult = NonNullable<Awaited<ReturnType<typeof routePlaceAssignmentsDestroy>>>;
export type RoutePlaceAssignmentsDestroyMutationError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse;
export type RoutePlaceAssignmentsDestroyMutationVariables = {
    routePlaceAssignment: number;
};
/**
* @summary Delete a route place assignment
*/
export declare const useRoutePlaceAssignmentsDestroy: <TError = AuthenticationExceptionResponse | ModelNotFoundExceptionResponse, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof routePlaceAssignmentsDestroy>>, TError, RoutePlaceAssignmentsDestroyMutationVariables, TContext>;
    fetch?: RequestInit;
}, queryClient?: QueryClient) => UseMutationResult<Awaited<ReturnType<typeof routePlaceAssignmentsDestroy>>, TError, RoutePlaceAssignmentsDestroyMutationVariables, TContext>;
//# sourceMappingURL=route-place-assignments-destroy.d.ts.map