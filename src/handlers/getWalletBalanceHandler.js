function schema() {
  return {
    params: {
      type: "object",
      properties: {
        walletAddress: {
          type: "string",
        },
      },
    },
    required: ["address"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    return walletService.getBalance(req.params.address);
  };
}

module.exports = { handler, schema };
