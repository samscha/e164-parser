const should = require('chai').should();

const parser = require('./e164-parser');

const DEBUG = true;

describe(`E.164 USA PHONE NUMBER PARSER`, _ => {
  it(`should return the correctly formatted valid phone numbers`, done => {
    const parsed = '+12064223030'; // this is a number chosen by random by a person and if it exists, it is purely by coincidence
    const inputs = [
      '206 422 3030',
      '206-422-3030',
      '(206) 422-3030',
      '2064223030',
      '12064223030',
      '1-206-422-3030',
      '1 (206) 422-3030',
    ];

    inputs.forEach(input => {
      const e164 = parser(input);

      if (DEBUG && !e164) console.log(`${input} is null but should exist`);

      should.exist(e164);
      e164.should.equal(parsed);
    });

    done();
  });

  it(`should return null for incorrectly formatted phone numbers`, done => {
    const inputs = [
      '360 -------------- 404 3222',
      '------ - - -    360 404 3222',
      '3     -     6     -     0    4-------04 3 -----                   2222',
      '360  404 3222',
      '(360)  404-3222',
      '(306) 404  3222',
      '- 3604043222',
      '-3604043222',
      ' 3604043222',
      '3604043222 ',
      // '360422-3222',
    ];

    inputs.forEach(input => {
      const e164 = parser(input);

      if (DEBUG && e164) console.log(`parse for <<${input}>> is not null`);

      should.not.exist(e164);
    });

    done();
  });

  it(`should return null for invalid US phone numbers`, done => {
    const inputs = [
      '111-111-1111',
      '360-111-1111',
      '13601443222',
      '18001111111',
    ];

    inputs.forEach(input => {
      const e164 = parser(input);

      if (DEBUG && e164) console.log(`parse for <<${input}>> is not null`);

      should.not.exist(e164);
    });

    done();
  });
});
