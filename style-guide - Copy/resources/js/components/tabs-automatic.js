  window.addEventListener("DOMContentLoaded", function load(event){
  'use strict';

  //automatic tabs code
  class TabsAutomatic {
    constructor(groupNode) {
      this.tablistNode = groupNode;

      this.tabs = [];

      this.firstTab = null;
      this.lastTab = null;

      this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
      this.tabpanels = [];

      for (var i = 0; i < this.tabs.length; i += 1) {
        var tab = this.tabs[i];
        var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

        tab.tabIndex = -1;
        tab.setAttribute('aria-selected', 'false');
        this.tabpanels.push(tabpanel);

        tab.addEventListener('keydown', this.onKeydown.bind(this));
        tab.addEventListener('click', this.onClick.bind(this));

        if (!this.firstTab) {
          this.firstTab = tab;
        }
        this.lastTab = tab;
      }

      this.setSelectedTab(this.firstTab, false);
    }

    setSelectedTab(currentTab, interaction = false, setFocus) {
      if (typeof setFocus !== 'boolean') {
        setFocus = true;
      }
      for (var i = 0; i < this.tabs.length; i += 1) {
        var tab = this.tabs[i];
        if (currentTab === tab) {
          tab.setAttribute('aria-selected', 'true');
          tab.removeAttribute('tabindex');
          this.tabpanels[i].classList.remove('is-hidden');
    
          if (interaction === true) {
            if (setFocus) {
              tab.focus();
            }
          }
        } else {
          tab.setAttribute('aria-selected', 'false');
          tab.tabIndex = -1;
          this.tabpanels[i].classList.add('is-hidden');
        }
      }
    }

    setSelectedToPreviousTab(currentTab, interaction=false) {
      var index;

      if (currentTab === this.firstTab) {
        this.setSelectedTab(this.lastTab, true);
      } else {
        index = this.tabs.indexOf(currentTab);
        this.setSelectedTab(this.tabs[index - 1], true);
      }
    }

    setSelectedToNextTab(currentTab, interaction=false) {
      var index;

      if (currentTab === this.lastTab) {
        this.setSelectedTab(this.firstTab, true);
      } else {
        index = this.tabs.indexOf(currentTab);
        this.setSelectedTab(this.tabs[index + 1], true);
      }
    }

    /* EVENT HANDLERS */

    onKeydown(event) {
      var tgt = event.currentTarget,
        flag = false;

      switch (event.key) {
        case 'ArrowLeft':
          this.setSelectedToPreviousTab(tgt, true);
          flag = true;
          break;

        case 'ArrowRight':
          this.setSelectedToNextTab(tgt, true);
          flag = true;
          break;

        case 'Home':
          this.setSelectedTab(this.firstTab, true);
          flag = true;
          break;

        case 'End':
          this.setSelectedTab(this.lastTab, true);
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    onClick(event) {
      this.setSelectedTab(event.currentTarget, true);
    }
  }

  // Initialize tablist
  window.addEventListener('load', function () {
    var tablists = document.querySelectorAll('[role=tablist].automatic');
    for (var i = 0; i < tablists.length; i++) {
      new TabsAutomatic(tablists[i]);
    }
  });

  //mobile accordion code
  class Accordion {
    constructor(domNode) {
      this.rootEl = domNode;
      this.buttonEl = this.rootEl.querySelector('h3.accordion-title-outer > button[aria-expanded]');

      const controlsId = this.buttonEl.getAttribute('aria-controls');
      this.contentEl = document.getElementById(controlsId);

      this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';

      // add event listeners
      this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
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
      this.buttonEl.setAttribute('aria-expanded', `${open}`);
      if (open) {
        let panelID = this.buttonEl.getAttribute('aria-controls');
        let panel = document.getElementById(panelID);
        $(panel).slideDown();
        panel.classList.add("accordion-open");
        this.contentEl.removeAttribute('hidden');
        
        let accordionSectionTitle = this.buttonEl.getAttribute('accordion-section-title');
        let accordionTitle = this.buttonEl.getAttribute('accordion-title');

        const dataToPush = {
          'component_title': accordionTitle,
          'section_name': accordionSectionTitle, 
        };
        
        if (panel.parentNode.classList.contains('tab-container-mobile')){
          // this is a tab displaying as an accordion on mobile devices
          dataToPush["event"] = 'open_tab';
        } else {
          dataToPush["event"] = 'open_accordion';
        };
      } else {
        this.buttonEl.classList.remove("accordion-open");
        let panelID = this.buttonEl.getAttribute('aria-controls');
        let panel = document.getElementById(panelID);
        $(panel).slideUp();
        panel.classList.remove("accordion-open");
        this.contentEl.setAttribute('hidden', '');
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
  const accordions = document.querySelectorAll('.accordion h3.accordion-title-outer');
  accordions.forEach((accordionEl) => {
    new Accordion(accordionEl);
  });

},false);