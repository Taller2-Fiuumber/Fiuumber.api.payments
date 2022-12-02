function schema() {
  return {};
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.createWallet();
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
