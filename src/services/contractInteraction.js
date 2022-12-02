const ethers = require("ethers");
const { MongoClient } = require("mongodb");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const withdrawOwner = ({ config }) => async amountToSend => {
  const provider = new ethers.providers.AlchemyProvider(config.network, config.infuraApiKey);
  const fiuumberWallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  const basicPayments = getContract(config, fiuumberWallet);
  const tx = await basicPayments.deposit({
    value: ethers.utils.parseEther(amountToSend).toHexString(),
  });
  tx.wait(1).then(
    receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      if (firstEvent && firstEvent.event == "DepositMade") {
        let doc = {
          txHash: tx.hash,
          address: firstEvent.args.sender,
          amountSent: firstEvent.args.amount.toNumber(),
          type: "withdraw owner",
        };
        MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
          .then(client => {
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

const retrieveFromWallet =
  ({ config }) =>
  async (retrieverWallet, amountToSend) => {
    const txRetriever = await depositFromSender({config})(retrieverWallet, amountToSend)
    const txWithdraw = await withdrawOwner({config})(amountToSend)
    return [txRetriever, txWithdraw]
  };


const depositFromSenderToReceiver =
  ({ config }) =>
  async (senderWallet, receiverWallet, amountToSend) => {
    const txSender = await depositFromSender({config})(senderWallet, amountToSend)
    const txReceiver = await depositToReceiver({config})(receiverWallet, amountToSend)
    return [txSender, txReceiver]
  };

const depositFromSender =
  ({ config }) =>
  async (senderWallet, amountToSend) => {

    const basicPayments = await getContract(config, senderWallet);
    const tx = await basicPayments.deposit({
      value: await ethers.utils.parseEther(amountToSend).toHexString(),
    });

    tx.wait(1).then(
      receipt => {
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "DepositMade") {
          let doc = {
            txHash: tx.hash,
            address: firstEvent.args.sender,
            amountSent: firstEvent.args.amount.toNumber(),
            type: "from sender to owner",
          };
          MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
            .then(client => {
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


  const depositToReceiver =
    ({ config }) =>
    async (receiverWallet, amountToSend) => {

    const provider = new ethers.providers.AlchemyProvider(config.network, config.infuraApiKey);
    const fiuumberWallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
    const basicPayments = getContract(config, fiuumberWallet);
    const tx = await basicPayments.sendPayment(
      receiverWallet.address,
      ethers.utils.parseEther(amountToSend).toHexString(),
    );

    tx.wait(1).then(
      receipt => {
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        if (firstEvent && firstEvent.event == "PaymentMade") {
          let doc = {
            txHash: tx.hash,
            address: firstEvent.args.receiver,
            amountSent: firstEvent.args.amount.toNumber(),
            type: "from owner to receiver",
          };
          MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
            .then(client => {
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

const getDepositReceipt = ({ config }) => async depositTxHash => {
    return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
      .then( client => {
        return client.db(process.env.DB_NAME).collection("deposit").findOne({ txHash: depositTxHash });
      })
      .catch(err => {
        return err;
      });
  };

const getAllDepositReceipt = ({ config }) => async () => {
  return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then( client => {
      return client.db(process.env.DB_NAME).collection("deposit").find().toArray();
    })
    .catch(err => {
      return err;
    });
};

const deleteAllDepositReceipt = ({ config }) => async () => {
  return MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then( client => {
      return client.db(process.env.DB_NAME).collection("deposit").deleteMany({})
    })
    .catch(err => {
      return err;
    });
};


module.exports = dependencies => ({
  withdrawOwner: withdrawOwner(dependencies),
  depositFromSender: depositFromSender(dependencies),
  depositToReceiver: depositToReceiver(dependencies),
  depositFromSenderToReceiver: depositFromSenderToReceiver(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  getAllDepositReceipt: getAllDepositReceipt(dependencies),
  retrieveFromWallet: retrieveFromWallet(dependencies),
  deleteAllDepositReceipt: deleteAllDepositReceipt(dependencies),
});
