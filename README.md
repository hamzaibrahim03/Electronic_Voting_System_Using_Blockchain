# Electronic Voting System Using Blockchain

A decentralized voting app where every vote is stored on the **Ethereum blockchain**, so results can't be changed once they're cast. An election official creates an election, adds candidates and registered voters, and opens and closes voting. Each registered voter can vote **once**, and anyone can check the results after voting ends.

Final Year Project (FYP). The repository contains the full source code together with the project report, presentations, diagrams and demo videos.

## Demo

- 🎬 **Project walkthrough:** [`Project/Final Project.mp4`](Project/Final%20Project.mp4)
- ⚙️ **Setup videos:** [`Project/setup 1.mp4`](Project/setup%201.mp4) and [`Project/setup 2.mp4`](Project/setup%202.mp4)
- 📄 **Project report:** [`FYP 2 Docs/Final Project Report.pdf`](FYP%202%20Docs/Final%20Project%20Report.pdf)

## How it works

The election runs through three stages, all enforced by the smart contract:

1. **Created**: the official (the account that deployed the contract) sets the election title and proposal, adds **candidates**, and registers **voters** by their wallet address and name.
2. **Voting**: the official starts the vote. Each registered voter casts one vote from their MetaMask wallet; a second vote from the same address is rejected.
3. **Ended**: the official ends the vote, and the results page shows the vote count for each candidate.

Only the official can add candidates or voters and start or end voting. The contract checks the stage before every action, so, for example, nobody can vote before voting starts or after it ends.

## Features

- **Create an election** from the browser. The app deploys a new `Voting` contract through MetaMask and remembers its address.
- **Add candidates and voters** to the election.
- **Start and end voting** (official only).
- **Vote** with MetaMask; the app shows whether you're registered and whether you've already voted.
- **Results** page with vote counts per candidate.
- Toast notifications and loading states for every blockchain transaction.

## Tech stack

| Part | Technology |
|---|---|
| Smart contract | **Solidity** (`Voting.sol`), **Truffle** |
| Local blockchain | **Ganache** (port 7545) |
| Wallet | **MetaMask** |
| Front end | **React 18**, **Material UI**, React Router, **web3.js**, React Toastify, Lottie |

## Run it locally

**You'll need:** [Node.js](https://nodejs.org/), [Ganache](https://archive.trufflesuite.com/ganache/) and the [MetaMask](https://metamask.io/) browser extension.

1. **Start Ganache** on `http://127.0.0.1:7545`.
2. **Connect MetaMask to Ganache:** add a network with RPC URL `http://127.0.0.1:7545`, then import one or more Ganache accounts using their private keys. The first account you use becomes the election official.
3. **Install and start the app:**
   ```bash
   git clone https://github.com/hamzaibrahim03/Electronic_Voting_System_Using_Blockchain.git
   cd "Electronic_Voting_System_Using_Blockchain/Project/voting system blockchain"
   npm install
   npm start
   ```
4. Open `http://localhost:3000`, go to **Election**, and create your first election. MetaMask will ask you to confirm the contract deployment.

To vote as different people, switch accounts in MetaMask. Each one has to be added as a voter first.

## Project structure

```
Project/
  voting system blockchain/
    src/
      contracts/Voting.sol     Smart contract (election logic)
      migrations/              Truffle deployment scripts
      pages/                   Create, Voting and Result pages
      components/Appbar.jsx    Navigation bar
      data/Data.js             Contract ABI and bytecode used by the front end
    truffle-config.js
  Final Project.mp4            Demo video
FYP 1 Docs/                    Proposal, chapters and first presentation
FYP 2 Docs/                    Final report, diagrams and defence presentation
```

## Author

**Hamza Ibrahim** – [GitHub](https://github.com/hamzaibrahim03)
