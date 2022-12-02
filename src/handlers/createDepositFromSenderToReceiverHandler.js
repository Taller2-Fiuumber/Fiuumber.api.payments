function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderAddress: {
          type: "string",
        },
        receiverAddress: {
          type: "string",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderAddress", "receiverAddress", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    return walletService.getWallet(req.body.senderAddress).then(async (sender_wallet) => {

      return walletService.getWallet(req.body.senderAddress).then(async (receiver_wallet) => {
        return reply.code(200).send(await contractInteraction.depositFromSenderToReceiver(sender_wallet, receiver_wallet, req.body.amountInEthers));
      });
    });
  };
}


module.exports = { handler, schema };
