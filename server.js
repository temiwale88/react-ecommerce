import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
import path from 'path';
// import enforce from "express-sslify"
import dotenv from 'dotenv'
const __dirname = path.resolve();
import compression from 'compression';

dotenv.config({ silent: process.env.NODE_ENV === 'production' });
 
// if (process.env.NODE_ENV !== "production") require("dotenv").config();

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const app = express();
const port = process.env.PORT || 5000;

// Lecture 287: Gzipping and compression to optimize our build as Heroku won't do this for us

app.use(compression)
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// app.use(cors());

if (process.env.NODE_ENV === "production") {
    // from Dan (Teaching Assistant)
    // app.use(enforce.HTTPS({ trustProtoHeader: true })); 
    app.use(express.static(path.join(__dirname, "client/build")));
   
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}
   
app.listen(port, error => {
    if (error) throw error;
    console.log("Server running on port: " + port);
});
   
app.post("/payment", (req, res) => {
    // the 'req' provides us the token from the onToken function in stripe-button.component

    /*
    From Yihua (Lecture 243: Backend Payment Route)
    Now, as you remember, this token is something we get back from our stripe button on our front end using the striped checkout.

    Whenever the user completes that checkout process, using that [stripe] modal, they're going to get back a token that has an ID on it that represents all of the information that they just filled out, as well as the
    actual credit card information and the cost and everything on it that we need in order to properly make a charge to stripe.

    That token is the identifier that allows Stripe to know who is making that request and where it's coming from.
    */

    // See here for more info on Stripe JS api: https://www.npmjs.com/package/stripe
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "usd"
    };

    // console.log(body)

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});
