# Dialogflow Fulfillment Webhook Template for Node.js and Cloud Functions for Firebase

This webhook template sets up everything you need to build your fulfillment for your Dialogflow agent.

## Setup Instructions

### Option #1: Dialogflow Inline Editor (recommended)
1. [Enable the Cloud Function for Firebase inline editor](https://dialogflow.com/docs/fulfillment#cloud_functions_for_firebase)
1. Copy this code in `functions/index.js` the `index.js` file in the Dialogflow Cloud Function for Firebase inline editor.
1. Copy this code in `functions/package.json` the `package.json` file in the Dialogflow Cloud Function for Firebase inline editor.
1. Click `Deploy`

### Option #2: Firebase CLI
1. Run `git clone https://github.com/dialogflow/fulfillment-webhook-nodejs.git` and `cd` to the `functions` directory
1. Run `npm install`
1. Install the Firebase CLI by running `npm install -g firebase-tools`
1. Login to your Google account with `firebase login`
1. Add your project to the sample with `firebase use [project ID]` [find your project ID here](https://dialogflow.com/docs/agents#settings)
1. Run `firebase deploy --only functions:dialogflowFirebaseFulfillment`
1. Paste the URL into your Dialogflow agent's fulfillment and click `Save`

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
