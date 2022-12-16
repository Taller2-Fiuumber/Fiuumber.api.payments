function schema() {
  return {
    params: {
      type: "object",
      properties: {
        address: {
          type: "string",
        },
        skip: {
          type: "number",
        },
        take: {
          type: "number",
        },
      },
    },
    required: ["address", "skip", "take"],
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const body = await contractInteraction.deleteAllDepositReceipt(req.params.address, req.params.skip, req.params.take);
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
