function schema() {
  return {
    params: {
      type: "object",
      properties: {
        receiverAddress: {
          type: "string",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["receiverAddress", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    return walletService.getWallet(req.body.receiverAddress).then(async the_wallet => {
      console.log("handler -> ETH: ", req.body.amountInEthers);
      console.log("handler -> WALLET: ", the_wallet);
      return reply.code(200).send(await contractInteraction.depositToReceiver(the_wallet, req.body.amountInEthers));
    });
  };
}

module.exports = { handler, schema };
