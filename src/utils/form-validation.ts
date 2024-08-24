/**
 * ^8 - start with 8
 * [\/\s] - optional space in between
 * \d - digits only
 * {8,11} - 8 to 11 digits
 */
export const phoneNumberRegex = /^8(?:[\/\s]?\d){8,11}$/g;
