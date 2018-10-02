const should = require('chai').should();

const parser = require('./e164-parser');

describe(`E.164 USA PARSER`, _ => {
  it(`should return the correctly formatted phone numbers for simple cases`, done => {
    const parsed = '+11231231234';
    const inputs = [
      '1231231234',
      '123-123-1234',
      '123 123 1234',
      '1-123-123-1234',
      '+11231231234',
    ];

    inputs.forEach(input => parser(input).should.equal(parsed));

    done();
  });

  it(`should return the correctly formatted phone numbers for complex cases`, done => {
    //   const parsed = '+11234567890';
    //   const inputs = [
    //     '1231231234',
    //     '123-123-1234',
    //     '123 123 1234',
    //     '1-123-123-1234',
    //     '+11231231234',
    //   ];
    done();
  });
});
