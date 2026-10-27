"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryRoutesShow = exports.getEntryRoutesShowUrl = void 0;
const getEntryRoutesShowUrl = (entryRoute) => {
    return `${process.env.API_BASE_URL}/entry-routes/${entryRoute}`;
};
exports.getEntryRoutesShowUrl = getEntryRoutesShowUrl;
/**
 * @summary Show a single entry route
 */
const entryRoutesShow = async (entryRoute, options) => {
    const res = await fetch((0, exports.getEntryRoutesShowUrl)(entryRoute), {
        ...options,
        method: 'GET'
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : {};
    return { data, status: res.status, headers: res.headers };
};
exports.entryRoutesShow = entryRoutesShow;
