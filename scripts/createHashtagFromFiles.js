const fs = require('fs');
const request = require('request');
const { PLATFORM, STATUS } = require('../src/const/Constants');
const reqHashtagConfig = {
  method: 'POST',
  url: process.env.CREATE_HASHTAG_URL || 'http://localhost:1337/api/functions/createHashtag',
  headers: {
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'x-parse-session-token': process.env.ADMIN_SESSION_TOKEN_HASHTAG || 'r:5b12471d0c2c6ea39b0742ee460fcfec',
    'x-parse-rest-api-key': process.env.PARSE_SERVER_REST_API_KEY || 'IBAj1RT7TJsJ6GV8o1538sLtq7Bz9Y1e',
    'x-parse-application-id': process.env.PARSE_SERVER_APP_ID || 'fStnK7Sfr3Ms31Zorkslj3KVowHV5WJU',
  },
  json: true,
};

const reqImageConfig = {
  method: 'POST',
  url: process.env.UPLOAD_IMAGE_URL || 'http://localhost:1337/api/upload/image',
  headers: {
    'cache-control': 'no-cache',
    'x-parse-session-token': process.env.ADMIN_SESSION_TOKEN_HASHTAG || 'r:5b12471d0c2c6ea39b0742ee460fcfec',
    'x-parse-rest-api-key': process.env.PARSE_SERVER_REST_API_KEY || 'IBAj1RT7TJsJ6GV8o1538sLtq7Bz9Y1e',
    'x-parse-application-id': process.env.PARSE_SERVER_APP_ID || 'fStnK7Sfr3Ms31Zorkslj3KVowHV5WJU',
    'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
  },
};

const DEFAULT_PATH = './scripts/hashtag';
const DEFAULT_HAGTAG = {
  status: STATUS.PUBLISHED,
  totalPost: 0,
  platform: [PLATFORM.MOBILE, PLATFORM.WEB],
};

const uploadImage = async (filePath) => {
  const options = {
    ...reqImageConfig,
    formData: {
      type: 'HASHTAG',
      file: {
        value: fs.createReadStream(`${DEFAULT_PATH}/${filePath}`),
        options: { filename: filePath, contentType: null },
      },
    },
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);
      resolve(body);
    });
  });
};

const createHashtagAPI = async (body) => {
  const options = {
    ...reqHashtagConfig,
    body,
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);
      resolve(body);
    });
  });
};

async function createHashtag(reqBody) {
  try {
    const imageRespone = await uploadImage(reqBody.imagePath);
    const image = JSON.parse(imageRespone);
    const data = await createHashtagAPI({ ...reqBody, imageId: image.objectId });
    console.log(`Created Hashtag ${reqBody.name}.`);
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

const getFileNamesFromPath = async (folderPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (files) {
        resolve(files);
      } else {
        reject(err);
      }
    });
  });
};

const processHastagData = (fileNames) => {
  return fileNames.map((fileName) => {
    return {
      ...DEFAULT_HAGTAG,
      imagePath: fileName,
      name: fileName ? fileName.split('.')[0] : '',
    };
  });
};

const getListFileFromLocal = async () => {
  const listFileName = await getFileNamesFromPath(DEFAULT_PATH);
  const hashtags = processHastagData(listFileName);
  console.log(hashtags);
};

async function main() {
  const hashtags = [
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 15,
      platform: ['mobile', 'web'],
      imagePath: 'ショート.jpg',
      name: 'ショート',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 14,
      platform: ['mobile', 'web'],
      imagePath: 'ミディアム.jpg',
      name: 'ミディアム',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 13,
      platform: ['mobile', 'web'],
      imagePath: 'ロング.jpg',
      name: 'ロング',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 12,
      platform: ['mobile', 'web'],
      imagePath: 'ボブ.jpg',
      name: 'ボブ',
    },
    {
      status: 'PUBLISHED',
      sortOrder: 11,
      totalPost: 0,
      platform: ['mobile', 'web'],
      imagePath: 'インナーカラー.jpg',
      name: 'インナーカラー',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 10,
      platform: ['mobile', 'web'],
      imagePath: '髪質改善.jpg',
      name: '髪質改善',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 9,
      platform: ['web'],
      imagePath: 'ブリーチ.jpg',
      name: 'ブリーチ',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 8,
      platform: ['web'],
      imagePath: 'ハイライト.jpg',
      name: 'ハイライト',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 7,
      platform: ['web'],
      imagePath: '縮毛矯正.jpg',
      name: '縮毛矯正',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 6,
      platform: ['web'],
      imagePath: 'ダブルカラー.jpg',
      name: 'ダブルカラー',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 5,
      platform: ['web'],
      imagePath: 'カラー.jpg',
      name: 'カラー',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 4,
      platform: ['web'],
      imagePath: 'トリートメント.jpg',
      name: 'トリートメント',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 3,
      platform: ['web'],
      imagePath: 'パーマ.jpg',
      name: 'パーマ',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 2,
      platform: ['web'],
      imagePath: '韓国ヘア.jpg',
      name: '韓国ヘア',
    },
    {
      status: 'PUBLISHED',
      totalPost: 0,
      sortOrder: 1,
      platform: ['web'],
      imagePath: 'メンズ.jpg',
      name: 'メンズ',
    },
  ];

  if (hashtags.length > 0) {
    const errors = [];
    for (let i = 0; i < hashtags.length; i++) {
      const { status, req, res, error } = await createHashtag(hashtags[i]);
      if (!status) {
        errors.push({ req, res: res || error });
      }
    }
    errors.length > 0 && console.error(`Error when create ${errors.length} Hastag`, errors);
    console.log(`Created ${hashtags.length - errors.length} Hastag.`);
  }
}
main();
// run get list hashtag
// getListFileFromLocal();
// comman: node -r dotenv/config ./scripts/createHashtagFromFiles.js  dotenv_config_path=.env
