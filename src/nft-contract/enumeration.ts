// @ts-nocheck
import { near, UnorderedSet } from "near-sdk-js";
import { Contract, NFT_METADATA_SPEC, NFT_STANDARD_NAME } from ".";
import { restoreOwners } from "./internals";
import { JsonToken } from "./metadata";
import { internalNftToken } from "./nft_core";

//Query for the total supply of NFTs on the contract
export function internalTotalSupply(
    contract: Contract
): number {
    /*
        FILL THIS IN
    */
}

//Query for nft tokens on the contract regardless of the owner using pagination
export function internalNftTokens(
    contract: Contract, 
    fromIndex: number | null = 0, 
    limit: number | null = 50
): JsonToken[] {
    /*
        FILL THIS IN
    */
}

//get the total supply of NFTs for a given owner
export function internalSupplyForOwner(contract, accountId): number {
    /*
        FILL THIS IN
    */
}

//Query for all the tokens for an owner
export function internalTokensForOwner(contract: Contract, accountId: string, fromIndex, limit): JsonToken[] {
    /*
        FILL THIS IN
    */
}