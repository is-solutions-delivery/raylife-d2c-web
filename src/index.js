import React from "react";
import ReactDOM from "react-dom";
import { StyleSheetManager } from "styled-components";

import { App } from "./App";
import { Providers } from "./Providers";

const TAG_NAME = "d2c-web";

class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.styleHost = document.createElement("div");
    this.mountPoint = document.createElement("div");
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this.styleHost);
    this.shadowRoot.appendChild(this.mountPoint);

    ReactDOM.render(
      <StyleSheetManager target={this.styleHost} disableCSSOMInjection>
        <Providers>
          <App />
        </Providers>
      </StyleSheetManager>,
      this.mountPoint
    );
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, WebComponent);
}
