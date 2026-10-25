"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placesShow = exports.getPlacesShowUrl = void 0;
const getPlacesShowUrl = (place) => {
    return `http://localhost:8000/places/${place}`;
};
exports.getPlacesShowUrl = getPlacesShowUrl;
/**
 * @summary Show a single place
 */
const placesShow = async (place, options) => {
    const res = await fetch((0, exports.getPlacesShowUrl)(place), Object.assign(Object.assign({}, options), { method: 'GET' }));
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : {};
    return { data, status: res.status, headers: res.headers };
};
exports.placesShow = placesShow;
