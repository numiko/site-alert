import gsap from 'gsap';
import Cookies from 'js-cookie';

class SiteAlert {

  /**
   *
   * @param {HTMLElement|string} alert
   * @param {Object} options
   * @param {HTMLElement|string} options.closeElement This property is required.
   * @param {string} options.cookieId
   * @param {string} options.cookiePrefix
   * @param {number} options.cookieExpiry Number of days until the cookie expires.
   */
  constructor(alert, options = {}) {
    this.alert = typeof alert === 'string' ? document.querySelector(alert) : alert;
    this.closeElement = typeof options.closeElement === 'string' ? document.querySelector(options.closeElement) : options.closeElement;
    this.cookieId = options.cookieId;
    this.cookiePrefix = options.cookiePrefix || 'site_alert';
    this.cookieExpiryInDays = options.cookieExpiry || 7;

    this.init();
  }

  getCookieName() {
    return `${this.cookiePrefix}_${this.cookieId}`;
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

      if (!this.cookieExists() && this.cookieId) {
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
