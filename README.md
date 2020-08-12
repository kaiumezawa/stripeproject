# Sample Stripe PaymentIntents Integration

A simple store that lets users buy digital pins to be sent to their emails and tracks all the orders in a registry file on your computer.
Leverages the PaymentIntents API from Stripe.

## Running the sample

**1. You will need npm to run this app.**

If you already have npm, you can skip to step 2.

If you do not already have npm or are unsure, head on over to and follow [the npm insall guide](https://www.npmjs.com/get-npm).

**2. You will need the Stripe CLI to run this app locally.**

If you already have the Stripe CLI, you can skip to step 3.

If you do not already have the Stripe CLI installed, head on over to and follow the [Stripe CLI Installation Guide](https://stripe.com/docs/stripe-cli).

**3. You will need a test Stripe developer account.**

If you already have a Stripe account, you can skip to step 4.

If you do not already have a Stripe developer account, you can register for one [here](https://dashboard.stripe.com/register).

**4. Next, you must add your test API Keys to the app.**

Your API keys can be found [here in your Stripe dashboard](https://dashboard.stripe.com/apikeys).

**IMPORTANT: Make sure you are in test data mode and using test keys. Your "viewing test data" switch on the page should be turned ON.**

First, copy the token under the "Publishable Key" in your dashboard and paste it into the second line of the file *client.js*, replacing the words INSERT PUBLISHABLE KEY HERE with your key.

> // Initialize stripe with your test key. Replace INSERT PUBLISHABLE KEY HERE with your publishable key.
>
> var stripe = Stripe("INSERT PUBLISHABLE KEY HERE");


Save the changes to the *client.js* file.

Second, copy the token in your dashboard under "Secret Key" and paste it into the second line of the file *server.js*, replacing the words INSERT SECRET KEY HERE with your key.


> // Stripe test key. Replace INSERT SECRET KEY HERE with your secret key.
>
> const stripe = require("stripe")("INSERT SECRET KEY HERE");

Save the changes to the *server.js* file.

**5. Build the app and install dependencies.**

In the main app directory, run:

```
npm install
```

**6. Run the server.**

Run the command

```
npm start
```
**7. Start the Stripe CLI to listen for webhooks.**

Open a new command line window.

With the Stripe CLI installed, if you have not yet done so run ```stripe login``` on the command line to generate a pairing code to link to your Stripe account. Press **Enter** to launch your browser and log in to your Stripe account to allow access.

```
$ stripe login
> Your pairing code is: humour-nifty-finer-magic
> Press Enter to open up the browser (^C to quit)
```
Once you have logged into the CLI, set it up to listen for webhooks by using the ```listen``` command.

```
stripe listen --forward-to http://localhost:4242/webhook
```

**8. Test the app**

Visit [http://localhost:4242/](http://localhost:4242/) in your browser.

Here is where you can run the test cases of the app.

**9. Check your transaction registry**

Once you have run some successful transactions, if you'd like to view the registry, the file *registry.txt* will have been generated containing the details of all your successful transactions.

If there were no successful transactions, this file will not exist.	
