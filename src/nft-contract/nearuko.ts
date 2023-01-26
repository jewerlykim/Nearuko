// @ts-nocheck
import { Contract } from ".";
import { NearBindgen, view } from "near-sdk-js";
import { NFTContractMetadata } from "./metadata";

@NearBindgen
export class Nearuko extends Contract {
  constructor() {
    super();
  }

  @view
  getOwner(): string {
    return this.owner_id;
  }

  @view
  nft_metadata() {
    return super.nft_metadata();
  }
}
