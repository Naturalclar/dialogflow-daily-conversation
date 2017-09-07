# API.AI Fulfillment Webhook Template for Node.js and Cloud Functions for Firebase

This webhook template sets up everything you need to build your fulfillment for your API.AI agent.

## Setup Instructions

### Steps
1. Deploy the fulfillment webhook provided in the functions folder using [Google Cloud Functions for Firebase](https://firebase.google.com/docs/functions/):
   1. Follow the instructions to [set up and initialize Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk). Make sure to select the project that you have previously generated in the Actions on Google Console and to reply `N` when asked to overwrite existing files by the Firebase CLI.
   1. Navigate to the <code>firebase/functions</code> directory and run <code>npm install</code>.
   1. Run `firebase deploy --only functions` and take note of the endpoint where the fulfillment webhook has been published. It should look like `Function URL (yourAction): https://${REGION}-${PROJECT}.cloudfunctions.net/yourAction`
1. Go to the API.AI console and select *Fulfillment* from the left navigation menu.
1. Enable *Webhook*, set the value of *URL* to the `Function URL` from the previous step, then click *Save*.
1. Select *Intents* from the left navigation menu. Select the `Default Welcome Intent` intent, scroll down to the end of the page and click *Fulfillment*, check *Use webhook* and then click *Save*. Repeat this step for the Default Fallback Intent.  This will allow you to have your intents be a basic webhook intent to test.
1. Build action handlers for all of your other API.AI actions to fulfill your users requests
