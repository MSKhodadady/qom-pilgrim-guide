"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withQueryKey = void 0;
const withQueryKey = (query, queryKey) => {
    const result = { queryKey };
    for (const key of Object.keys(query)) {
        // The explicit queryKey always wins, matching the previous
        // `{ ...query, queryKey }` spread where it was set last.
        if (key === 'queryKey')
            continue;
        Object.defineProperty(result, key, {
            enumerable: true,
            configurable: true,
            get: () => query[key],
        });
    }
    return result;
};
exports.withQueryKey = withQueryKey;
