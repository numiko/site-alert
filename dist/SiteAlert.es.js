import i from "gsap";
import o from "js-cookie";
class a {
  constructor(e, t = {}) {
    var s;
    this.alert = typeof e == "string" ? document.querySelector(e) : e, this.closeElement = typeof e == "string" ? document.querySelector("options.closeElement") : t.closeElement, this.id = t.id || ((s = this.alert) == null ? void 0 : s.dataset.jsAlertId), this.cookiePrefix = t.cookiePrefix || "site_alert", this.cookieExpiryInDays = t.cookieExpiry || 7, this.init();
  }
  getCookieName() {
    return `${this.cookiePrefix}_${this.id}`;
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
    this.closeElement.addEventListener("click", (e) => {
      e.preventDefault(), this.cookieExists() || this.setCookie(), i.to(this.alert, {
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
  a as SiteAlert
};
