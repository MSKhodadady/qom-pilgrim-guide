"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routePlaceAssignmentsIndex = exports.getRoutePlaceAssignmentsIndexUrl = void 0;
const getRoutePlaceAssignmentsIndexUrl = (params) => {
    const normalizedParams = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
        if (value !== undefined) {
            normalizedParams.append(key, value === null ? 'null' : String(value));
        }
    });
    const stringifiedParams = normalizedParams.toString();
    return stringifiedParams.length > 0 ? `/route-place-assignments?${stringifiedParams}` : `/route-place-assignments`;
};
exports.getRoutePlaceAssignmentsIndexUrl = getRoutePlaceAssignmentsIndexUrl;
/**
 * @summary List the route place assignments, optionally filtered by entry route
and stay mode. Each filter accepts either an id or a slug
 */
const routePlaceAssignmentsIndex = async (params, options) => {
    const res = await fetch((0, exports.getRoutePlaceAssignmentsIndexUrl)(params), {
        ...options,
        method: 'GET'
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : {};
    return { data, status: res.status, headers: res.headers };
};
exports.routePlaceAssignmentsIndex = routePlaceAssignmentsIndex;
