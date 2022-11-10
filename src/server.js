const { MongoClient } = require("mongodb");

const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");
const dotenv = require("dotenv");

dotenv.config();

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Swagger API

const swagger = require('@fastify/swagger')

fastify.register(swagger, {
    mode: 'static',
    specification: {
        path: '/app/src/public/swagger.json'
    },
    exposeRoute: true
})

fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function(request, reply, next) { next() },
        preHandler: function(request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
})

// Declares routes
routes.forEach(route => fastify.route(route({ config, services })));

// Run the server!
const start = async() => {
    try {
        await fastify.listen({ port: process.env.PORT || 8082, host: '0.0.0.0' });

        const client = new MongoClient(process.env.DATABASE_URL);

        await client.connect();
        await client.db(process.env.DB_NAME).createCollection("wallet")
            .then(_ => {
                fastify.log.info(`"wallet" collection was created`);
            })
            .catch(err => {
                fastify.log.info(`"wallet" collection already exists`);
            });

        await client.db(process.env.DB_NAME).createCollection("deposit")
            .then(_ => {
                fastify.log.info(`"deposit" collection was created`);
            })
            .catch(err => {
                fastify.log.info(`"deposit" collection already exists`);
            });

        fastify.log.info(`server listening on ${fastify.server.address().port} with connection to mongodb: ${client.db(process.env.DB_NAME).databaseName}`);

        client.close();
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();