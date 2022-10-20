import _merge from 'lodash/merge';

let closedSiteAlertIds = [];

class SiteAlerts {

  constructor(alerts, options) {

    // Defaults
    const defaults = {
      closeButton: '[data-js-alert-close]'
    }

    // Merge defaults with options - using lodash merge as we're using nested objects
    let opts = _merge(defaults, options);

    // Properties
    this.alerts = typeof alerts === 'undefined' ? document.querySelectorAll('[data-js-alert]') : typeof alerts === 'string' ? document.querySelectorAll(alerts) : alerts;
    this.closeButton = typeof opts.closeButton === 'string' ? document.querySelectorAll(opts.closeButton) : opts.closeButton;
  }

  /**
 * Check local storage for the ids of alerts which have been closed/accpeted
 */
  checkSessionStorage() {

    if(sessionStorage.numiko_site_alerts) {
      closedSiteAlertIds = JSON.parse(sessionStorage.numiko_site_alerts);

      /**
       * Loop through the ids of the closed alerts in session storage
       * and show any alerts on the page that dont match those ids.
       */
      closedSiteAlertIds.forEach( (id) => {
        this.alerts = Array.from(this.alerts).filter( (alert) => {
          return alert.dataset.jsAlert != id;
        })
      });
    }

    this.alerts.forEach( (alert) => {
      alert.style.display = "block";
    })
  }

  listeners() {
    this.closeButton.forEach( (el) => {
      el.addEventListener('click' , (e) => {
        let alert = e.currentTarget.closest("[data-js-alert]");
        closedSiteAlertIds.push(alert.dataset.jsAlert);
        sessionStorage.numiko_site_alerts = JSON.stringify(closedSiteAlertIds);
        alert.style.display = 'none';
      })
    })

  }

  init() {
    this.checkSessionStorage();
    this.listeners();
  }
}

export { SiteAlerts as default }
