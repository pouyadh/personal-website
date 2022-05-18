import Header from "./containers/Header/Header";
import Main from "./containers/Main/Main";
import Footer from "./containers/Footer/Footer";
import Navbar from "./containers/Navbar/Navbar";
import { useQuery } from "react-query";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import SomethingWentWrong from "./components/SomethingWentWrong/SomethingWentWrong";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useEffect } from "react";
import Helmet from "react-helmet";
import { ToastContainer } from "react-toastify";
import { getLocale, fetchContent, fetchLanguage } from "./utils/locale";

function App() {
  const locale = getLocale();
  const lang = useQuery(["lang", locale], () => fetchLanguage(locale));
  const content = useQuery(["content", locale], () => fetchContent(locale));

  useEffect(() => {
    if (lang.data) {
      document.querySelector("html").setAttribute("lang", lang.data["lang"]);
      document.querySelector("html").setAttribute("dir", lang.data["lang.dir"]);
    }
  }, [lang.data]);

  if (content.isLoading || lang.isLoading) {
    return <LoadingAnimation center />;
  }

  if (content.error || lang.error) {
    return (
      <SomethingWentWrong
        h1={<FormattedMessage id="app.error.404.h1" />}
        h2={<FormattedMessage id="app.error.404.h2" />}
        p1={<FormattedMessage id="app.error.404.p1" />}
        p2={<FormattedMessage id="app.error.404.p2" />}
      />
    );
  }

  return (
    <IntlProvider messages={lang.data} locale={locale}>
      <FormattedMessage id="app.document.title">
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <Helmet>
        <link rel="stylesheet" type="text/css" href={`lang/${locale}.css`} />
      </Helmet>
      <Navbar locale={locale} />
      <Header data={content.data.general} />
      <Main data={content.data.body} />
      <Footer data={content.data.general} />
      <ToastContainer theme="dark" rtl={lang.data["lang.dir"] === "rtl"} />
    </IntlProvider>
  );
}

export default App;
