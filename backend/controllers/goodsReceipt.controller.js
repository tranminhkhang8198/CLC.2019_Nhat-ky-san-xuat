const httpStatus = require('http-status');
const _ = require('lodash');
module.exports.insertOne = async (req, res, next) => {
    try {
        // sys consts
        const {
            goodsReceipt,
            warehouse,
        } = req.app.models

        const {
            cooperativeID,
            transDate,
            product_id,
            product_type,
            detail,
            inDate,
            notes,
            price,
        } = req.body;

        const receiptObj = {
            cooperativeID: cooperativeID,
            transDate: transDate,
            product_id: product_id,
            product_type: product_type,
            price: price,
            detail: detail,
            inDate: inDate,
            notes: notes ? notes : '',
        };

        const result = await goodsReceipt.insertOne(receiptObj);
        if (!result || result === null) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({
                    code: httpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Failed on inserting new good receipts',
                }).end();
        }

        let productQuantity = 0;
        for (let i in receiptObj.detail) {
            productQuantity += parseInt(receiptObj.detail[i].quantity)
        }
        const warehouseObj = {
            productId: receiptObj.product_id,
            productType: receiptObj.product_type,
            quantity: productQuantity,
            price: receiptObj.price,
            cooperativeId: receiptObj.cooperativeId,
        }
        console.log(warehouseObj);
        const isExist = await warehouse.isExist(warehouseObj.productId, warehouseObj.cooperativeID);
        if (!isExist || isExist === null || isExist === undefined) {

            const wareInsertOne = await warehouse.create(warehouseObj);
            if (!wareInsertOne) {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({
                        code: httpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Failed on inserting new warehouse instance',
                    }).end();
            }
        }
        else {
            console.log('is', warehouseObj)

            const updateWarehouse = await warehouse.updateQuantity(warehouseObj.productId, warehouseObj.cooperativeID, parseInt(warehouseObj.quantity));
            if (!updateWarehouse) {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({
                        code: httpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Failed on updating warehouse'
                    }).end();
            }
        }



        return res.status(httpStatus.CREATED)
            .json({
                code: httpStatus.CREATED,
                message: 'Inseart new good receipt successfully',
                result: result,
            }).end();




    } catch (error) {
        next(error);
    }
}