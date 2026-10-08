window.addEventListener(
  "DOMContentLoaded",
  function load(event) {
    "use strict";

    class Accordion {
      constructor(domNode) {
        this.rootEl = domNode;
        this.buttonEl = this.rootEl.querySelector(
          "h3.accordion-title-outer > button[aria-expanded]",
        );

        const controlsId = this.buttonEl.getAttribute("aria-controls");
        this.contentEl = document.getElementById(controlsId);

        this.open = this.buttonEl.getAttribute("aria-expanded") === "true";

        // add event listeners
        this.buttonEl.addEventListener("click", this.onButtonClick.bind(this));
      }

      onButtonClick() {
        this.toggle(!this.open);
      }

      toggle(open) {
        // don't do anything if the open state doesn't change
        if (open === this.open) {
          return;
        }

        // update the internal state
        this.open = open;

        // handle DOM updates
        this.buttonEl.setAttribute("aria-expanded", `${open}`);
        if (open) {
          let panelID = this.buttonEl.getAttribute("aria-controls");
          let panel = document.getElementById(panelID);
          $(panel).slideDown();
          panel.classList.add("accordion-open");
          this.contentEl.removeAttribute("hidden");

          let accordionSectionTitle = this.buttonEl.getAttribute(
            "accordion-section-title",
          );
          let accordionTitle = this.buttonEl.getAttribute("accordion-title");

          const dataToPush = {
            component_title: accordionTitle,
            section_name: accordionSectionTitle,
          };

          if (panel.parentNode.classList.contains("tab-container-mobile")) {
            // this is a tab displaying as an accordion on mobile devices
            dataToPush["event"] = "open_tab";
          } else {
            dataToPush["event"] = "open_accordion";
          }
        } else {
          this.buttonEl.classList.remove("accordion-open");
          let panelID = this.buttonEl.getAttribute("aria-controls");
          let panel = document.getElementById(panelID);
          $(panel).slideUp();
          panel.classList.remove("accordion-open");
          this.contentEl.setAttribute("hidden", "");
        }
      }

      // Add public open and close methods for convenience
      open() {
        this.toggle(true);
      }

      close() {
        this.toggle(false);
      }
    }

    // init accordions
    const accordions = document.querySelectorAll(
      ".accordion h3.accordion-title-outer",
    );
    accordions.forEach((accordionEl) => {
      new Accordion(accordionEl);
    });
  },
  false,
);
