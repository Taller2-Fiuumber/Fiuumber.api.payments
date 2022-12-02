function schema() {
  return {
    params: {
      type: "object",
      properties: {
        receiverId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["receiverId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    return walletService.getWallet(req.body.receiverId).then(async (the_wallet) => {
      return reply.code(200).send(await contractInteraction.depositToReceiver(the_wallet, req.body.amountInEthers));
    });
  };
}


module.exports = { handler, schema };
