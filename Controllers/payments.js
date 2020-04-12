const libs = require('../libs/stripeFunctions');

exports.create_ephemeral = async(request, response)=>{
    try {
        const stripe_version = request.body.api_version;
        if (!stripe_version) {
            response.status(400).end();
          return;
        }
        libs.ephemeralKeys.create(
          {customer: req.body.customerId},
          {stripe_version: stripe_version}
        ).then((key) => {
            response.status(200).send(key);
        }).catch((err) => {
            response.status(500).end();
        });
    } catch (error) {
        console.log("error in the route", error);
        response.status(500).json({
            success : 0,
            errorMessage : error.message
        })
    }
}

exports.createIntent = async(request, response)=>{
    try {
        console.log("request data", request.body);
        let paymentData = {
            amount : request.body.amount * 100,
            currency: request.body.currency,
            metadata:{
                buyer_id: request.body.buyer_id,
                seller_id: request.body.seller_id,
                item_id : request.body.item_id,
                sessionDate:request.body.sessionDate
            }
        };
        let createIntent = await libs.createIntent(paymentData);
        if(!createIntent){
            response.status(500).json({
                success : 0,
                errorMessage :"Failed to charge"
            })
        }
        response.status(200).json({
            success : 1,
            errorMessage :createIntent
        })
    } catch (error) {
        console.log("error in the route", error);
        response.status(500).json({
            success : 0,
            errorMessage : error.message
        })
    }
}
exports.confirmIntent = async(request, response)=>{
    try {
        console.log("request data", request.body);
        let payloadData = {
            intent_id: request.body.intent_id,
            payment_method: request.body.payment_method
        }
        let confirmIntent = await libs.confirmIntent(payloadData);
        if(!confirmIntent){
            response.status(500).json({
                success : 0,
                errorMessage :"Failed to charge"
            })
        }
        response.status(200).json({
            success : 1,
            errorMessage :confirmIntent
        })
    } catch (error) {
        console.log("error in the route", error);
        response.status(500).json({
            success : 0,
            errorMessage :error.message
        })
    }
}