import { SiteAlert } from '../lib/SiteAlert';

const siteAlerts = document.querySelectorAll('[data-js-alert-banner]');
siteAlerts.forEach( (alert) => {
  new SiteAlert(alert);
});
