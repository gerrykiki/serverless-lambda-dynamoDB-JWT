'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

module.exports.list = (event, context, callback) => {
  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todos.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

module.exports.filesave = (event, context, callback) => {
  
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todos.',
      });
      return;
    }

    const fetch = require('node-fetch');
    //const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
    var fs = require('fs');
    //var rs = fs.createReadStream('testdata.md');
    const s3 = new AWS.S3();
    const json2csv = require('json2csv');
    const fields_chinese = ['checked', 'createdAt', 'text','id','updatedAt'];

    const csv = json2csv({
      data: result.Items,
      fields: fields_chinese
    });

    s3.putObject({
    Bucket: "downloadfilesys",
    Key: "123.csv",
    Body: csv,
  
  }).promise()
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
  
 /*
 const fetch = require('node-fetch');
 const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
 var fs = require('fs');
 //var rs = fs.createReadStream('testdata.md');
 
 const s3 = new AWS.S3();
 
 const json2csv = require('json2csv');
 
 // basic
 const fields = ['car', 'price', 'color'];
 const myCars = [{
     "car": "Audi",
     "price": 40000,
     "color": "blue"
 }, {
     "car": "BMW",
     "price": 35000,
     "color": "black"
 }, {
     "car": "Porsche",
     "price": 60000,
     "color": "green"
 }];
 const csv = json2csv({
     data: myCars,
     fields: fields
 });

 s3.putObject({
  Bucket: "downloadfilesys",
  Key: "123.csv",
  Body: csv,
}).promise()
const response = {
  statusCode: 200,
  body: "Success"
};
callback(null, response);
*/
};

