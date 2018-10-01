const _handleErrors = require('./_handleErrors');
const { CC_USA } = require('./constants');

/**
 * parses a user input'd phone number to the E.164 standard for a
 * United States phone number
 *
 * returns said parsed phone number
 * otherwise, returns `null`
 *
 * e.g.
 * 1234567890 -> +11234567890
 * 123-456-7890 -> +1123456790
 * 1-123-456-7890 -> +11234567890
 * 123-456-789o -> null
 *
 * for more information about E.164:
 * https://en.wikipedia.org/wiki/E.164
 *
 * for more information about the calling codes (US included)
 * https://en.wikipedia.org/wiki/List_of_country_calling_codes#Alphabetical_listing_by_country_or_region
 * https://en.wikipedia.org/wiki/North_American_Numbering_Plan
 *
 *
 * @param {string} phoneNo - phone number input by user
 * @returns {string} phone number in E.164 format
 */
module.exports = phoneNo => {
  if (typeof phoneNo !== 'string') return _handleErrors('type', typeof phoneNo);

  const e164 = phoneNo.replace(/[^\d]/g, '').split('');
  const length = e164.length;

  switch (length) {
    case 10:
      e164.unshift(CC_USA);
      break;

    case 11:
      if (e164[0] !== CC_USA[1]) return _handleErrors('country-code', e164[0]);

      e164.unshift('+');
      break;

    default:
      return _handleErrors('length', length);
  }

  return e164.join('');
};
