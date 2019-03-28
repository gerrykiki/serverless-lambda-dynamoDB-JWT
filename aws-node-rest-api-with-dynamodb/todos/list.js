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
    const fields_chinese = ['id', 'gender', 'loacllanguage','limbstatus','posture','avgbloodoxy','testday','treecoordination.treecoordinationscore','treecoordination.treebalancescore','treecoordination.treecompletionscore','treecoordination.treeanswertime','treecoordination.treelowbloodoxy','treecoordination.treeavgbloodoxy','correcttime.firstcorrecttime','correcttime.firstcorrectanstime','correcttime.secondcorrecttime','correcttime.secondcorrectanstime','correcttime.thirdcorrecttime','correcttime.thirdcorrectanstime','correcttime.fourthcorrecttime','correcttime.fourthcorrectanstime','correcttime.timelowbloodoxy','correcttime.timeavgbloodoxy','onetwothreeans.onetwothreeansitem','onetwothreeans.onetwothreeanstime','onetwothreeans.onetwothreelowbloodoxy','onetwothreeans.onetwothreeavgbloodoxy'];

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
};

module.exports.historyinfo = (event, context, callback) => {
  
  const data = JSON.parse(event.body);
  var infodata = [];
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

    const infodata = result.Items;
    const infohistory = [];
    for (let index = 0; index < infodata.length; index++) {
      const element = infodata[index].idnumber;
      if (element === data.idnumber) {
        infohistory.push(infodata[index]);
      }
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(infohistory),
    };
    callback(null, response);
  });
};


module.exports.statisticchart = (event, context, callback) => {
  
  const data = JSON.parse(event.body);
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
    if (result.Items.testday === null) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'No data',
      });
      return;
    }
    const infodata = ComplieDate(result.Items,data.update,data.downdate);
    const resultdata = {
      "sixtyfive":87,
      "seventy":93,
      "seventyfive":77,
      "eighty":87,
      "eightyfive":93,
      "ninty":50,
      "nintyfive":60,
      "average":93,
    };
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(resultdata),
    };
    callback(null, response);
  });
};

function ComplieDate(nativedate,update,downdate){
  var tempdate = [];
  for (let index = 0; index < nativedate.length; index++) {
      const element = nativedate[index].testday;
      var tempdatechange = new Date(element);
      var tempupdate = new Date(update);
      var tempdowndate = new Date(downdate);
      if (tempdatechange < tempupdate && tempdatechange > tempdowndate) {
          console.log("success");
          tempdate.push(nativedate[index]);
      }
      else{
          console.log("Error");
      }
  }
  return tempdate;
}

