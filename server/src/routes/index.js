const express = require('express');
const router = express.Router();
const { celebrate, errors, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi)
const {GatewayController} = require('../controllers');
const GatewaySchema = require('../schemas/GatewaySchema');

/**
 * Get list of gateways
 */
router.get(
    '/gateways',
    GatewayController.list
);

/**
 * Find gateway by ID
 */
router.get(
    '/gateways/:id',
    celebrate(GatewaySchema.findById),
    GatewayController.findById
);

/**
 *  Create gateway
 */
router.post(
    '/gateways',
    celebrate(GatewaySchema.create),
    GatewayController.create
);

/**
 *  Add device to gateway
 */
router.post(
    '/gateways/:id/devices',
    celebrate(GatewaySchema.addDevice),
    GatewayController.addDevice
);

/**
 *  Remove device from
 */
router.delete(
    '/gateways/:id/devices/:device_id',
    celebrate(GatewaySchema.removeDevice),
    GatewayController.removeDevice
);

// error handling for schema validation (default error 400).
router.use(errors());

module.exports = router;
