import { Component, State } from "@stencil/core";

import componentWillLoad from "./src/components/stellar-wallet/events/componentWillLoad";
import render from "./src/components/stellar-wallet/events/render";

import createAccount from "./src/components/stellar-wallet/methods/createAccount";
import copyAddress from "./src/components/stellar-wallet/methods/copyAddress";
import copySecret from "./src/components/stellar-wallet/methods/copySecret";
import signOut from "./src/components/stellar-wallet/methods/signOut";
import setPrompt from "./src/components/stellar-wallet/methods/setPrompt";

import { Prompter } from "@stellar-prompt/stellar-prompt";

interface StellarAccount {
  publicKey: string;
  keystore: string;
}

@Component({
  tag: "stellar-wallet",
  styleUrl: "stellar-wallet.scss",
  shadow: true,
})
export class Wallet {
  @State() account: StellarAccount;
  @State() prompter: Prompter = { show: false };
  @State() error: any = null;

  // Component events
  componentWillLoad() {}
  render() {}

  // Stellar methods
  createAccount = createAccount;
  copyAddress = copyAddress;
  copySecret = copySecret;
  signOut = signOut;

  // Misc methods
  setPrompt = setPrompt;
}

Wallet.prototype.componentWillLoad = componentWillLoad;
Wallet.prototype.render = render;

