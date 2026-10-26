"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routePlaceAssignmentsShow = exports.getRoutePlaceAssignmentsShowUrl = void 0;
const getRoutePlaceAssignmentsShowUrl = (routePlaceAssignment) => {
    return `/route-place-assignments/${routePlaceAssignment}`;
};
exports.getRoutePlaceAssignmentsShowUrl = getRoutePlaceAssignmentsShowUrl;
/**
 * @summary Show a single route place assignment with its linked records
 */
const routePlaceAssignmentsShow = async (routePlaceAssignment, options) => {
    const res = await fetch((0, exports.getRoutePlaceAssignmentsShowUrl)(routePlaceAssignment), {
        ...options,
        method: 'GET'
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : {};
    return { data, status: res.status, headers: res.headers };
};
exports.routePlaceAssignmentsShow = routePlaceAssignmentsShow;
