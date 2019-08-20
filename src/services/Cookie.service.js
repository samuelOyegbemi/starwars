export default {
  put(key, value, path = "", expire_in = 15 * 24 * 60 * 60 * 1000) {
    const d = new Date();
    d.setTime(d.getTime() + expire_in);
    const expires = `expires=${d.toUTCString()}`;
    path = path && path.toString().indexOf("/") === 0 ? path : "/";
    path = `path=${path}`;
    document.cookie = `${key}=${value}; ${path}; ${expires}`;
  },
  get(key) {
    const cookiesArr = document.cookie.split(";") || [];
    let i = 0;
    let value = "";
    while (cookiesArr[i] && !value) {
      if (cookiesArr[i].indexOf(`${key}=`) > -1) {
        value = cookiesArr[i].split("=")[1].trim();
      }
      i++;
    }
    return value;
  },
  getObject(key) {
    const val = this.get(key);
    return val ? JSON.parse(val) : null;
  },
  putObject(key, object, path = "", expire_in = 15 * 24 * 60 * 60 * 1000) {
    this.put(key, JSON.stringify(object), path, expire_in);
  }
};
