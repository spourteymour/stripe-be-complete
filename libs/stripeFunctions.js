const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.createIntent = async(payload)=>{
    return await new Promise(async(resolve, reject)=>{
    try {
        let createIntent = await stripe.paymentIntents.create(
            {
              amount: payload.amount,
              currency: payload.currency,
              payment_method_types: ['card'],
              metadata: payload.metadata
            });
        resolve(createIntent);
    } catch (error) {
        console.log("Error in creating charge");
        reject(error);
    }
  })
}

exports.confirmIntent = async(payload)=>{
    return await new Promise(async(resolve, reject)=>{
    try {
        let confirmIntent = await stripe.paymentIntents.confirm(payload.intent_id,{payment_method: payload.payment_method})
        resolve(confirmIntent);
    } catch (error) {
        console.log("Error in creating charge");
        reject(error);
    }
  })
}

exports.create_ephemeral = async(payload)=>{
  return await new Promise(async(resolve, reject)=>{
    try {
      console.log("Payload", payload);
      libs.ephemeralKeys.create({customer: req.body.customerId}, {stripe_version: stripe_version})
      .then((key) => {
          response.status(200).send(key);
      }).catch((err) => {
          response.status(500).end();
      });
    } catch (error) {
      console.log("Error in creating charge");
      reject(error);
  }
  })
}
//   try {
//       const stripe_version = request.body.api_version;
//       if (!stripe_version) {
//           response.status(400).end();
//         return;
//       }
//       libs.ephemeralKeys.create({customer: req.body.customerId},
//         {stripe_version: stripe_version}
//       ).then((key) => {
//           response.status(200).send(key);
//       }).catch((err) => {
//           response.status(500).end();
//       });
//   } catch (error) {
//       console.log("error in the route", error);
//       response.status(500).json({
//           success : 0,
//           errorMessage : error.message
//       })
//   }
// }
