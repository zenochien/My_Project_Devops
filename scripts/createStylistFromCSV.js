// nodejs
// node -r dotenv/config ./scripts/createStylistFromCSV.js dotenv_config_path=.env ./scripts/csv/create_stylist_example.csv
const _ = require('lodash');
const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const axios = require('axios');

// header CSV columns by JP text
const mapJP2ENCols = {
  メールアドレス: 'email',
  salonId: 'salonId',
  姓: 'lastName',
  名: 'firstName',
  表示名: 'nickName',
  プロフィール: 'profileText',
  性別: 'gender',
  facebook: 'facebook',
  instagram: 'instagram',
  tiktok: 'tiktok',
  twitter: 'twitter',
  youtube: 'youtube',
};

function buildRequestBody(stylistInfo) {
  return {
    salonId: stylistInfo.salonId,
    email: stylistInfo.email,
    firstName: stylistInfo.firstName,
    lastName: stylistInfo.lastName,
    nickName: stylistInfo.nickName,
    profileText: stylistInfo.profileText,
    gender: stylistInfo.gender,
    stylistSNS: {
      facebook: stylistInfo.facebook,
      instagram: stylistInfo.instagram,
      tiktok: stylistInfo.tiktok,
      twitter: stylistInfo.twitter,
      youtube: stylistInfo.youtube,
    },
  };
}

async function createStylist(reqConfig, reqBody) {
  try {
    const { data } = await axios({
      ...reqConfig,
      data: reqBody,
    });

    console.log(`Created stylist ${reqBody.email}.`);
    return { status: true, req: reqBody, res: data };
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        status: false,
        req: reqBody,
        res: error.response.data,
        error,
        errorData: `${reqBody.email} - ${error}`,
      };
    }
    return { status: false, req: reqBody, error, errorData: `${reqBody.email} - ${error}` };
  }
}

function parseStylistFromCsv(filePath) {
  const data = fs.readFileSync(filePath, 'UTF-8');
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });

  return records.map((t) => {
    const r = {};
    for (const jpKey in t) {
      const enKey = mapJP2ENCols[jpKey];
      enKey && (r[enKey] = t[jpKey]);
    }

    return r;
  });
}

async function main() {
  console.log(new Date().toISOString());
  console.log(`reqConfig`, JSON.stringify(reqCreateStylistConfig));

  let stylists = _.sortBy(parseStylistFromCsv(csvFile), ['email']);
  console.log('Full stylists', stylists.length);
  // console.log(JSON.stringify(stylists));

  let arrStylist = stylists;
  if (filterEmails) {
    arrStylist = stylists.slice(0).filter((s) => {
      return filterEmails.includes(s.email);
    });
  }

  if (omitEmails) {
    _.remove(arrStylist, (s) => omitEmails.includes(s.email));
  }

  console.log('Filter stylists', arrStylist.length);
  //console.log(JSON.stringify(arrStylist));

  const reqBodies = arrStylist
    .map((s) => {
      try {
        return buildRequestBody(s);
      } catch (err) {
        console.error(JSON.stringify(s));
        console.error(`${s.email} - `, err);
        return undefined;
      }
    })
    .filter((s) => !!s);

  if (reqBodies.length !== arrStylist.length) {
    console.error('Has error when buildRequestBody');
    process.exit();
  }

  if (reqBodies.length > 0) {
    const errors = [];
    const promises = reqBodies.map(async (s) => {
      const { status, req, res, error } = await createStylist(reqCreateStylistConfig, s);
      if (!status) {
        errors.push({ req, res: res || error });
      }
    });
    await Promise.all(promises);

    errors.length > 0 && console.error(`Error when create ${errors.length} stylists`, errors);
    console.log(`Created ${reqBodies.length - errors.length} stylists.`);
  }
}

// Local
const reqCreateStylistConfig = {
  method: 'post',
  url: process.env.CREATE_STYLIST_URL || 'http://localhost:1337/api/functions/createStylist',
  headers: {
    'X-Parse-Application-Id': process.env.PARSE_SERVER_APP_ID || 'fStnK7Sfr3Ms31Zorkslj3KVowHV5WJU',
    'X-Parse-REST-API-Key': process.env.PARSE_SERVER_REST_API_KEY || 'IBAj1RT7TJsJ6GV8o1538sLtq7Bz9Y1e',
    'Content-Type': 'application/json',
    'X-Parse-Session-Token': process.env.ADMIN_SESSION_TOKEN,
  },
};

const filterEmails = undefined;
const omitEmails = [];

const myArgs = process.argv.slice(2);
if (myArgs.length !== 2) {
  console.log('Illegal number of parameters');
  console.log(
    'node -r dotenv/config ./scripts/createStylistFromCSV.js dotenv_config_path=[DOTENV_CONFIG_PATH] [CSV_FILE_PATH]',
  );
  console.log(
    'Example: node -r dotenv/config ./scripts/createStylistFromCSV.js dotenv_config_path=.env ./scripts/csv/create_stylist_example.csv',
  );
  return;
}

if (!process.env.ADMIN_SESSION_TOKEN) {
  console.log(
    'Please define PARSE_SERVER_APP_ID, PARSE_SERVER_REST_API_KEY, ADMIN_SESSION_TOKEN in file [DOTENV_CONFIG_PATH]',
  );
  return;
}

const csvFile = myArgs[1];
main();
