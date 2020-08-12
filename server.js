// Stripe test key. Replace INSERT SECRET KEY HERE with your secret key.
const stripe = require("stripe")("INSERT SECRET KEY HERE");

const express = require("express");
const { resolve } = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(express.static("."));
app.use(express.json());

// Price of my pins. Imagine this is stored in a DB somewhere.
const PRICE_PER_PIN = 1200

// Home shopping page.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Endpoint used to create the payment intent with Stripe.
app.post("/create-payment-intent", async (req, res) => {
  const order = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.quantity * PRICE_PER_PIN,
    currency: "usd",
    description: order.quantity + " pin(s) to be sent to: " + order.email
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

// Webhook endpoint. Only listening on successes.
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const event = request.body;

  if (event.type == 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      var logStream = fs.createWriteStream('registry.txt', {flags: 'a'});
      logStream.write(paymentIntent.description + '. Payment details:\n');
      logStream.end('payment_id:' + paymentIntent.id + ', created_at: ' + paymentIntent.created + ', amount_paid: ' + paymentIntent.amount+ '\n\n');
  } else {
      // Only handling success for this assignment.
      return response.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
});

app.listen(4242, () => console.log('Node server listening on port 4242!\nVisit http://localhost:4242/'));


