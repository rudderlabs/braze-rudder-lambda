const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const util = require('util');
const fs = require('fs');
const avro = require('avsc');

const s3 = new AWS.S3();


const Analytics = require("@rudderstack/rudder-sdk-node");

// Create client outside of handler to reuse
const lambda = new AWS.Lambda();

// Handler
exports.handler = async function(event, context) {

	/*	
	
	console.log('## Rudder Write Key: ' + process.env.rudder_write_key);
	console.log('## Rudder Dataplane URL: ' + process.env.rudder_dataplane_url);
	console.log('## Rudder Anonymous ID: ' + process.env.rudder_anonymous_id);

	event.Records.forEach(record => {
		console.log(record.body)
	})
	*/
	
	// Read options from the event parameter.
	/*
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
	console.log(JSON.stringify(event.Records[0].s3));
	*/
    const srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    const srcKey    = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
	
	/*
	console.log('## srcBucket:' + srcBucket);
	console.log('## srcKey:' + srcKey);
	*/

	const client = new Analytics(process.env.rudder_write_key,  process.env.rudder_dataplane_url);
	const anonymousId = process.env.rudder_anonymous_id;

	
	try {
		const params = {
			Bucket: srcBucket,
			Key: srcKey
		};
		var inputfile = await s3.getObject(params).promise();
		fs.writeFileSync('/tmp/input.avro',inputfile.Body);
		avro.createFileDecoder('/tmp/input.avro')
		.on('data', function (payload) {
			try {
				var eventName = srcKey.split("/")[1].split("=")[1];
				console.log(eventName + ' : ' + JSON.stringify(payload));
				client.track({"event" : eventName, "anonymousId" : anonymousId, "properties" :  payload});
				//console.log(JSON.stringify(payload));
				console.log("Rudder Success");
			} catch (err){
				console.log("Rudder Error ", err);
			}
		});		

	} catch (error) {
		console.log(error);
		return;
	}  

	/*
	*/

	return getAccountSettings()
}

// Use SDK client
var getAccountSettings = function(){
  return lambda.getAccountSettings().promise()
}

var serialize = function(object) {
  return JSON.stringify(object, null, 2)
}
