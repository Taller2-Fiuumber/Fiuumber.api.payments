const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");

const getContract = (config, wallet) => {
    return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposits = {};

const deposit =
    ({ config }) =>
    async(senderId, amountInEthers) => {
        const basicPayments = await getContract(config, senderId);
        const tx = await basicPayments.deposit({
            value: await ethers.utils.parseEther(amountInEthers).toHexString(),
        });
        tx.wait(1).then(
            receipt => {
                console.log("Transaction mined");
                const firstEvent = receipt && receipt.events && receipt.events[0];
                console.log(firstEvent);
                if (firstEvent && firstEvent.event == "DepositMade") {
                    return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
                        .then(client => {
                            const doc = {
                                hash: tx.hash,
                                senderAddress: firstEvent.args.sender,
                                amount: firstEvent.args.amount,
                            };
                            client.db(process.env.DB_NAME).collection("deposit").insertOne(doc);
                            return doc;
                        })
                        .catch(err => {
                            return err;
                        });
                } else {
                    console.error(`Payment not created in tx ${tx.hash}`);
                }
            },
            error => {
                const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
                const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
                console.error("reasons List");
                console.error(reasonsList);

                console.error("message");
                console.error(message);
            },
        );
        return tx;
    };

const getDepositReceipt =
    ({}) =>
    async depositTxHash => {
        return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
            .then(client => {
                return client.db(process.env.DB_NAME).collection("deposit").find({ hash: depositTxHash }).toArray();
            })
            .catch(err => {
                return err;
            });
    };

module.exports = dependencies => ({
    deposit: deposit(dependencies),
    getDepositReceipt: getDepositReceipt(dependencies),
});