const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const PNF = require('google-libphonenumber').PhoneNumberFormat;

const _hasCorrectLength = str => str.length >= 10 && str.length <= 16;

/**
 * checks if a string is formatted as a phone number
 *
 * first checks if there is a ( and ) afterwards,
 * if there is, it will remove these parens
 *
 * then checks if the first char of string is a number
 *
 * and finally checks if the string is formatted as
 * 3 digits
 * a space, -, or nothing
 * 3 digits
 * a space, -, or nothing
 * 4 digits
 *
 * @param {string} str phone number
 * @return {boolean} true if the phone is formatted correctly, false otherwise
 */
const _isFormatted = str => {
  let s = str;

  if (s.indexOf('(') < s.indexOf(')') && s.match(/(\d{3})/)) {
    s = s.replace(/[()]/g, '');
  }

  const m0 = s.match(/1[ -]?/);

  if (m0) {
    s = s.replace(m0[0], '');
  }

  const match = s.match(/\d{3}[- ]?\d{3}[- ]?\d{4}/);

  if (match && match[0] !== match.input) return false;

  return match;
};

/**
 * parses a user input'd phone number to the E.164 standard for a
 * United States phone number
 *
 * returns said parsed phone number
 * otherwise, returns `null`
 *
 * for more information about E.164:
 * https://en.wikipedia.org/wiki/E.164
 *
 * for more information about the calling codes (US included)
 * https://en.wikipedia.org/wiki/List_of_country_calling_codes#Alphabetical_listing_by_country_or_region
 * https://en.wikipedia.org/wiki/North_American_Numbering_Plan
 *
 * @param {string} phoneNo phone number input by user
 * @return {string} phone number in E.164 format
 */
module.exports = phoneNo => {
  const n = phoneUtil.parseAndKeepRawInput(phoneNo, 'US');

  if (!_hasCorrectLength(phoneNo)) return null;
  if (!_isFormatted(phoneNo)) return null;
  if (!phoneUtil.isValidNumber(n)) return null;

  return phoneUtil.format(n, PNF.E164);
};
