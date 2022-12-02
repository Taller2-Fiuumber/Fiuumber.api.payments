function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderAddress: {
          type: "string",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderAddress", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    return walletService.getWallet(req.body.senderAddress).then(async (the_wallet) => {
      return reply.code(200).send(await contractInteraction.depositFromSender(the_wallet, req.body.amountInEthers));
    });
  };
}


module.exports = { handler, schema };
