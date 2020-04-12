const libs = require('../libs/stripeFunctions');
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