const db = require('../config/mongooseConnection');
// register model
const Schema = db.Schema;

const DeviceSchema = new Schema({
    uid: {type: 'String'},
    vendor: {type: 'String'},
    status: {type: 'String'},
    createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const GatewaySchema = new Schema({
    name: {type: 'String'},
    serialNumber: {type: 'String'},
    ip: {type: 'String'},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    devices: [DeviceSchema]
},{ versionKey: false });

GatewaySchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

DeviceSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

// ORM
const gateway = db.model('gateways', GatewaySchema, 'gateways');
module.exports = gateway;
