import { SiteAlert } from '../lib/SiteAlert';

const siteAlerts = document.querySelectorAll<HTMLElement>('[data-js-alert-banner]');
siteAlerts.forEach( (alert) => {
  const closeElement = alert.querySelector<HTMLElement>('[data-js-alert-close]');

  if (!closeElement) {
    return;
  }

  new SiteAlert(alert, {
    closeElement: closeElement,
    cookieExpiry: 7,
    cookieId: 'alert',
  });
});
