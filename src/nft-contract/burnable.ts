import { Contract, NFT_METADATA_SPEC, NFT_STANDARD_NAME } from "./index";
import { assert, near, UnorderedSet } from "near-sdk-js";
import { Token } from "./metadata";
import { restoreOwners, internalRemoveTokenFromOwner } from "./internal";

export function internalBurnToken(contract: Contract, tokenId: string) {
  // get the token from the token ID
  let token = contract.tokensById.get(tokenId) as Token;
  if (token == null) {
    near.panic("no token");
  }

  // get the owner of the token
  let owner = token.owner_id;
  // only token onwers can burn tokens
  assert(owner == near.predecessorAccountId(), "only owner can burn token");

  // remove the token from the tokens by ID collection
  contract.tokensById.remove(tokenId);

  contract.tokenMetadataById.remove(tokenId);

  internalRemoveTokenFromOwner(contract, owner, tokenId);
}
