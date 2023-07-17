/**
 * Linear Interpolation
 * @param {number} start
 * @param {number} end
 * @param {number} amt
 * */
export const lerp = (start, end, amt = 0.05) => (1 - amt) * start + amt * end;
