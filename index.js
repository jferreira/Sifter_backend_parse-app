const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const cors = require('cors');
const app = express();
require('dotenv').config();

const S3Adapter = require('@parse/s3-files-adapter');

// var s3Options = 


const PORT = Number(process.env.PORT) || 3000

const configurator = function() {
    const databaseURI = String(process.env.DATABASE_URL) || '';
    const cloud = false;
    const appId = String(process.env.APP_ID) || 'sifterapp';
    const masterKey = String(process.env.MASTER_KEY) || 'localMasterKey';
    const fileKey = 'optionalFileKey';
    const serverURL = String(process.env.SERVER_URL) || `http://localhost:${PORT}/parse`; // Don't forget to change to https if needed
    return {
        databaseURI,
        cloud,
        appId,
        masterKey,
        fileKey,
        serverURL,
        filesAdapter: new S3Adapter({
          "bucket": String(process.env.S3_BUCKET),
          "directAccess": true,
          baseUrl: "https://sifter-prod-images.s3.eu-west-1.amazonaws.com"
        }),
    }    
};

const parseConfig = configurator();

const api = new ParseServer(parseConfig);

app.use(cors());

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);


app.listen(PORT, function() {
  console.log('parse-server-example running on port ' + PORT);
});