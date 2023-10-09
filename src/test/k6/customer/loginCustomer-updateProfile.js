// k6 run --vus 5 -e N=5 -i 100 loginCustomer-updateProfile.js

import { check, fail, group } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

const baseURL = 'http://localhost:1337/api';
const params = {
  headers: {
    'X-Parse-Javascript-Key': '93roOyLiGoaggZ3CvrifBwIH3biQplbX',
    'X-Parse-Application-Id': 'fStnK7Sfr3Ms31Zorkslj3KVowHV5WJU',
    'X-Parse-REST-API-Key': 'IBAj1RT7TJsJ6GV8o1538sLtq7Bz9Y1e',
    'Content-Type': 'application/json',
  },
};

const n = parseInt(__ENV.N);
function generateUpdateArray() {
  const PROFILE_IMAGES = ['Dl8ZUeE26w', 'KXHp4U9WRQ', 'cqtuS21Jms', 'zCJnVl7fTX', 'dELbxdFGzO'];
  const GENDER = ['男性', '女性', 'その他'];

  function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }

  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = {
      firstName: `first${i}`,
      lastName: `last${i}`,
      phoneticFirstName: `phoneF1${i}`,
      phoneticLastName: `phoneL${i}`,
      nickName: `nickname${i}`,
      gender: GENDER[randomIntBetween(0, GENDER.length - 1)],
      birthDate: `${randomIntBetween(1980, 2000)}/${minTwoDigits(randomIntBetween(1, 12))}/${minTwoDigits(
        randomIntBetween(1, 28),
      )}`,
      profileImages: [PROFILE_IMAGES[randomIntBetween(0, PROFILE_IMAGES.length - 1)]],
      phone: `${randomIntBetween(1000000, 9999999)}`,
      paymentMethod: 'CREDIT_CARD',
      customerAddress1: `customerAddress1${i}`,
      customerAddress2: `customerAddress2${i}`,
      customerAddress3: `customerAddress3${i}`,
      customerAddress4: `customerAddress4${i}`,
      postalCode: randomIntBetween(100, 999) + '-' + randomIntBetween(1000, 9999),
    };
  }

  return arr;
}
const dataUpdate = new SharedArray('Update data', generateUpdateArray);

export function setup() {
  const url = baseURL + '/functions/loginCustomer';
  const arrSessionToken = [];

  for (let i = 0; i < n; i++) {
    // 'Content-Type': 'application/json' => payload json string
    const payloadObj = { email: `testcustomer${i + 1}@yopmail.com`, password: '123456Au' };
    const resultLogin = http.post(url, JSON.stringify(payloadObj), params);

    const body = JSON.parse(resultLogin.body);
    if (
      !check(resultLogin, {
        'status is 200': (r) => r.status === 200,
        'resultLogin is correct user when status 200': (r) =>
          body.result !== undefined ? body.result.email === payloadObj.email : false,
      })
    ) {
      fail('Setup fail');
    }

    arrSessionToken.push(body.result.sessionToken);
  }

  return arrSessionToken;
}

export default (arrSessionToken) => {
  const sessionToken = arrSessionToken[__VU - 1];

  group('Update customer profile', function () {
    const rnd = randomIntBetween(0, dataUpdate.length - 1);

    // 'Content-Type': 'application/json' => payload json string
    const payload = JSON.stringify(dataUpdate[rnd]);

    const url = baseURL + '/functions/updateCustomerInfo';
    params.headers['X-Parse-Session-Token'] = sessionToken;
    const resultUpdate = http.post(url, payload, params);

    if (
      !check(resultUpdate, {
        'resultUpdate status is 200': (r) => r.status === 200,
      })
    ) {
      console.log('result', JSON.stringify(resultUpdate));
      fail('resultUpdate status code was *not* 200');
    }
  });
};
