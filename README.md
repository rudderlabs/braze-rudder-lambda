# Braze Rudder Lambda 
This is a Lambda function that can be used to route Braze data (exported as Avro files to S3) to Rudder Server.

The structure of the package is based on https://github.com/awsdocs/aws-lambda-developer-guide/tree/master/sample-apps/blank-nodejs
and the instructions provided at the above link can be used to deploy this function as well.

An S3 trigger should be created for this function (sample instructions at https://www.tutorialspoint.com/aws_lambda/aws_lambda_using_lambda_function_with_amazon_s3.htm)

Following Environment Variables should be created for this function
*	`rudder_write_key` - WriteKey for the Rudder Source you want to used
*	`rudder_dataplane_url` - URL where the Rudder Server is running
*	`rudder_anonymous_id` - Anonymous ID to be used for Rudder events triggered by this Lambda function


