# Damocratic (aka Vote Chain )

[Video demo of the project (PT-BR)](https://youtu.be/zWmsFENiClc)

A brief explanation on the project name, Damocratic is a word play, mixing the word "Dam" with "Democratic", all due our lovely mascot the Blocky the Beaver, as seen in the image below.

![Blocky Beaver](vote-chain/public/logo-small.png)

Damocratic is an application aimed to serve as a platform to conduct elections in a completely digital environment, packaged with security, auditability and anonimicity.To achieve all of this, which many may say it's imposssible, the application is built using blockchain technology, specifically th Hyperledger Fabric blockchain .

# Project Setup

Here one can find the instructions to setup the environment and run the application locally

## Requirements

- Linux environment
- NodeJs
- Pnpm
- Docker
- Hyperledger Fabric

### Installing Fabric

The first step is to install Hyperledger Fabric. Since this is more intricate process, the instructions for it's installation doesn't belong to this README, [so they can be found here](https://hyperledger-fabric.readthedocs.io/en/latest/getting_started.html#getting-started-install).

## Cloning the Repo

Clone this repository to a directory of your preference, and navigate to the repo folder, with:

```
git clone https://github.com/phllp/vote-chain.git
cd ./vote-chain
```

## Setting up the Backend

Navgate to the backend folder with:

```
cd ./backend
```

### Get the network running

Navigate to the network folder with and execute the script `setupStuff.sh`:

**Important:** make sure that docker is installed and running, if it's innactive, start it with `sudo service docker start` or a similar command

```
cd ./test-network
sudo sh ./setupStuff.sh
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
```

This script should perform all the necessary actions to set the network properly and get it running, if it doesn't work, you can try two different aproaches:

1. Open the `setupStuff.sh` file and copy and paste each command manually on the terminal, it may solve problems, specially if you're setting up the environment for the first time, or after booting your device.
2. [Read the docs](https://hyperledger-fabric.readthedocs.io/en/latest/test_network.html) and do as they say, because the network config is the same, perhaps you'll need to change some file names, but hey, that's the fun part :D.

This step is reponsible for a few things, like setting up the docker containers which compose the network, package the chaincode and deploy it to all the organizations on the network.

### Init the ledger with Parties

The parties can't be registered via the web interface yet, so they need to be mannually added after the network is running and the chaincode is running.
Fortunatelly that is easy, simply run the following script on the terminal, but **make sure you're on the right directory**:

```
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"PartyManagementContract:InitPartiesLedger","Args":[]}'

```

### Running the API

Navigate back and then to the api folder and create a `.env` file.

```
cd ../vote-chain-gateway/
touch .env
```

Copy the contents of `.env.example` to the newly create `.env`.

Now install all the necessary packages and then start the dev server:

```
pnpm i
pnpm dev
```

The server should start running at port 3001

### Setting up the Frontend

Navigate back all way to the repo root and then to the frontend folder.

```
cd ../../vote-chain/
```

Install the dependencies and then start the application:

```
pnpm i
pnpm dev
```

At this point the application should be funcional and acessible locally.
