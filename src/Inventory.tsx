import { BigNumber, ethers } from "ethers";
import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  MintableERC721TokenType,
  ERC20TokenType,
  ETHTokenType,
  ETHTokenTypeT,
  ERC721TokenTypeT,
  ERC721TokenType,
  EthAddress,
} from "@imtbl/imx-sdk";
import { useEffect, useState } from "react";
import { type } from "os";
require("dotenv").config();

interface InventoryProps {
  client: ImmutableXClient;
  link: Link;
  wallet: string;
}

const Inventory = ({ client, link, wallet }: InventoryProps) => {
  const [inventory, setInventory] =
    useState<ImmutableMethodResults.ImmutableGetAssetsResult>(Object);
  // minting
  const [mintTokenId, setMintTokenId] = useState("");
  const [transferTokenID, setTransferID] = useState("");
  const [transferTokenAddress, settransferTokenAddress] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [mintBlueprint, setMintBlueprint] = useState("");
  const [price, setPrice] = useState("");
  const [priceTokenId, setPriceTokenId] = useState("");
  const [priceTokenAddress, setPriceTokenAddress] = useState("");
  const [mintTokenId2, setMintTokenId2] = useState("");
  const [mintBlueprint2, setMintBlueprint2] = useState("");

  // buying and selling
  // const [sellAmount, setSellAmount] = useState('');
  const [sellTokenId, setSellTokenId] = useState("");
  const [sellTokenAddress, setSellTokenAddress] = useState("");
  const [sellCancelOrder, setSellCancelOrder] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load(): Promise<void> {
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }));
  }
  // async function TransferFromBackend(){
  //   const provider = new ethers.providers.JsonRpcProvider(`https://eth-ropsten.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`);

  //   //if you want to mint on a back end server you can also provide the private key of your wallet directly to the minter.
  //   //Please note: you should never share your private key and so ensure this is only done on a server that is not accessible from the internet
  //   const minterPrivateKey: string = process.env.REACT_APP_MINTER_PK ?? ''; // registered minter for your contract

  //   // @ts-ignore
  //   // const minter = new ethers.providers.Web3Provider(window.ethereum).getSigner(); //get Signature from Metamask wallet

  //   const starkContractAddress: string = process.env.REACT_APP_ROPSTEN_REGISTRATION_ADDRESS ?? '';

  //   await client.transfer({

  //     sender: wallet,
  //         token:
  //           {
  //             type: ERC20TokenType.ERC20,
  //             data: {
  //             tokenAddress:starkContractAddress,
  //             decimals:15,
  //             symbol:'ETH'

  //             },
  //           },

  //        quantity:BigNumber.from(1),
  //        receiver:'0x663BF832e97053D8429fdabBCFeD8D509db8900A',

  //         }
  //     )
  // }

  // async function transfer (){

  //   try{
  //     await link.transfer([
  //       {
  //         type: ERC721TokenType.ERC721,
  //         tokenId: transferTokenID,
  //         tokenAddress:transferTokenAddress,
  //         toAddress:wallet,
  //       }
  //     ])
  //   }
  //   catch(e){
  //     console.log(e)
  //   }

  // }

  async function sell() {
    const data = await link.sell({
      tokenId: sellTokenId,
      tokenAddress: sellTokenAddress,
    });
    console.log(data);
  }

  // set price
  async function sellNFT() {
    const token_address: string = process.env.REACT_APP_TOKEN_ADDRESS ?? "";
    const data = await link.sell({
      amount: "0.00006",
      tokenId: "111",
      tokenAddress: "0x680dfa51b4e9da7f6b99f715e18fbac03500b01b",
    });
    console.log(data);
    // buyNFt()
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }));

    // transfer()
  }
  async function buyNFt() {
    const buy = await link.buy({
      orderIds: ["2005", "2004"],
    });
    console.log(buy);
  }

  // cancel sell order
  async function cancelSell() {
    const data = await link.cancel({
      orderId: sellCancelOrder,
    });
    console.log(data);
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }));
  }

  // helper function to generate random ids
  function random(): number {
    const min = 1;
    const max = 1000000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function createOrder() {
    // const burn = await client.burn({
    //   sender: "0x663bf832e97053d8429fdabbcfed8d509db8900a",
    //   token: {
    //     type: ERC721TokenType.ERC721,
    //     data: {
    //       tokenAddress: "0x680dfa51b4e9da7f6b99f715e18fbac03500b01b",
    //       tokenId: "2009",
    //     },
    //   },
    //   quantity: BigNumber.from(2),
    // });
    // console.log(burn);
    // await client.transfer({
    //   sender: "0x663bf832e97053d8429fdabbcfed8d509db8900a",
    //   token: {
    //     type: ERC721TokenType.ERC721,
    //     data: {
    //       tokenAddress: "0x680dfa51b4e9da7f6b99f715e18fbac03500b01b",
    //       tokenId: "2009",
    //     },
    //   },
    //   quantity: BigNumber.from(2),
    //   receiver: "0x0000000000000000000000000000000000000000",
    // });

    const data = await client.createOrder({
      user: wallet,
      tokenSell: {
        type: ERC721TokenType.ERC721,
        data: {
          tokenAddress: "0x680dfa51b4e9da7f6b99f715e18fbac03500b01b",
          tokenId: "1992",
        },
      },
      amountSell: BigNumber.from(1),

      tokenBuy: {
        type: ETHTokenType.ETH,

        data: {
          decimals: 18,
        },
      },
      amountBuy: BigNumber.from(10000000000000),
    });
    console.log(data);
  }

  // the minting function should be on your backend
  async function mint() {
    // initialise a client with the minter for your NFT smart contract
    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-ropsten.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
    );

    //if you want to mint on a back end server you can also provide the private key of your wallet directly to the minter.
    //Please note: you should never share your private key and so ensure this is only done on a server that is not accessible from the internet
    const minterPrivateKey: string = process.env.REACT_APP_MINTER_PK ?? ""; // registered minter for your contract
    const minter = new ethers.Wallet(minterPrivateKey).connect(provider);

    // @ts-ignore
    // const minter = new ethers.providers.Web3Provider(window.ethereum).getSigner(); //get Signature from Metamask wallet
    const publicApiUrl: string = process.env.REACT_APP_ROPSTEN_ENV_URL ?? "";
    const starkContractAddress: string =
      process.env.REACT_APP_ROPSTEN_STARK_CONTRACT_ADDRESS ?? "";
    const registrationContractAddress: string =
      process.env.REACT_APP_ROPSTEN_REGISTRATION_ADDRESS ?? "";
    const token_address: string = process.env.REACT_APP_TOKEN_ADDRESS ?? "";
    try {
      const minterClient = await ImmutableXClient.build({
        publicApiUrl,
        signer: minter,
        starkContractAddress,
        registrationContractAddress,
      });

      // await minterClient.mintF({
      //   etherKey: minterClient.address,

      //       tokens: [
      //         {
      //           type: MintableERC721TokenType.MINTABLE_ERC721,
      //           data: {
      //             id: mintTokenId, // this is the ERC721 token id
      //             blueprint: mintBlueprint, // this is passed to your smart contract at time of withdrawal from L2
      //             tokenAddress: token_address.toLowerCase(),

      //           },
      //         },
      //       ],
      //       nonce: random().toString(10),
      //       authSignature: '',
      // })
      // mint any number of NFTs to specified wallet address (must be registered on Immutable X first)
      // contract registered by Immutable
      // const privKey1 = Buffer.from(minterPrivateKey, '').toString()

      const result = await minterClient.mint({
        mints: [
          {
            etherKey: wallet,

            tokens: [
              {
                type: MintableERC721TokenType.MINTABLE_ERC721,
                data: {
                  id: mintTokenId, // this is the ERC721 token id
                  blueprint: "metadata", // this is passed to your smart contract at time of withdrawal from L2
                  tokenAddress: "0x680dfa51b4e9da7f6b99f715e18fbac03500b01b",
                },
              },
            ],
            nonce: random().toString(10),
            authSignature: "",
          },
        ],
      });

      console.log(`Token minted: ${result.results[0].token_id}`);
      console.log(result.results[0]);
      console.log(minterClient.address);

      setInventory(await client.getAssets({ user: wallet, sell_orders: true }));
    } catch (error) {
      console.log(error);
    }
    // sellNFT()
  }

  async function mint2() {
    // initialise a client with the minter for your NFT smart contract
    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-ropsten.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
    );

    //if you want to mint on a back end server you can also provide the private key of your wallet directly to the minter.
    //Please note: you should never share your private key and so ensure this is only done on a server that is not accessible from the internet
    const minterPrivateKey: string = process.env.REACT_APP_MINTER_PK ?? ""; // registered minter for your contract
    const minter = new ethers.Wallet(minterPrivateKey).connect(provider);

    // @ts-ignore
    // const minter = new ethers.providers.Web3Provider(window.ethereum).getSigner(); //get Signature from Metamask wallet
    const publicApiUrl: string = process.env.REACT_APP_ROPSTEN_ENV_URL ?? "";
    const starkContractAddress: string =
      process.env.REACT_APP_ROPSTEN_STARK_CONTRACT_ADDRESS ?? "";
    const registrationContractAddress: string =
      process.env.REACT_APP_ROPSTEN_REGISTRATION_ADDRESS ?? "";
    const token_address: string = process.env.REACT_APP_TOKEN_ADDRESS ?? "";
    try {
      const minterClient = await ImmutableXClient.build({
        publicApiUrl,
        signer: minter,

        starkContractAddress,
        registrationContractAddress,
      });

      const result = await minterClient.mintF({
        mints: [
          {
            etherKey: minterClient.address,

            tokens: [
              {
                type: MintableERC721TokenType.MINTABLE_ERC721,
                data: {
                  id: mintTokenId, // this is the ERC721 token id
                  blueprint: mintBlueprint, // this is passed to your smart contract at time of withdrawal from L2
                  tokenAddress: token_address.toLowerCase(),
                },
              },
            ],
            //@ts-ignore
            nonce: random().toString(10),
            authSignature: "",
          },
        ],
      });

      console.log(`Token minted: ${result}`);
      console.log(result);

      setInventory(await client.getAssets({ user: wallet, sell_orders: true }));
    } catch (error) {
      console.log(error);
    }
    // sellNFT()
  }

  // async function mintv2() {
  //   // initialise a client with the minter for your NFT smart contract
  //   const provider = new ethers.providers.JsonRpcProvider(`https://eth-ropsten.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`);

  //   /**
  //   //if you want to mint on a back end server you can also provide the private key of your wallet directly to the minter.
  //   //Please note: you should never share your private key and so ensure this is only done on a server that is not accessible from the internet
  //   const minterPrivateKey: string = process.env.REACT_APP_MINTER_PK ?? ''; // registered minter for your contract
  //   const minter = new ethers.Wallet(minterPrivateKey).connect(provider);
  //   **/
  //   // @ts-ignore
  //   const minter = new ethers.providers.Web3Provider(window.ethereum).getSigner(); //get Signature from Metamask wallet
  //   const publicApiUrl: string = process.env.REACT_APP_ROPSTEN_ENV_URL ?? '';
  //   const starkContractAddress: string = process.env.REACT_APP_ROPSTEN_STARK_CONTRACT_ADDRESS ?? '';
  //   const registrationContractAddress: string = process.env.REACT_APP_ROPSTEN_REGISTRATION_ADDRESS ?? '';
  //   const minterClient = await ImmutableXClient.build({
  //     publicApiUrl,
  //     signer: minter,
  //     starkContractAddress,
  //     registrationContractAddress,
  //   });

  //   // mint any number of NFTs to specified wallet address (must be registered on Immutable X first)
  //   const token_address: string = process.env.REACT_APP_TOKEN_ADDRESS ?? ''; // contract registered by Immutable
  //   const royaltyRecieverAddress: string = process.env.REACT_APP_ROYALTY_ADDRESS ?? '';
  //   const tokenReceiverAddress: string = process.env.REACT_APP_TOKEN_RECEIVER_ADDRESS ?? '';
  //   const result = await minterClient.mintV2([
  //     {
  //       users: [
  //         {
  //           etherKey: tokenReceiverAddress.toLowerCase(),
  //           tokens: [
  //             {
  //               id: mintTokenIdv2,
  //               blueprint: mintBlueprint,
  //               // overriding royalties for specific token
  //               royalties: [
  //                 {
  //                   recipient: tokenReceiverAddress.toLowerCase(),
  //                   percentage: 3.5,
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //       contractAddress: token_address.toLowerCase(),

  //       // globally set royalties
  //       royalties: [
  //         {
  //           recipient: tokenReceiverAddress.toLowerCase(),
  //           percentage: 4.0,
  //         },
  //       ],
  //     },
  //   ]);
  //   console.log(`Token minted: ${result}`);
  //   setInventory(await client.getAssets({ user: wallet, sell_orders: true }));
  // }

  return (
    <div>
      <div>
        Mint NFT:
        <br />
        <label>
          Token ID:
          <input
            type="text"
            value={mintTokenId}
            onChange={(e) => setMintTokenId(e.target.value)}
          />
        </label>
        <label>
          Blueprint:
          <input
            type="text"
            value={mintBlueprint}
            onChange={(e) => setMintBlueprint(e.target.value)}
          />
        </label>
        <button onClick={mint}>Mint</button>
        <button onClick={createOrder}>Create Order</button>
      </div>
      {""}
      <br />
      <div>
        MintF:
        <br />
        <label>
          Token ID:
          <input
            type="text"
            value={mintTokenId2}
            onChange={(e) => setMintTokenId2(e.target.value)}
          />
        </label>
        <label>
          Blueprint:
          <input
            type="text"
            value={mintBlueprint2}
            onChange={(e) => setMintBlueprint2(e.target.value)}
          />
        </label>
        <button onClick={mint2}>Mint2</button>
      </div>
      {""}
      <br />

      <div>
        Sell NFT:
        <br />
        <label>
          Token ID:
          <input
            type="text"
            value={sellTokenId}
            onChange={(e) => setSellTokenId(e.target.value)}
          />
        </label>
        <label>
          Token Address:
          <input
            type="text"
            value={sellTokenAddress}
            onChange={(e) => setSellTokenAddress(e.target.value)}
          />
        </label>
        <button onClick={sell}>Sell NFT</button>
      </div>

      {""}
      <br />
      <div>
        Transfer NFT:
        <br />
        <label>
          Token ID:
          <input
            type="text"
            value={transferTokenID}
            onChange={(e) => setTransferID(e.target.value)}
          />
        </label>
        <label>
          Token Address:
          <input
            type="text"
            value={transferTokenAddress}
            onChange={(e) => settransferTokenAddress(e.target.value)}
          />
        </label>
        <label>
          To Address:
          <input
            type="text"
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
          />
        </label>
        {/*       
        <button onClick={}>Sell NFT</button> */}
      </div>

      {""}
      <br />

      {/* <div>
        MintV2 - with Royalties NFT:
        <br />
        <label>
          Token ID:
          <input type="text" value={mintTokenIdv2} onChange={e => setMintTokenIdv2(e.target.value)} />
        </label>
        <label>
          Blueprint:
          <input type="text" value={mintBlueprintv2} onChange={e => setMintBlueprintv2(e.target.value)} />
        </label>
        <button onClick={mintv2}>MintV2</button>
      </div> */}
      <br />
      <div>
        Set asset Price:
        <br />
        <label>
          Amount (ETH):
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Token ID:
          <input
            type="text"
            value={priceTokenId}
            onChange={(e) => setPriceTokenId(e.target.value)}
          />
        </label>
        <label>
          Token Address:
          <input
            type="text"
            value={priceTokenAddress}
            onChange={(e) => setPriceTokenAddress(e.target.value)}
          />
        </label>
        <button onClick={sellNFT}>Set Price</button>
      </div>
      <br />
      <div>
        Cancel sell order:
        <br />
        <label>
          Order ID:
          <input
            type="text"
            value={sellCancelOrder}
            onChange={(e) => setSellCancelOrder(e.target.value)}
          />
        </label>
        <button onClick={cancelSell}>Cancel</button>
      </div>
      <br />
      <br />
      <br />
      <div>
        Inventory:
        {JSON.stringify(inventory.result)}
      </div>
    </div>
  );
};

export default Inventory;
