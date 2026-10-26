"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placesDestroy = exports.getPlacesDestroyUrl = void 0;
const getPlacesDestroyUrl = (place) => {
    return `${process.env.API_BASE_URL}/places/${place}`;
};
exports.getPlacesDestroyUrl = getPlacesDestroyUrl;
/**
 * @summary Delete a place
 */
const placesDestroy = async (place, options) => {
    const res = await fetch((0, exports.getPlacesDestroyUrl)(place), {
        ...options,
        method: 'DELETE'
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body ? JSON.parse(body) : undefined;
    return { data, status: res.status, headers: res.headers };
};
exports.placesDestroy = placesDestroy;
