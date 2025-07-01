# Blockchain Hyperledger Fabric em Sistemas Eleitorais

Trabalho desenvolvido na disciplina de Redes de Computadores (55RED) do curso de Bacharelado em Engenharia de Sofwtware da Universidade do Estado de Santa Catarina (UDESC).

Acadêmicos:

- Clara dos Santos Becker
- Erick Augusto Warmling
- Lucas Gabriel Falcade Nunes
- Marco Antonio Garlini Possamai

<hr>

### Apresentação da execução e funcionalidades da Blockchain: 

A apresentação pode ser acessada através do seguinte link: [https://youtu.be/wsyVAHuYaTs](https://youtu.be/wsyVAHuYaTs)

<hr>

### Execução da Blockchain

1. Clonar o repositório
   ``` bash
   sudo su
   git clone https://github.com/ErickWarmling/BlockchainEleicoes.git
   cd BlockchainEleicoes/
   ```

2. Subir a rede Hyperledger Fabric
   ``` bash
   cd backend/
   cd test-network/
   ./network.sh down
   ./network.sh up createChannel -c mychannel -ca -s couchdb
   ./network.sh deployCC -ccn basic -ccp ../chaincode-typescript/ -ccl typescript   
   ```

3. Configuração das variáveis de ambiente

   As variáveis de ambiente são referentes à Org1 e Org2. Define elas separadamente e execute sempre dentro da pasta **test-network**.
   
   ``` bash
   export PATH=${PWD}/../bin:$PATH
   export FABRIC_CFG_PATH=$PWD/../config/

   export CORE_PEER_TLS_ENABLED=true
   export CORE_PEER_LOCALMSPID="Org2MSP"
   export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
   export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
   export CORE_PEER_ADDRESS=localhost:9051

   export CORE_PEER_LOCALMSPID="Org1MSP"
   export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
   export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
   export CORE_PEER_ADDRESS=localhost:7051
   ```

4. Invocar a Chaincode

   Inicialize os partidos do ledger por meio deste comando:

   ``` bash
   peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"PartyManagementContract:InitPartiesLedger","Args":[]}'
   ```

5. Executar o Back-end (Gateway)

   ``` bash
   cd ../vote-chain-gateway/
   nano .env
   ```
   Dentro do arquivo .env, insira o seguinte conteúdo:

   ``` bash
   PORT=3001
   ENVIRONMENT=development
   ```

   Salve o arquivo com CTRL+O, e depois execute os comandos para instalar as dependências:

   ``` bash
   pnpm i
   pnpm dev --host
   ```

6. Executar o Front-end

   Abra outro terminal, e rode os comandos para executar o front-end:

   ``` bash
   cd BlockchainEleicoes/vote-chain/
   pnpm i
   pnpm dev --host
   ```

7. Acessar o Banco de Dados PostgreSQL

   Acesse o banco de dados pelo terminal:

   ``` bash
   sudo -u postgres psql -d vote_chain_db
   ```

   Para consultar os registros das tabelas, rode os comandos SQL de consulta:

    ``` bash
    SELECT * FROM votes;
    SELECT * FROM vote_control;
    ```
    
