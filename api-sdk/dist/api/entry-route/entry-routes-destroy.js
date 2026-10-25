"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryRoutesDestroy = exports.getEntryRoutesDestroyUrl = void 0;
const getEntryRoutesDestroyUrl = (entryRoute) => {
    return `http://localhost:8000/entry-routes/${entryRoute}`;
};
exports.getEntryRoutesDestroyUrl = getEntryRoutesDestroyUrl;
/**
 * @summary Delete an entry route
 */
const entryRoutesDestroy = async (entryRoute, options) => {
    const res = await fetch((0, exports.getEntryRoutesDestroyUrl)(entryRoute), Object.assign(Object.assign({}, options), { method: 'DELETE' }));
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : undefined;
    return { data, status: res.status, headers: res.headers };
};
exports.entryRoutesDestroy = entryRoutesDestroy;
