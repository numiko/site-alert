import r from "gsap";
import s from "js-cookie";
class h {
  constructor(t, e) {
    if (!t)
      throw new Error("Alert is required — this can be a HTML element or a selector");
    const o = typeof t == "string" ? document.querySelector(t) : t;
    if (!o)
      throw new Error("Alert element not found");
    if (this.alert = o, !e.closeElement)
      throw new Error("Close element is required");
    const i = typeof e.closeElement == "string" ? document.querySelector(e.closeElement) : e.closeElement;
    if (!i)
      throw new Error("Close element not found");
    this.closeElement = i, this.cookieId = e.cookieId, this.cookiePrefix = e.cookiePrefix || "", this.cookieExpiryInDays = e.cookieExpiry || 7, this.init();
  }
  getCookieName() {
    return this.cookiePrefix ? `${this.cookiePrefix}_${this.cookieId}` : this.cookieId;
  }
  cookieExists() {
    return s.get(this.getCookieName());
  }
  setCookie() {
    s.set(this.getCookieName(), !0, { expires: this.cookieExpiryInDays });
  }
  showAlert() {
    r.to(this.alert, {
      autoAlpha: 1,
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
      t.preventDefault(), this.cookieId && !this.cookieExists() && this.setCookie(), r.to(this.alert, {
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
  h as SiteAlert
};
