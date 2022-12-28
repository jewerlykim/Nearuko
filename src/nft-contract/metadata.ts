// @ts-nocheck
import { Contract } from ".";
import { near } from "near-sdk-js";

//defines the payout type we'll be returning as a part of the royalty standards.
export class Payout {
  payout: { [accountId: string]: bigint };
  constructor({ payout }: { payout: { [accountId: string]: bigint } }) {
    this.payout = payout;
  }
}

export class NFTContractMetadata {
  spec: string;
  name: string;
  symbol: string;
  icon?: string;
  base_uri?: string;
  reference?: string;
  reference_hash?: string;

  constructor({
    spec,
    name,
    symbol,
    icon,
    base_uri,
    reference,
    reference_hash,
  }: {
    spec: string;
    name: string;
    symbol: string;
    icon?: string;
    base_uri?: string;
    reference?: string;
    reference_hash?: string;
  }) {
    this.spec = spec;
    this.name = name;
    this.symbol = symbol;
    this.icon = icon;
    this.base_uri = base_uri;
    this.reference = reference;
    this.reference_hash = reference_hash;
  }
}

export class TokenMetadata {
  title?: string;
  description?: string;
  media?: string;
  media_hash?: string;
  copies?: number;
  issued_at?: string;
  expires_at?: string;
  starts_at?: string;
  updated_at?: string;
  extra?: string;
  reference?: string;
  reference_hash?: string;

  constructor({
    title,
    description,
    media,
    media_hash,
    copies,
    issued_at,
    expires_at,
    starts_at,
    updated_at,
    extra,
    reference,
    reference_hash,
  }: {
    title?: string;
    description?: string;
    media?: string;
    media_hash?: string;
    copies?: number;
    issued_at?: string;
    expires_at?: string;
    starts_at?: string;
    updated_at?: string;
    extra?: string;
    reference?: string;
    reference_hash?: string;
  }) {
    this.title = title;
    this.description = description;
    this.media = media;
    this.media_hash = media_hash;
    this.copies = copies; // number of copies of this set of metadata in existence when token was minted.
    this.issued_at = issued_at; // ISO 8601 datetime when token was issued or minted
    this.expires_at = expires_at;
    this.starts_at = starts_at; // ISO 8601 datetime when token starts being valid
    this.updated_at = updated_at;
    this.extra = extra; // anything extra the NFT wants to store on-chain. Can be stringified JSON.
    this.reference = reference;
    this.reference_hash = reference_hash;
  }
}

export class Token {
  owner_id: string;
  approved_account_ids: { [accountId: string]: number };
  next_approval_id: number;
  royalty: { [accountId: string]: number };

  constructor({
    ownerId,
    approvedAccountIds,
    nextApprovalId,
    royalty,
  }: {
    ownerId: string;
    approvedAccountIds: { [accountId: string]: number };
    nextApprovalId: number;
    royalty: { [accountId: string]: number };
  }) {
    //owner of the token
    this.owner_id = ownerId;
    //list of approved account IDs that have access to transfer the token. This maps an account ID to an approval ID
    this.approved_account_ids = approvedAccountIds;
    //the next approval ID to give out.
    this.next_approval_id = nextApprovalId;
    // keep track of the royalty percentages for the token in a hash map
    this.royalty = royalty;
  }
}

//The Json token is what will be returned from view calls.
export class JsonToken {
  token_id: string;
  owner_id: string;
  metadata: TokenMetadata;
  approved_account_ids: { [accountId: string]: number };
  royalty: { [accountId: string]: number };

  constructor({
    tokenId,
    ownerId,
    metadata,
    approvedAccountIds,
    royalty,
  }: {
    tokenId: string;
    ownerId: string;
    metadata: TokenMetadata;
    approvedAccountIds: { [accountId: string]: number };
    royalty: { [accountId: string]: number };
  }) {
    //token ID
    this.token_id = tokenId;
    //owner of the token
    this.owner_id = ownerId;
    //token metadata
    this.metadata = metadata;
    //list of approved account IDs that have access to transfer the token. This maps an account ID to an approval ID
    this.approved_account_ids = approvedAccountIds;
    // keep track of the royalty percentages for the token in a hash map
    this.royalty = royalty;
  }
}

//get the information for a specific token ID
export function internalNftMetadata({
  contract,
}: {
  contract: Contract;
}): NFTContractMetadata {
  near.log("internalNftMetadata", contract);
  near.log("internalNftMetadata", contract.metadata);
  return contract.metadata;
}
