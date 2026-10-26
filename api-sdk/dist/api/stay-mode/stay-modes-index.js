"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stayModesIndex = exports.getStayModesIndexUrl = void 0;
const getStayModesIndexUrl = () => {
    return `/api/stay-modes`;
};
exports.getStayModesIndexUrl = getStayModesIndexUrl;
/**
 * @summary List the stay modes in a stable order
 */
const stayModesIndex = async (options) => {
    const res = await fetch((0, exports.getStayModesIndexUrl)(), {
        ...options,
        method: 'GET'
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : {};
    return { data, status: res.status, headers: res.headers };
};
exports.stayModesIndex = stayModesIndex;
