function schema() {
    return {
        params: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                },
            },
        },
        required: ["userId"],
    };
}

function handler({ walletService }) {
    return async function(req, reply) {
        const body = await walletService.getWalletData(req.params.userId);
        reply.code(200).send(body);
    };
}

module.exports = { handler, schema };