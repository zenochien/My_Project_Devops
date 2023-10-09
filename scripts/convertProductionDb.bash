#!/bin/bash
# bash convertProductionDb.bash [PROD_URI] [STG_URI]

#### Some local functions ####
{
  getDBName() {
    url=$1
    regex="mongodb://((.*):(.*)@)*(.+):([0-9]+)/([a-zA-z0-9]+)(\?(.+))*"

    if [[ $url =~ $regex ]]; then
      echo "${BASH_REMATCH[6]}"
    else
      echo ""
    fi
  }

  exitIfEmpty() {
    if [[ -z "$1" ]]; then
      echo "$2"
      exit 3
    fi
  }
}
#############

############################
#### Check number of params ####
{
  if [ "$#" -ne 2 ]; then
    echo "Illegal number of parameters"
    echo convertProductionDb.bash [PROD_URI] [STG_URI]
    exit 2
  fi
}
#############

#### Read and process input params ####
{
  PROD_DB_URI=$1
  STG_DB_URI=$2
  DB_NAME_PROD=$(getDBName "$1")
  DB_NAME_STG=$(getDBName "$2")

  exitIfEmpty "$DB_NAME_PROD" "Not found DBName in ${PROD_DB_URI}"
  exitIfEmpty "$DB_NAME_STG" "Not found DBName in ${STG_DB_URI}"

  echo DB_NAME_PROD=$DB_NAME_PROD
  echo PROD_DB_URI=$PROD_DB_URI
  echo DB_NAME_STG=$DB_NAME_STG
  echo STG_DB_URI=$STG_DB_URI
  echo "================="
}
#############

#### Declare some vars ####

{
  NOW=$(date +"%Y%m%d_%H%M%S")

  ARCHIVE_PROD_NAME=hairlie-$DB_NAME_PROD-$NOW.gz
  ARCHIVE_STG_NAME=hairlie-$DB_NAME_STG-$NOW.gz
  ARCHIVE_STG_CONVERTED_NAME=hairlie-$DB_NAME_STG-$NOW-converted.gz

  EXPORT_FOLDER=export_$DB_NAME_PROD

  LOCAL_DB_URI="mongodb://localhost:27017/"
  LOCAL_DB_PROD_URI=${LOCAL_DB_URI}${DB_NAME_PROD}
}
#############

#### Process PROD DB ####
## 1. Dump to file ##
## 2. Restore PROD DB to LOCAL from file ##
## 3. Convert sensitive data ##
## 4. Export LOCAL PROD DB to json files ##
############
{
  echo Backup PROD DB in file "$ARCHIVE_PROD_NAME"
  #mongodump --gzip --archive="$ARCHIVE_PROD_NAME" --uri "$PROD_DB_URI"
  mongodump --quiet --ssl --sslAllowInvalidCertificates --sslAllowInvalidHostnames --gzip --archive="$ARCHIVE_PROD_NAME" --uri "$PROD_DB_URI"
  echo "================="

  echo Restore PROD DB to LOCAL from file "$ARCHIVE_PROD_NAME"
  mongorestore --drop --quiet --gzip --archive="$ARCHIVE_PROD_NAME" --uri "$LOCAL_DB_URI"
  echo "================="

  echo Convert sensitive data
  export DB_URI=$LOCAL_DB_PROD_URI && node ./scripts/convertProductionDb.js
  echo "================="

  echo Export LOCAL PROD DB to JSON files
  rm -rf "$EXPORT_FOLDER" && mkdir "$EXPORT_FOLDER"
  cols=$(mongo --quiet --eval 'db.getCollectionNames().forEach(t => print(t))' "$LOCAL_DB_PROD_URI")
  for c in $cols; do
    mongoexport -d "$DB_NAME_PROD" -c "$c" -o "$EXPORT_FOLDER/$c.json"
  done
  echo "================="
}
#############

#### Process STG DB ####
## 1. Dump to file ##
## 2. Restore to LOCAL from file ##
## 3. Merge LOCAL PROD DB which converted into LOCAL STG ##
## 4. Dump LOCAL STG to file to backup  ##
############
{
  echo Backup STG DB in file "$ARCHIVE_STG_NAME"
  #mongodump --gzip --archive="$ARCHIVE_STG_NAME" --uri "$STG_DB_URI"
  mongodump --quiet --ssl --sslAllowInvalidCertificates --sslAllowInvalidHostnames --gzip --archive="$ARCHIVE_STG_NAME" --uri "$STG_DB_URI"
  echo "================="

  echo Restore STG DB to LOCAL from file "$ARCHIVE_STG_NAME"
  mongorestore --drop --quiet --gzip --archive="$ARCHIVE_STG_NAME" --uri "$LOCAL_DB_URI"
  echo "================="

  echo Merge LOCAL PROD DB which converted into LOCAL STG
  for file in "$EXPORT_FOLDER"/*.json; do
    col=${file#*$EXPORT_FOLDER/}
    col=${col%.json}
    mongoimport --db "$DB_NAME_STG" --collection "$col" --file "$file" --mode=upsert
  done
  echo "================="

  echo Backup converted data
  mongodump --quiet --gzip --archive="$ARCHIVE_STG_CONVERTED_NAME" --uri "${LOCAL_DB_URI}${DB_NAME_STG}"
  echo "================="
}
#############

#### Show cmd to restore STG DB from file ####
{
  echo Now you have to remove the DB on STAGING
  echo Then restore with the "$ARCHIVE_STG_CONVERTED_NAME" in STAGING with the following command
  echo mongorestore --drop --gzip --archive="$ARCHIVE_STG_CONVERTED_NAME" --uri "$STG_DB_URI"
}
#############
############################
