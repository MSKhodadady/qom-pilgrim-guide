"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stayModesDestroy = exports.getStayModesDestroyUrl = void 0;
const getStayModesDestroyUrl = (stayMode) => {
    return `/api/stay-modes/${stayMode}`;
};
exports.getStayModesDestroyUrl = getStayModesDestroyUrl;
/**
 * @summary Delete a stay mode
 */
const stayModesDestroy = async (stayMode, options) => {
    const res = await fetch((0, exports.getStayModesDestroyUrl)(stayMode), {
        ...options,
        method: 'DELETE'
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : undefined;
    return { data, status: res.status, headers: res.headers };
};
exports.stayModesDestroy = stayModesDestroy;
