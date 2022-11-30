function schema() {
  return {};
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const body = await contractInteraction.getAllDepositReceipt();
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
