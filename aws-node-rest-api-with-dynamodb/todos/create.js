'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const s3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  /*
  if (data.userimage != null) {  
    let encodedImage =data.userimage;
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
      '照片':data.user_avatar,
			'性別':data.gender,
			'語言':data.loacllanguage,
			'四肢狀態':data.limbstatus,
			'姿勢':data.posture,
			'整體平均血氧':data.avgbloodoxy,
			'測驗日期':data.testday,
			'早晨的榕樹下':{
				'協調感分數':data.treecoordinationscore,
				'平衡感分數':data.treebalancescore,
				'完成度分數':data.treecompletionscore,
				'答題時間(sec)':data.treeanswertime,
				'最低血氧':data.treelowbloodoxy,
				'平均血氧':data.treeavgbloodoxy
			},
			'現在幾點鐘':{
				'找出正確時間':data.firstcorrecttime,
				'找出正確時間答題時間':data.firstcorrectanstime,
				'找出正確時間2':data.secondcorrecttime,
				'找出正確時間2答題時間':data.secondcorrectanstime,
				'找出正確時間3':data.thirdcorrecttime,
				'找出正確時間3答題時間':data.thirdcorrectanstime,
				'找出正確時間4':data.fourthcorrecttime,
				'找出正確時間4答題時間':data.fourthcorrectanstime,
				'最低血氧':data.timelowbloodoxy,
				'平均血氧':data.timeavgbloodoxy,
			},
			'123木頭人':{
				'答對題數':data.onetwothreeansitem,
				'答題時間':data.onetwothreeanstime,
				'最低血氧':data.onetwothreelowbloodoxy,
				'平均血氧':data.onetwothreeavgbloodoxy
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
      '身分證字號':data.idnumber,
      '姓名':data.username,
      '性別':data.gender,
      '生日':data.userbirthday,
      '年紀':data.userage,
      '電話':data.userphone,
      '來源':data.localfrom,
      '列入個管':data.usermanage,
      '門診追蹤':data.Outpatienttracking,
      '參與計畫':data.planjoin,
      '轉介':data.referrals
    },
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
