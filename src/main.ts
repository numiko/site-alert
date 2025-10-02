import { SiteAlert } from '../lib/SiteAlert';

const siteAlerts = document.querySelectorAll('[data-js-alert-banner]');
siteAlerts.forEach( (alert) => {
  new SiteAlert(alert, {
    closeElement: alert.querySelector('[data-js-alert-close]'),
    cookieExpiry: 7,
  });
});
