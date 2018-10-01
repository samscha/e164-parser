const { DEBUG, ERR } = require('./constants');

module.exports = (code, parm) => {
  if (DEBUG) console.log(ERR[code](parm));

  return null;
};
