import crypto  from "crypto"

export function guid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.randomBytes(16)[0] & 15 >> c / 4).toString(16)
    );
}

/**
 * 
 * @param {string} value 
 * @returns {Date?}
 */
export function parseDate(value) {
    const timestamp = Date.parse(value);
    return !isNaN(timestamp) ? new Date(timestamp) : null;
}
