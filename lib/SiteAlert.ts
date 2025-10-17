import gsap from 'gsap';
import Cookies from 'js-cookie';

type Options = {
  closeElement: HTMLElement | string;
  cookieId: string;
  cookiePrefix?: string;
  cookieExpiry?: number;
};

class SiteAlert {
  alert: HTMLElement;
  closeElement: HTMLElement;
  cookieId: string;
  cookiePrefix: string;
  cookieExpiryInDays: number;

  constructor(alert: HTMLElement | string, options: Options) {
    if (!alert) {
      throw new Error('Alert is required — this can be a HTML element or a selector');
    }
    const alertEl = typeof alert === 'string' ? document.querySelector<HTMLElement>(alert) : alert;
    if (!alertEl) {
      throw new Error('Alert element not found');
    }
    this.alert = alertEl;

    if (!options.closeElement) {
      throw new Error('Close element is required');
    }
    const closeEl = typeof options.closeElement === 'string' ? document.querySelector<HTMLElement>(options.closeElement) : options.closeElement;
    if (!closeEl) {
      throw new Error('Close element not found');
    }
    this.closeElement = closeEl;

    this.cookieId = options.cookieId;
    this.cookiePrefix = options.cookiePrefix || '';
    this.cookieExpiryInDays = options.cookieExpiry || 7;

    this.init();
  }

  getCookieName() {
    return this.cookiePrefix ? `${this.cookiePrefix}_${this.cookieId}` : this.cookieId;
  }

  cookieExists() {
    return Cookies.get(this.getCookieName());
  }

  setCookie() {
    Cookies.set(this.getCookieName(), true, { expires: this.cookieExpiryInDays });
  }

  showAlert() {
    gsap.to(this.alert, {
      autoAlpha: 1,
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

      if (this.cookieId && !this.cookieExists()) {
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

export {
  SiteAlert,
  type Options
};
