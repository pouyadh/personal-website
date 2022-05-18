export const getLocale = () => {
  const params = new URLSearchParams(window.location.search);
  let locale = params.get("lang");
  if (locale) {
    window.localStorage.setItem("locale", locale);
    return locale;
  }
  locale = window.localStorage.getItem("locale");
  return locale ? locale : "en";
};

export const fetchContent = (locale) =>
  fetch(`content/${locale}.json`).then((res) => res.json());
export const fetchLanguage = (locale) =>
  fetch(`lang/${locale}.json`).then((res) => res.json());
