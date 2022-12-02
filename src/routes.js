const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const createTransferDeposit = require("./handlers/createTransferHandler");

const getDeposit = require("./handlers/getDepositHandler");
const createDepositToReceiver = require("./handlers/createDepositToReceiverHandler");

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

function createDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: "/api/wallets-service/deposit",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
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
  createDepositRoute,
  createDepositToReceiverRoute,
  createTransferDepositRoute,
  getDepositRoute,
  getAllDepositRoute,
  getHomeRoute,
];
