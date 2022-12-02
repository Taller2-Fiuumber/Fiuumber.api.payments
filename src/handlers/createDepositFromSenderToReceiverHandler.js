function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "integer",
        },
        receiverId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId", "receiverId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    return walletService.getWallet(req.body.senderId).then(async (sender_wallet) => {

      return walletService.getWallet(req.body.senderId).then(async (receiver_wallet) => {
        return reply.code(200).send(await contractInteraction.depositFromSenderToReceiver(sender_wallet, receiver_wallet, req.body.amountInEthers));
      });
    });
  };
}


module.exports = { handler, schema };
