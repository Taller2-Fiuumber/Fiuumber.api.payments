function schema() {
  return {
    params: {
      type: "object",
      properties: {
        retrieverAddress: {
          type: "string",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["retrieverAddress", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    return walletService.getWallet(req.body.retrieverAddress).then(async the_wallet => {
      return reply.code(200).send(await contractInteraction.retrieveFromWallet(the_wallet, req.body.amountInEthers));
    });
  };
}

module.exports = { handler, schema };
