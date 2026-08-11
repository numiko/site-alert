import e from "gsap";
import t from "js-cookie";
//#region lib/SiteAlert.ts
var n = class {
	constructor(e, t) {
		if (!e) throw Error("Alert is required — this can be a HTML element or a selector");
		let n = typeof e == "string" ? document.querySelector(e) : e;
		if (!n) throw Error("Alert element not found");
		if (this.alert = n, !t.closeElement) throw Error("Close element is required");
		let r = typeof t.closeElement == "string" ? document.querySelector(t.closeElement) : t.closeElement;
		if (!r) throw Error("Close element not found");
		this.closeElement = r, this.cookieId = t.cookieId, this.cookiePrefix = t.cookiePrefix || "", this.cookieExpiryInDays = t.cookieExpiry || 7, this.init();
	}
	getCookieName() {
		return this.cookieId ? this.cookiePrefix ? `${this.cookiePrefix}_${this.cookieId}` : this.cookieId : "";
	}
	cookieExists() {
		return t.get(this.getCookieName());
	}
	setCookie() {
		t.set(this.getCookieName(), "true", { expires: this.cookieExpiryInDays });
	}
	showAlert() {
		e.to(this.alert, {
			autoAlpha: 1,
			y: 0,
			duration: .3,
			delay: .75
		});
	}
	removeAlert() {
		this.alert.remove();
	}
	addEventListeners() {
		this.closeElement.addEventListener("click", (t) => {
			t.preventDefault(), this.cookieId && !this.cookieExists() && this.setCookie(), e.to(this.alert, {
				opacity: 0,
				duration: .3,
				onComplete: () => {
					this.removeAlert();
				}
			});
		});
	}
	init() {
		this.alert && (this.cookieExists() ? this.removeAlert() : (this.showAlert(), this.addEventListeners()));
	}
};
//#endregion
export { n as SiteAlert };
