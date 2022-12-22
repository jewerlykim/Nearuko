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
  constructor({ ownerId }: { ownerId: string }) {
    this.owner_id = ownerId;
  }
}

//The Json token is what will be returned from view calls.
export class JsonToken {
  token_id: string;
  owner_id: string;
  metadata: TokenMetadata;
  constructor({
    token_id,
    owner_id,
    metadata,
  }: {
    token_id: string;
    owner_id: string;
    metadata: TokenMetadata;
  }) {
    this.token_id = token_id;
    this.owner_id = owner_id;
    this.metadata = metadata;
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
