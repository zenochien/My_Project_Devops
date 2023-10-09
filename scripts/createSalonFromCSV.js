// nodejs
// node -r dotenv/config ./scripts/createSalonFromCSV.js dotenv_config_path=.env ./scripts/csv/create_salon_example.csv
const _ = require('lodash');
const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const axios = require('axios');

// header CSV columns by JP text
const mapJP2ENCols = {
  サロン名: 'salonName',
  メールアドレス: 'email',
};

function buildRequestBody(salonInfo) {
  return {
    salonName: salonInfo.salonName,
    email: salonInfo.email,
  };
}

async function createSalon(reqConfig, reqBody) {
  try {
    const { data } = await axios({
      ...reqConfig,
      data: reqBody,
    });

    console.log(`Created salon ${reqBody.email}.`);
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

function parseSalonFromCsv(filePath) {
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
  console.log(`reqConfig`, JSON.stringify(reqCreateSalonConfig));

  let salons = _.sortBy(parseSalonFromCsv(csvFile), ['email']);
  console.log('Full salons', salons.length);
  // console.log(JSON.stringify(salons));

  let arrSalons = salons;
  if (filterEmails) {
    arrSalons = salons.slice(0).filter((s) => {
      return filterEmails.includes(s.email);
    });
  }

  if (omitEmails) {
    _.remove(arrSalons, (s) => omitEmails.includes(s.email));
  }

  console.log('Filter salons', arrSalons.length);
  //console.log(JSON.stringify(arrSalons));

  const reqBodies = arrSalons
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

  if (reqBodies.length !== arrSalons.length) {
    console.error('Has error when buildRequestBody');
    process.exit();
  }

  if (reqBodies.length > 0) {
    const errors = [];
    const promises = reqBodies.map(async (s) => {
      const { status, req, res, error } = await createSalon(reqCreateSalonConfig, s);
      if (!status) {
        errors.push({ req, res: res || error });
      }
    });
    await Promise.all(promises);

    errors.length > 0 && console.error(`Error when create ${errors.length} salons`, errors);
    console.log(`Created ${reqBodies.length - errors.length} salons.`);
  }
}

// Local
const reqCreateSalonConfig = {
  method: 'post',
  url: process.env.CREATE_SALON_URL || 'http://localhost:1337/api/functions/createSalonOperator',
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
    'node -r dotenv/config ./scripts/createSalonFromCSV.js dotenv_config_path=[DOTENV_CONFIG_PATH] [CSV_FILE_PATH]',
  );
  console.log(
    'Example: node -r dotenv/config ./scripts/createSalonFromCSV.js dotenv_config_path=.env ./scripts/csv/create_salon_example.csv',
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
