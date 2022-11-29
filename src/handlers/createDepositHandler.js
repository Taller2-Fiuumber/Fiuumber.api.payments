function schema() {
  return {
    // senderId: envia? transacccion?
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    return walletService.getWallet(req.body.senderId).then(async (the_wallet) => {
      return reply.code(200).send(await contractInteraction.deposit(the_wallet, req.body.amountInEthers));
    });
  };
}


module.exports = { handler, schema };
