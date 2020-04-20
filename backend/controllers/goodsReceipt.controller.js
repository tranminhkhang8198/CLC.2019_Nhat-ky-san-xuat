const httpStatus = require('http-status');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const { formatTimeIn8601 } = require('../helpers/date');
module.exports.insertOne = async (req, res, next) => {
    try {
        // sys consts
        const {
            goodsReceipt,
            warehouse,
        } = req.app.models

        const {
            productId,
            productType,
            transDate,
            inDate,
            patchCode,
            quantity,
            price,
            expireDate,
            cooperativeId,
        } = req.body;

        const receiptObj = {
            productId: productId ? new ObjectID(productId.trim()) : null,
            productType: productType ? productType.trim() : '',
            transDate: transDate ? formatTimeIn8601(parseInt(transDate)) : new Date().toISOString(),
            inDate: inDate ? formatTimeIn8601(parseInt(inDate)) : new Date().toISOString(),
            patchCode: patchCode ? patchCode.trim() : '',
            quantity: quantity ? parseInt(quantity) : 0,
            price: price ? parseFloat(price) : 0.0,
            expireDate: expireDate ? formatTimeIn8601(parseInt(expireDate)) : new Date().toISOString(),
            cooperativeId: cooperativeId ? new ObjectID(cooperativeId.trim()) : null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),

        };

        const result = await goodsReceipt.insertOne(receiptObj);
        if (!result || result === null) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({
                    code: httpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Failed on inserting new good receipts',
                }).end();
        }

        // let productQuantity = 0;
        // for (let i in receiptObj.detail) {
        //     productQuantity += parseInt(receiptObj.detail[i].quantity)
        // }
        const warehouseObj = {
            productId: result.productId,
            productType: result.productType,
            goodsReceiptInfo:
                [
                    {
                        id: result._id,
                        quantity: result.quantity,
                    },
                ],
            cooperativeId: result.cooperativeId,
        }
        // const updateWarehouse = await warehouse.pushReceipt(warehouseObj);
        // console.log(warehouseObj);
        const isExist = await warehouse.isExist(warehouseObj.productId, warehouseObj.cooperativeId);
        if (!isExist || isExist === null || isExist === undefined) {

            const wareInsertOne = await warehouse.insertOne(warehouseObj);
            if (!wareInsertOne) {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({
                        code: httpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Failed on inserting new warehouse instance',
                    }).end();
            }
        }
        else {
            const updateWarehouse = await warehouse.pushReceipt(warehouseObj.productId, warehouseObj.goodsReceiptInfo[0]);
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