"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLogin = exports.getAuthLoginUrl = void 0;
const getAuthLoginUrl = () => {
    return `http://localhost:8000/auth/login`;
};
exports.getAuthLoginUrl = getAuthLoginUrl;
/**
 * @summary Authenticate an admin and return a token
 */
const authLogin = async (loginRequest, options) => {
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
    const res = await fetch((0, exports.getAuthLoginUrl)(), Object.assign(Object.assign({}, options), { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, getHeaders(options === null || options === void 0 ? void 0 : options.headers)), body: JSON.stringify(loginRequest) }));
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : {};
    return { data, status: res.status, headers: res.headers };
};
exports.authLogin = authLogin;
