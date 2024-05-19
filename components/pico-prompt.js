customElements.define(
  "pico-prompt",
  class extends HTMLElement {
    static observedAttributes = ["placeholder", "value", "disabled"];
    constructor() {
      super()
        .attachShadow({ mode: "open" })
        .append(document.getElementById(this.nodeName).content.cloneNode(true));
    }

    updateWordCount() {
      const textarea = this.shadowRoot.querySelector("textarea");
      const countWords = (str) => {
        if (typeof str !== "string" || !str.trim()) {
          return 0;
        }
        return str.trim().split(/\s+/).length;
      };
      const remaining = 75 - countWords(textarea.value);
      this.shadowRoot.querySelector(
        "small"
      ).textContent = `${remaining} of 75 tokens remaining`;
      if (remaining < 0) {
        textarea.setAttribute("aria-invalid", "true");
      } else if (remaining !== 75) {
        textarea.setAttribute("aria-invalid", "false");
      } else {
        textarea.removeAttribute("aria-invalid");
      }
      this.setAttribute("value", textarea.value);
    }

    connectedCallback() {
      const label = this.shadowRoot.querySelector("label");
      const textarea = this.shadowRoot.querySelector("textarea");
      if (!textarea) {
        return;
      }

      label.addEventListener("click", () => {
        textarea.focus();
      });

      const debounce = (callback, waitTime, leading = false) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          if (leading && !timer) {
            callback(...args);
          }
          timer = setTimeout(() => {
            callback(...args);
          }, waitTime);
        };
      };
      const cb = this.updateWordCount.bind(this); // bind this to the callback
      const debouncedWithLeading = debounce(cb, 100, true);
      textarea.addEventListener("input", debouncedWithLeading);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      const textarea = this.shadowRoot.querySelector("textarea");
      if (name === "placeholder") {
        textarea.placeholder = newValue;
      }
      if (name === "value") {
        textarea.value = newValue;
        this.updateWordCount();
      }
      if (name === "disabled") {
        textarea.disabled = newValue;
      }
    }

    focus() {
      this.shadowRoot.querySelector("textarea").focus();
    }
  }
);
