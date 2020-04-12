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