const { Joi, Segments } = require('celebrate');

module.exports = {
    findById: {
        [Segments.PARAMS]: Joi.object({
            id: Joi.objectId().required(),
        }),
    },
    create: {
        [Segments.BODY]: Joi.object({
            name: Joi.string().required(),
            ip: Joi.string().ip({
                version: [
                    'ipv4',
                ],
            }).required(),
            devices: Joi.array()
                .required()
                .max(10)
                .items({
                    vendor: Joi.string().required(),
                    status: Joi.string().default('offline')
                })
        })
    },
    addDevice: {
        [Segments.BODY]: Joi.object({
            vendor: Joi.string().required(),
            status: Joi.string().valid('online', 'offline').required()
        }),
    },
    removeDevice: {
        [Segments.PARAMS]: Joi.object({
            id: Joi.objectId().required(),
            device_id: Joi.objectId().required(),
        })
    }
};
