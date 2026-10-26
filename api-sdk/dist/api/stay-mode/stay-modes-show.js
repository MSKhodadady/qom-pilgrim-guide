"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stayModesShow = exports.getStayModesShowUrl = void 0;
const getStayModesShowUrl = (stayMode) => {
    return `/api/stay-modes/${stayMode}`;
};
exports.getStayModesShowUrl = getStayModesShowUrl;
/**
 * @summary Show a single stay mode
 */
const stayModesShow = async (stayMode, options) => {
    const res = await fetch((0, exports.getStayModesShowUrl)(stayMode), {
        ...options,
        method: 'GET'
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : {};
    return { data, status: res.status, headers: res.headers };
};
exports.stayModesShow = stayModesShow;
