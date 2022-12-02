function schema() {
  return {
    params: {
      type: "object",
      properties: {
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["amountInEthers"],
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    return reply.code(200).send(await contractInteraction.withdrawOwner(req.body.amountInEthers));
  };
}


module.exports = { handler, schema };
