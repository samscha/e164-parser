# E.164 US Phone Number Parser

### Parser for US phone numbers in E.164 format

## Intro

Uses a port of [libphonenumber](https://github.com/googlei18n/libphonenumber/tree/master/javascript) called [google-libphonenumber](https://github.com/ruimarinho/google-libphonenumber) as well as some custom checking.

## Cases

PASS

```javascript
const inputs = [
  '206 422 3030',
  '206-422-3030',
  '(206) 422-3030',
  '2064223030',
  '12064223030',
  '1-206-422-3030',
  '1 (206) 422-3030',
];

const parsed = '+12064223030'; // this is a number chosen by random by a person and if it exists, it is purely by coincidence
```

FAIL (returns `null`)

```javascript
const inputs = [
  // invalid formatting
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
  // '360422-3222', <-- this is returning null

  // invalid US numbers
  '111-111-1111',
  '360-111-1111',
  '13601443222',
  '18001111111',
];
```

## Testing

```console
cd e164-parser && yarn && yarn test
```

## TODO

- [ ] fix incorrect parsing for numbers formatted as XXXXXX-XXXX where X is an integer (0-9)
