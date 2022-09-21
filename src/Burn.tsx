import {
  ERC721TokenType,
  ImmutableXClient,
  Link,
  MintableERC721TokenType,
} from "@imtbl/imx-sdk";
import { useState } from "react";

interface BurnProps {
  client: ImmutableXClient;
  wallet: string;
  link: Link;
}

const Burn = ({ link }: BurnProps) => {
  const [tokenId, setTokenId] = useState("");
  const [burnRes, setBurnRes] = useState("");

  const burn = async () => {
    const token_address: string = process.env.REACT_APP_TOKEN_ADDRESS ?? ""; // contract registered by Immutable

    const transferResponsePayload = await link.transfer([
      {
        type: ERC721TokenType.ERC721,
        tokenId: tokenId,
        tokenAddress: token_address,
        toAddress: "0x0000000000000000000000000000000000000000",
      },
    ]);

    setBurnRes(JSON.stringify(transferResponsePayload));
  };

  return (
    <div>
      <label>
        Token ID:
        <input type="text" onChange={(e) => setTokenId(e.target.value)} />
      </label>
      <button onClick={burn}>Burn</button>
      <br />
      <br />
      <div>{burnRes}</div>
    </div>
  );
};

export default Burn;
