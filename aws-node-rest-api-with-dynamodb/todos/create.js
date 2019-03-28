'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const s3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
      /*
  if (data.user_avatar != null) {  
    let encodedImage =data.user_avatar;
    let decodedImage = Buffer.from(encodedImage, 'base64');
    var filePath = "avatars/" + data.indexnumber + ".png"

    s3.putObject({
      Bucket: "downloadfilesys",
      Key: filePath,
      Body: decodedImage,
    }).promise()
  }
  */
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      //id: uuid.v1(),
      //text: data.text,
      //checked: false,
      //createdAt: timestamp,
      //updatedAt: timestamp,
      id:data.indexnumber,
      'user_avatar':data.user_avatar,
			'gender':data.gender,
			'loacllanguage':data.loacllanguage,
			'limbstatus':data.limbstatus,
			'limbstatus':data.posture,
			'avgbloodoxy':data.avgbloodoxy,
			'testday':data.testday,
			'treecoordination':{
				'treecoordinationscore':data.treecoordinationscore,
				'treebalancescore':data.treebalancescore,
				'treecompletionscore':data.treecompletionscore,
				'treeanswertime':data.treeanswertime,
				'treelowbloodoxy':data.treelowbloodoxy,
				'treeavgbloodoxy':data.treeavgbloodoxy
			},
			'correcttime':{
				'firstcorrecttime':data.firstcorrecttime,
				'firstcorrectanstime':data.firstcorrectanstime,
				'secondcorrecttime':data.secondcorrecttime,
				'secondcorrectanstime':data.secondcorrectanstime,
				'thirdcorrecttime':data.thirdcorrecttime,
				'thirdcorrectanstime':data.thirdcorrectanstime,
				'fourthcorrecttime':data.fourthcorrecttime,
				'fourthcorrectanstime':data.fourthcorrectanstime,
				'timelowbloodoxy':data.timelowbloodoxy,
				'timeavgbloodoxy':data.timeavgbloodoxy,
			},
			'onetwothreeans':{
				'onetwothreeansitem':data.onetwothreeansitem,
				'onetwothreeanstime':data.onetwothreeanstime,
				'onetwothreelowbloodoxy':data.onetwothreelowbloodoxy,
				'onetwothreeavgbloodoxy':data.onetwothreeavgbloodoxy
			}
      
    }
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};


function agecalculat(birthday) {
  var newDate = birthday.replace(/-/g,'/');
  var datechange = new Date(newDate); 
  var year = 1000 * 60 * 60 * 24 * 365;
  var now = new Date();
  var age = parseInt((now - datechange) / year);
  return age;
}

module.exports.webupdatecreate = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      //id: uuid.v1(),
      //text: data.text,
      //checked: false,
      //createdAt: timestamp,
      //updatedAt: timestamp,
			id:data.indexnumber,
      'idnumber':data.idnumber,
      'username':data.username,
      'gender':data.gender,
      'userage':agecalculat(data.userbirthday),
      'userbirthday':data.userbirthday,
      //'userage':data.userage,
      'userphone':data.userphone,
      'localfrom':data.localfrom,
      'usermanage':data.usermanage,
      'Outpatienttracking':data.Outpatienttracking,
      'planjoin':data.planjoin,
      'referrals':data.referrals
    }
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
