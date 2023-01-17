// @ts-nocheck
import { assert, near } from "near-sdk-js";
import { Contract, NFT_METADATA_SPEC, NFT_STANDARD_NAME } from ".";

export function internalTransferOwnership({
  newOwner,
  contract,
}: {
  newOwner: string;
  contract: Contract;
}): void {
  assertOwner({ contract });
  let predecessor = near.predecessorAccountId();
  let oldOwner = contract.owner_id;
  contract.owner_id = newOwner;

  let transferOwnerEventLog = {
    // Standard name ("nep171").
    standard: NFT_STANDARD_NAME,
    // Version of the standard ("nft-1.0.0").
    version: NFT_METADATA_SPEC,
    // The data related with the event stored in a vector.
    event: "nft_transfer_owner",
    data: [
      {
        // The optional authorized account ID to transfer the token on behalf of the old owner.
        predecessor_id: predecessor,
        // The old owner's account ID.
        old_owner_id: oldOwner,
        // The account ID of the new owner of the token.
        new_owner_id: newOwner,
      },
    ],
  };

  // Log the serialized json.
  near.log(`EVENT_JSON:${JSON.stringify(transferOwnerEventLog)}`);
}

export function assertOwner({ contract }: { contract: Contract }): void {
  assert(
    near.predecessorAccountId() == contract.owner_id,
    "Only owner can call this method"
  );
}
