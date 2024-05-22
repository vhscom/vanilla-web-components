customElements.define(
  "pico-fab",
  class extends HTMLElement {
    static observedAttributes = ["autospin", "autostart", "model"];

    constructor() {
      super()
        .attachShadow({ mode: "open" })
        .append(document.getElementById(this.nodeName).content.cloneNode(true));
    }

    /** @param {HTMLIFrameElement} iframe - fab container */
    _updateIframeSrc(iframe) {
      const attrs = {
        autospin: this.getAttribute("autospin"),
        autostart: this.getAttribute("autostart"),
        model: this.getAttribute("model"),
      };
      if (!attrs.model) return;
      const queryParams = new URLSearchParams({
        autospin: attrs.autospin !== null ? "1" : "",
        autostart: attrs.autostart !== null ? "1" : "",
        camera: "0",
        dnt: "1",
      });
      const url = `https://sketchfab.com/models/${
        attrs.model
      }/embed?${queryParams.toString()}`;
      console.log(url);
      iframe.src = url;
    }

    connectedCallback() {
      const iframe = this.shadowRoot.querySelector("iframe");
      this._updateIframeSrc(iframe);
    }
  }
);
