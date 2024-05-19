customElements.define(
  "pico-dialog",
  class extends HTMLElement {
    static observedAttributes = ["open"];

    constructor() {
      super()
        .attachShadow({ mode: "open" })
        .append(document.getElementById(this.nodeName).content.cloneNode(true));
    }

    connectedCallback() {
      const dialog = this.shadowRoot.querySelector("dialog");
      const button = this.shadowRoot.querySelector("button");

      dialog.addEventListener("click", () => {
        dialog.close();
      });
      button.addEventListener("click", () => {
        dialog.close();
      });
      button.focus();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      if (name === "open") {
        this.shadowRoot.querySelector("dialog").open = newValue !== null;
      }
    }

    show() {
      this.shadowRoot.querySelector("dialog").showModal();
    }

    hide() {
      this.shadowRoot.querySelector("dialog").close();
    }
  }
);
