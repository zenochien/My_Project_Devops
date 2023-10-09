const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

// values
const uri = process.env.DB_URI || 'mongodb://localhost:27017/hairDev';
console.log('uri', uri);
const migrationDir = process.env.MIGRATION_DIR || path.join(__dirname, '../migrations');

async function getLatestMigrationOnDB(client) {
  const db = client.db();
  const collection = db.collection('migrations');

  // get latest migration
  const result = await collection.find().sort({ migratedAt: -1 }).limit(1).toArray();

  console.log(`Current migration: `, result && result[0]);

  if (result.length === 1) {
    return result[0]['name'];
  }
}

async function migrateFile(client, file) {
  const m = require(`${migrationDir}/${file}`);
  const db = client.db();
  const migrations = db.collection('migrations');
  const session = client.startSession();
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
  };

  try {
    await session.withTransaction(async () => {
      await m.up(db, session);
      await migrations.insertOne({ name: file, migratedAt: new Date() }, { session });
    }, transactionOptions);
  } finally {
    await session.endSession();
  }
}

async function migrate(client) {
  try {
    await client.db().createCollection('migrations');
  } catch (error) {
    if (/already exists/.test(error)) {
      // do nothing
    } else {
      throw error;
    }
  }
  const latestMigrationName = await getLatestMigrationOnDB(client);
  // const latestMigrationName = '20200915125200_init.js'
  let files = fs.readdirSync(migrationDir);
  if (latestMigrationName) {
    files = _.filter(files, (f) => f > latestMigrationName);
  }

  // newer migrate found, migrating...
  if (files.length !== 0) {
    for (let i = 0; i < files.length; i++) {
      console.log(`Migrating ${files[i]}`);
      try {
        await migrateFile(client, files[i]);
      } catch (error) {
        console.log(error);
        break;
      }
    }
  }
}

async function run() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    await migrate(client);
    console.log('Migrate Completed');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.error);
