# What is RudderStack?

[RudderStack](https://rudderstack.com/) is a **customer data pipeline** tool for collecting, routing and processing data from your websites, apps, cloud tools, and data warehouse.

More information on RudderStack can be found [here](https://github.com/rudderlabs/rudder-server).

## About this repository

This repository contains a Lambda function that can be used to route Braze data (exported as Avro files to S3) to RudderStack.

The structure of the package is based on https://github.com/awsdocs/aws-lambda-developer-guide/tree/master/sample-apps/blank-nodejs
and the instructions provided at the above link can be used to deploy this function as well.

An S3 trigger should be created for this function (sample instructions at https://www.tutorialspoint.com/aws_lambda/aws_lambda_using_lambda_function_with_amazon_s3.htm)

## Note

The following environment variables should be created for this function:

*	`rudder_write_key` - WriteKey for the Rudder Source you want to used
*	`rudder_dataplane_url` - URL where the Rudder Server is running

## Contact Us

If you come across any issues while configuring or using this repo, please feel free to start a conversation on our [Slack](https://resources.rudderstack.com/join-rudderstack-slack) channel. We will be happy to help you.


