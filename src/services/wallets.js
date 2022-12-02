const ethers = require("ethers");
const { MongoClient } = require("mongodb");

/*
NOTE: Do not add async to functions with params!
*/

const getDeployerWallet =
  ({ config }) =>
  () => {
    const provider = new ethers.providers.AlchemyProvider(config.network, config.infuraApiKey);
    const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
    console.log("Deployer wallet" + wallet.address);
    return wallet;
  };

  const getBalance =
  ({ config }) =>
  async (address) => {
    const provider = new ethers.providers.AlchemyProvider(config.network, config.infuraApiKey);

    return provider.getBalance(address)
    .then((balance) => {
      const balanceInEth = ethers.utils.formatEther(balance)

      return balanceInEth
     })
    .catch(err => {
      return err;
    });
  };


const createWallet =
  ({ config }) =>
  async () => {
    const provider = new ethers.providers.AlchemyProvider(config.network, config.infuraApiKey);
    // This may break in some environments, keep an eye on it
    const wallet = ethers.Wallet.createRandom().connect(provider);

    return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
      .then(client => {
        const doc = {
          address: wallet.address,
          privateKey: wallet.privateKey,
        };
        client.db(process.env.DB_NAME).collection("wallet").insertOne(doc);
        return doc;
      })
      .catch(err => {
        return err;
      });
  };

const getWalletsData =
  ({ config }) =>
  async () => {
    return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
      .then(client => {
        return client.db(process.env.DB_NAME).collection("wallet").find().toArray();
      })
      .catch(err => {
        return err;
      });
  };

const getWalletData =
  ({ config }) =>
  async (address) => {
    return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
      .then(client => {
        return client.db(process.env.DB_NAME).collection("wallet").find({ "address": address }).toArray();
      })
      .catch(err => {
        return err;
      });
  };

const getWallet = ({ config }) =>
    async (address) => {
    return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
      .then(async client => {
        const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
        let a_wallet = await client.db(process.env.DB_NAME).collection("wallet").find({ "address": address }).toArray();
        return new ethers.Wallet(a_wallet[0].privateKey, provider);
      })
      .catch(err => {
        return err;
      });
  };

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
  getBalance: getBalance({ config }),
});
