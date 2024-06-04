import { SiteAlert } from '../lib/SiteAlert';

const siteAlerts = document.querySelectorAll('[data-js-alert-banner]');
siteAlerts.forEach( (alert) => {
  new SiteAlert(alert, {
    id: alert.dataset.jsAlertId,
    closeElement: alert.querySelector('[data-js-alert-close]'),
    cookiePrefix: 'site_alert',
    cookieExpiry: 7,
  });
});
