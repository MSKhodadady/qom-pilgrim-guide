"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stayModesStore = exports.getStayModesStoreUrl = void 0;
const getStayModesStoreUrl = () => {
    return `/stay-modes`;
};
exports.getStayModesStoreUrl = getStayModesStoreUrl;
/**
 * @summary Create a new stay mode
 */
const stayModesStore = async (storeStayModeRequest, options) => {
    const getHeaders = (h) => {
        if (!h)
            return {};
        if (h instanceof Headers)
            return Object.fromEntries(h.entries());
        if (Symbol.iterator in h) {
            return Object.fromEntries(Array.from(h, (entry) => Array.from(entry)));
        }
        const headers = {};
        for (const [name, value] of Object.entries(h)) {
            if (value !== undefined)
                headers[name] = value;
        }
        return headers;
    };
    const res = await fetch((0, exports.getStayModesStoreUrl)(), {
        ...options,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getHeaders(options === null || options === void 0 ? void 0 : options.headers) },
        body: JSON.stringify(storeStayModeRequest)
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : {};
    return { data, status: res.status, headers: res.headers };
};
exports.stayModesStore = stayModesStore;
