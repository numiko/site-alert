import gsap from 'gsap';
import Cookies from 'js-cookie';

class SiteAlert {

  constructor(alert, options = {}) {
    this.alert = typeof alert === 'string' ? document.querySelector(alert) : alert;
    this.closeElement = typeof alert === 'string' ? document.querySelector('options.closeElement') : options.closeElement;
    this.id = options.id || this.alert?.dataset.jsAlertId;
    this.cookiePrefix = options.cookiePrefix || 'site_alert';
    this.cookieExpiryInDays = options.cookieExpiry || 7;

    this.init();
  }

  getCookieName() {
    return `${this.cookiePrefix}_${this.id}`;
  }

  cookieExists() {
    return Cookies.get(this.getCookieName());
  }

  setCookie() {
    Cookies.set(this.getCookieName(), true, { expires: this.cookieExpiryInDays });
  }

  showAlert() {
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

  removeAlert() {
    this.alert.remove();
  }

  addEventListeners() {
    this.closeElement.addEventListener('click', (e) => {
      e.preventDefault();

      if (!this.cookieExists()) {
        this.setCookie();
      }

      gsap.to(this.alert, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          this.removeAlert();
        }
      });
    });
  }

  init() {
    if (!this.alert) return;

    if (this.cookieExists()) {
      this.removeAlert();
    } else {
      this.showAlert();
      this.addEventListeners();
    }

  }
}

export { SiteAlert };
