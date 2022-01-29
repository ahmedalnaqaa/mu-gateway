require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const Server = require('./server');

const app = express(),
    isDev = process.env.NODE_ENV === 'development';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

function setupMiddleware(app) {
    // NOTE: Always specify `process.env.PORT` here for app engine. Otherwise error may occur.
    app.set('port', process.env.PORT || 8080); // this must be required for app engine.
    app.disable('x-powered-by');
    app.disable('Server'); // disable `Server` header expose (for appengine)
    app.set('trust proxy', 1); // express behind proxy doesn't receive X-Forwarded-* header, if false.

    app
        .use(morgan('dev')) // http logger
        .use(cors()) // enable cors for all.
        .use(express.json({ limit: '1mb' })) // default application/json.
        .use(express.urlencoded({ extended: true, limit: '1mb' })); // doesn't handle multipart and buffer.

    // API routes
    /**  @default */
    app.use(`/api`, routes);

    // custom error handling for middlewares.
    app.use((err, req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (req.headersSent || (err.isServer && !isDev)) return next(err);

        // handle validation error sent by Joi. Only for production.
        if (err.isJoi && err.name === 'ValidationError') {
            return res.status(400).json({
                error: {
                    code: 400,
                    message: 'Bad Request. Invalid Params.',
                },
            });
        }

        if (!err.isBoom) return next(err); // internal unexpected error handled by express default template.

        return res.status(err.output.statusCode).json({
            error: {
                code: err.output.statusCode,
                message: err.message,
                ...err.data,
            },
        });
    });

    return app;
}

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, false, {
        docExpansion: 'none',
    })
);
// call the middleware start the app
setupMiddleware(app);
new Server(app).start();

/* EOF */
