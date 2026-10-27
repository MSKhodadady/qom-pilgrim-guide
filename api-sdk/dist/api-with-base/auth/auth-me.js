"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMe = exports.getAuthMeUrl = void 0;
const getAuthMeUrl = () => {
    return `${process.env.API_BASE_URL}/auth/me`;
};
exports.getAuthMeUrl = getAuthMeUrl;
/**
 * @summary Return the currently authenticated admin
 */
const authMe = async (options) => {
    const res = await fetch((0, exports.getAuthMeUrl)(), {
        ...options,
        method: 'GET'
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : {};
    return { data, status: res.status, headers: res.headers };
};
exports.authMe = authMe;
