const UtilityService = {
  updateQueryParam(url, queryKey, queryValue) {
    if (queryKey && queryValue) {
      const re = new RegExp("([?&])" + queryKey + "=.*?(&|$)", "i");
      const separator = url.indexOf("?") !== -1 ? "&" : "?";
      let resultingUrl = "";
      if (separator === "&" && url.match(re)) {
        resultingUrl = url.replace(
          re,
          "$1" + queryKey + "=" + queryValue + "$2"
        );
      } else {
        resultingUrl = url + separator + queryKey + "=" + queryValue;
      }
      return resultingUrl;
    }
    return url;
  },
  getIndex(url) {
    if (url) {
      return Number(url.match(/\d/g).join(""));
    }
    return 0;
  },
  getStartNum(prevUrl, multiplier = 10) {
    return this.getIndex(prevUrl) * multiplier + 1;
  }
};

export { UtilityService };
