import i from "gsap";
import o from "js-cookie";
class c {
  /**
   *
   * @param {HTMLElement|string} alert
   * @param {Object} options
   * @param {HTMLElement|string} options.closeElement This property is required.
   * @param {string} options.cookieId
   * @param {string} options.cookiePrefix
   * @param {number} options.cookieExpiry Number of days until the cookie expires.
   */
  constructor(t, e = {}) {
    this.alert = typeof t == "string" ? document.querySelector(t) : t, this.closeElement = typeof e.closeElement == "string" ? document.querySelector(e.closeElement) : e.closeElement, this.cookieId = e.cookieId, this.cookiePrefix = e.cookiePrefix || "site_alert", this.cookieExpiryInDays = e.cookieExpiry || 7, this.init();
  }
  getCookieName() {
    return `${this.cookiePrefix}_${this.cookieId}`;
  }
  cookieExists() {
    return o.get(this.getCookieName());
  }
  setCookie() {
    o.set(this.getCookieName(), !0, { expires: this.cookieExpiryInDays });
  }
  showAlert() {
    this.alert.classList.remove("hidden"), i.set(this.alert, {
      display: "flex",
      y: 50
    }), i.to(this.alert, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.75
    });
  }
  removeAlert() {
    this.alert.remove();
  }
  addEventListeners() {
    this.closeElement.addEventListener("click", (t) => {
      t.preventDefault(), !this.cookieExists() && this.cookieId && this.setCookie(), i.to(this.alert, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          this.removeAlert();
        }
      });
    });
  }
  init() {
    this.alert && (this.cookieExists() ? this.removeAlert() : (this.showAlert(), this.addEventListeners()));
  }
}
export {
  c as SiteAlert
};
