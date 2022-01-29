const boom = require('@hapi/boom');
const uid = require('uid2');
const gatewayModel = require('../../models/GatewayModel');
const mongoose = require('mongoose');


module.exports = {
    /**
     * Get list
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    list: async function(req, res, next) {
        try {
            const gateways = await gatewayModel.find();
            res.header('Access-Control-Expose-Headers', 'Content-Range');
            res.header('Content-Range', 'gateways 0-20/20');
            return res.json(gateways);
        } catch (e) {
            return next(boom.internal('Error listing gateways: ', e));
        }
    },

    /**
     * Get list
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    findById: async function(req, res, next) {
        try {
            const gateway = await gatewayModel.findById(req.params.id, {__v: 0});
            if (!gateway) return next(boom.badRequest('Gateway not found'));
            return res.json(gateway);
        } catch (e) {
            return next(boom.internal('Error getting gateway: ', e));
        }
    },

    /**
     * Create gateway
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    create: async function(req, res, next) {
        try {
            const gatewayBody = req.body;
            gatewayBody.serialNumber = uid(20);
            gatewayBody.createdAt = new Date();
            gatewayBody.updatedAt = new Date();
            gatewayBody.devices = gatewayBody.devices.map((device) => {
                return {
                    uid: uid(30),
                    createdAt: new Date(),
                    ... device
                }
            });
            const gateway = await gatewayModel.create(gatewayBody);
            return res.json(gateway);
        } catch (e) {
            return next(boom.internal('Error creating gateway: ', e));
        }
    },

    /**
     * Add device to gateway
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    addDevice: async function(req, res, next) {
        try {
            const gatewayId = req.params.id;
            const gateway = await gatewayModel.findById(gatewayId, {__v: 0});
            if (!gateway) return next(boom.badRequest('Gateway not found'));
            gateway.devices.push({
                uid: uid(30),
                createdAt: new Date(),
                ...req.body
            })
            const updatedGateway  = await gatewayModel.updateOne({_id: gatewayId}, gateway);
            if (updatedGateway.modifiedCount !== 1) return next(boom.badRequest('Failed to update'));
            return res.json(gateway);
        } catch (e) {
            return next(boom.internal('Error adding device to gateway: ', e));
        }
    },

    /**
     * Remove device from gateway
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    removeDevice: async function(req, res, next) {
        try {
            const gatewayId = req.params.id;
            gatewayModel.findOneAndUpdate({_id: gatewayId}, {$pull: { devices: {_id: req.params.device_id}}},
                { new: true},
                (err, updatedGateway) => {
                if (err) return next(boom.badRequest('Failed to delete device', err));
                    return res.json(updatedGateway);
                }
            );
        } catch (e) {
            return next(boom.internal('Error removing device from gateway: ', e));
        }
    },
};
