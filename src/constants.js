exports.CC_USA = '+1';

exports.DEBUG = true;

exports.ERR = {
  type: foundType => `phoneNo expected 'string', received: ${foundType}`,
  length: chars =>
    `phone number expected to be 10 or 11 numbers. Found ${chars} numbers`,
};
