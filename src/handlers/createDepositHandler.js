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
  return async function (req) {
    walletService.getWallet(req.body.senderId).then((the_wallet) => {
      return contractInteraction.deposit(the_wallet, req.body.amountInEthers);
    });
  };
}

module.exports = { schema, handler };
