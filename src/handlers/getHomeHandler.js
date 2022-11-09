function schema() {
    return {};
}

function handler({ homeService }) {
    return async function(req, reply) {
        reply.code(200).send({ "message": "Fiuumber API payments" });
    };
}

module.exports = { handler, schema };
