// k6 run --vus 5 -e N=5 -i 100 loginCustomer.js

import { check } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

const url = 'http://localhost:1337/api' + '/functions/loginCustomer';
const params = {
  headers: {
    'X-Parse-Javascript-Key': '93roOyLiGoaggZ3CvrifBwIH3biQplbX',
    'X-Parse-Application-Id': 'fStnK7Sfr3Ms31Zorkslj3KVowHV5WJU',
    'X-Parse-REST-API-Key': 'IBAj1RT7TJsJ6GV8o1538sLtq7Bz9Y1e',
    'Content-Type': 'application/json',
  },
};

const n = parseInt(__ENV.N);
function generateArray() {
  const arr = new Array(n);

  for (let i = 0; i < n; i++) {
    arr[i] = { email: `testcustomer${i + 11}@yopmail.com`, password: '123456Au' };
  }
  return arr;
}

const users = new SharedArray('User list', generateArray);

export default function () {
  const user = users[__VU - 1];

  // 'Content-Type': 'application/json' => payload json string
  const payloadObj = { email: user.email, password: user.password };
  const resultLogin = http.post(url, JSON.stringify(payloadObj), params);

  const body = JSON.parse(resultLogin.body);

  check(resultLogin, {
    'status is 200': (r) => r.status === 200,
    'code is 210': (r) => body.code === 210,
    'resultLogin is correct user when status 200': (r) =>
      body.result !== undefined ? body.result.email === user.email : false,
  });
  console.log('resultLogin body', __VU, JSON.stringify(Object.assign({}, payloadObj, body)));
}
