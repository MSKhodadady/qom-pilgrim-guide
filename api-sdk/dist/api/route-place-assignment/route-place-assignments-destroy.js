"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routePlaceAssignmentsDestroy = exports.getRoutePlaceAssignmentsDestroyUrl = void 0;
const getRoutePlaceAssignmentsDestroyUrl = (routePlaceAssignment) => {
    return `/route-place-assignments/${routePlaceAssignment}`;
};
exports.getRoutePlaceAssignmentsDestroyUrl = getRoutePlaceAssignmentsDestroyUrl;
/**
 * @summary Delete a route place assignment
 */
const routePlaceAssignmentsDestroy = async (routePlaceAssignment, options) => {
    const res = await fetch((0, exports.getRoutePlaceAssignmentsDestroyUrl)(routePlaceAssignment), {
        ...options,
        method: 'DELETE'
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : undefined;
    return { data, status: res.status, headers: res.headers };
};
exports.routePlaceAssignmentsDestroy = routePlaceAssignmentsDestroy;
