({
  helperMethod: function () {
  },
  leaveHandler: function (event) {
    event.returnValue = "Are you sure you want to leave? All changes will be lost!";
  },
  preventLeaving: function () {
    window.addEventListener("beforeunload", this.leaveHandler);
  },
  allowLeaving: function () {
    window.removeEventListener("beforeunload", this.leaveHandler);
  },
  getDeviceType: function (component, event, helper) {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "TABLET";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "PHONE";
    }
    return "DESKTOP";
  }
})