"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryRoutesIndex = exports.getEntryRoutesIndexUrl = void 0;
const getEntryRoutesIndexUrl = () => {
    return `/api/entry-routes`;
};
exports.getEntryRoutesIndexUrl = getEntryRoutesIndexUrl;
/**
 * @summary List the entry routes ordered by their configured display order
 */
const entryRoutesIndex = async (options) => {
    const res = await fetch((0, exports.getEntryRoutesIndexUrl)(), {
        ...options,
        method: 'GET'
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : {};
    return { data, status: res.status, headers: res.headers };
};
exports.entryRoutesIndex = entryRoutesIndex;
