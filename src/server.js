const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

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
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
