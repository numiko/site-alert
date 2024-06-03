import gsap from 'gsap';
import Cookies from 'js-cookie';

class SiteAlert {

  constructor(alert, options = {}) {
    this.alert = typeof alert === 'string' ? document.querySelector(alert) : alert;
    this.cookiePrefix = options.cookiePrefix || 'alert';
    this.cookieExpiryInDays = options.cookieExpiry || 7;

    this.alertBannerState();
  }

  alertBannerState() {
    if (!this.alert) return;
    const closeButton = this.alert.querySelector('[data-js-alert-close]');
    const alertId = this.alert.dataset.jsAlertId;
    const updated = this.alert.dataset.jsAlertBannerUpdated;
    const cookieName = `${this.cookiePrefix}_${alertId}_${updated}`;
    const cookieValue = Cookies.get(cookieName);
    if (typeof cookieValue === 'undefined' || typeof(alertId) === 'undefined') {
      this.alert.classList.remove('hidden');
      gsap.set(this.alert, {
        display: 'flex',
        y: 50,
      });
      gsap.to(this.alert, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.75,
      });
    }
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof(alertId) !== 'undefined') {
        Cookies.set(cookieName, true, { expires: this.cookieExpiryInDays });
      }
      gsap.to(this.alert, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          this.alert.remove();
        }
      });
    });
  }
}

export { SiteAlert };
