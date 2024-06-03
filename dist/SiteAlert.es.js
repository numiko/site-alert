let s = [];
class o {
  constructor(e, t) {
    this.alerts = typeof e > "u" ? document.querySelectorAll("[data-js-alert]") : typeof e == "string" ? document.querySelectorAll(e) : e, this.closeButton = typeof t.closeButton == "string" ? document.querySelectorAll(t.closeButton) : t.closeButton;
  }
  /**
  * Check local storage for the ids of alerts which have been closed/accpeted
  */
  checkSessionStorage() {
    sessionStorage.numiko_site_alerts && (s = JSON.parse(sessionStorage.numiko_site_alerts), s.forEach((e) => {
      this.alerts = Array.from(this.alerts).filter((t) => t.dataset.jsAlert != e);
    })), this.alerts.forEach((e) => {
      e.style.display = "block";
    });
  }
  listeners() {
    this.closeButton.forEach((e) => {
      e.addEventListener("click", (t) => {
        let r = t.currentTarget.closest("[data-js-alert]");
        s.push(r.dataset.jsAlert), sessionStorage.numiko_site_alerts = JSON.stringify(s), r.style.display = "none";
      });
    });
  }
  init() {
    this.checkSessionStorage(), this.listeners();
  }
}
export {
  o as default
};
