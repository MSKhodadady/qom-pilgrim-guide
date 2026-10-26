"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placesIndex = exports.getPlacesIndexUrl = void 0;
const getPlacesIndexUrl = () => {
    return `/api/places`;
};
exports.getPlacesIndexUrl = getPlacesIndexUrl;
/**
 * @summary List the places in a stable order
 */
const placesIndex = async (options) => {
    const res = await fetch((0, exports.getPlacesIndexUrl)(), {
        ...options,
        method: 'GET'
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : {};
    return { data, status: res.status, headers: res.headers };
};
exports.placesIndex = placesIndex;
