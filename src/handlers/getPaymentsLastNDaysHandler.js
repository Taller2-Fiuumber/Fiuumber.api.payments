function schema() {
    return {
      params: {
        type: "object",
        properties: {
          lastNDays: {
            type: "number",
          },
        },
      },
      required: ["lastNDays"],
    };
  }

  function handler({ contractInteraction }) {
    return async function (req, reply) {
      return contractInteraction.getPaymentsLastNDays(req.params.lastNDays)
    };
  }


  module.exports = { handler, schema };
