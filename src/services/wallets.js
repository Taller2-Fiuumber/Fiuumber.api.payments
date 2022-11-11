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

const createWallet =
    ({ config }) =>
    userId => {
        const provider = new ethers.providers.AlchemyProvider(config.network, config.infuraApiKey);
        // This may break in some environments, keep an eye on it
        const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);

        return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
            .then(client => {
                const doc = {
                    userId: userId,
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
    async() => {
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
    userId => {
        return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
            .then(client => {
                return client.db(process.env.DB_NAME).collection("wallet").find({ userId: userId }).toArray();
            })
            .catch(err => {
                return err;
            });
    };

const getWallet =
    ({ config }) =>
    userId => {
        return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
            .then(client => {
                const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
                const wallet = client.db(process.env.DB_NAME).collection("wallet").findOne({ userId: userId });
                return new ethers.Wallet(wallet.privateKey, provider);
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
});