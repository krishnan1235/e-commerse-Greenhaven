import paypal from '@paypal/checkout-server-sdk';  // Correct PayPal SDK
import dotenv from 'dotenv';  // To load environment variables

dotenv.config();  // Load environment variables from .env file

// Set up PayPal environment
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export default client;  // Export the PayPal client instance
