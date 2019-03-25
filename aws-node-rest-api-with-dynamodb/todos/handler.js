'use strict';

const authorizer = require('./authorizer');



module.exports.savecsvfile = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'The token was valid and everything is fine!'
    })
  };

  callback(null, response);
};

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'The token was valid and everything is fine!'
    })
  };

  callback(null, response);
};

module.exports.generateToken = (event, context, callback) => {

  const data = JSON.parse(event.body);

  if (data.account == "123456" && data.password == "123456") {
    const token = authorizer.generateToken(event.body);
    console.log(token);
  
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        token
      })
    };
    callback(null, response);
  
  }
  else{
    //const token = authorizer.generateToken(event.body);
    console.log("accounterror");
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message:'Account or Password Error'
      })
    };
    callback(null, response);
  }
};

module.exports.authorize = (event, context, callback) => {
  try {
    console.log(event.authorizationToken);
    console.log(event.methodArn);

    const policy = authorizer.generatePolicy(event.authorizationToken, event.methodArn);
    callback(null, policy);
  } catch (error) {
    console.log(error.message);
    callback(error.message);
  }
};

module.exports.dynamodbtocsv = (event, context, callback) => {
  
};