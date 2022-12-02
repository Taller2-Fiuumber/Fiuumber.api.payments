const createWallet = require("./handlers/createWalletHandler");
const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");

const createDepositFromSender = require("./handlers/createDepositFromSenderHandler");
const createDepositToReceiver = require("./handlers/createDepositToReceiverHandler");
const createDepositFromSenderToReceiver = require("./handlers/createDepositFromSenderToReceiverHandler");
const createTransferDeposit = require("./handlers/createTransferHandler");
const getDeposit = require("./handlers/getDepositHandler");
const getAllDeposit = require("./handlers/getAllDepositHandler");

const getHome = require("./handlers/getHomeHandler");

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/api/wallets-service/wallet/:userId",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function getWalletsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/api/wallets-service/wallet",
    schema: getWalletsData.schema(config),
    handler: getWalletsData.handler({ config, ...services }),
  };
}

function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: "/api/wallets-service/wallet/:userId",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
  };
}

function createDepositToReceiverRoute({ services, config }) {
  return {
    method: "POST",
    url: "/api/wallets-service/depositToReceiver",
    schema: createDepositToReceiver.schema(config),
    handler: createDepositToReceiver.handler({ config, ...services }),
  };
}

function createDepositFromSenderRoute({ services, config }) {
  return {
    method: "POST",
    url: "/api/wallets-service/depositFromSender",
    schema: createDepositFromSender.schema(config),
    handler: createDepositFromSender.handler({ config, ...services }),
  };
}

function createDepositFromSenderToReceiverRoute({ services, config }) {
  return {
    method: "POST",
    url: "/api/wallets-service/depositFromSenderToReceiver",
    schema: createDepositFromSenderToReceiver.schema(config),
    handler: createDepositFromSenderToReceiver.handler({ config, ...services }),
  };
}

function createTransferDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: "/api/wallets-service/deposit/transfer",
    schema: createTransferDeposit.schema(config),
    handler: createTransferDeposit.handler({ config, ...services }),
  };
}

function getDepositRoute({ services, config }) {
  return {
    method: "GET",
    url: "/api/wallets-service/deposit/:txHash",
    schema: getDeposit.schema(config),
    handler: getDeposit.handler({ config, ...services }),
  };
}

function getAllDepositRoute({ services, config }) {
  return {
    method: "GET",
    url: "/api/wallets-service/deposits",
    schema: getAllDeposit.schema(config),
    handler: getAllDeposit.handler({ config, ...services }),
  };
}

function getHomeRoute({ services, config }) {
  return {
    method: "GET",
    url: "/",
    schema: getHome.schema(config),
    handler: getHome.handler({ config, ...services }),
  };
}

module.exports = [
  getWalletDataRoute,
  getWalletsDataRoute,
  createWalletRoute,
  createDepositFromSenderToReceiverRoute,
  createDepositFromSenderRoute,
  createDepositToReceiverRoute,
  createTransferDepositRoute,
  getDepositRoute,
  getAllDepositRoute,
  getHomeRoute,
];
