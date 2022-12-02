function schema() {
  return {
    params: {
      type: "object",
      properties: {
        address: {
          type: "string",
        },
      },
    },
    required: ["address"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.getWalletData(req.params.address);
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
