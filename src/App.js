import Header from "./containers/Header/Header";
import Main from "./containers/Main/Main";
import Footer from "./containers/Footer/Footer";
import Navbar from "./containers/Navbar/Navbar";
import { useQuery } from "react-query";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import SomethingWentWrong from "./components/SomethingWentWrong/SomethingWentWrong";
import { FormattedMessage, IntlProvider } from "react-intl";
import { ToastContainer } from "react-toastify";
import { getLocale, fetchContent, fetchLanguage } from "./utils/locale";

function App() {
  const locale = getLocale();
  const lang = useQuery(["lang", locale], () => fetchLanguage(locale));
  const content = useQuery(["content", locale], () => fetchContent(locale));

  if (content.isLoading || lang.isLoading) {
    return <LoadingAnimation center />;
  }

  if (lang.isError && content.error) {
    return (
      <SomethingWentWrong
        dir="ltr"
        h1={"OOPS!"}
        h2={"We'll be back soon."}
        p1={"The site is currently down for maintenance."}
        p2={"Please try again later."}
      />
    );
  }

  if (lang.isError) {
    return (
      <SomethingWentWrong
        h1={"OOPS!"}
        h2={"ERROR 404"}
        p1={"Currently we don't support this language"}
        p2={
          <>
            You can choose either <a href="/?lang=en">English</a> or{" "}
            <a href="/?lang=fa">Farsi</a>
          </>
        }
      />
    );
  }

  // Can not be used in the useEffect hook , because they may be updated after rendering the DOM tree and some of the components are depend on them. so they should update immidiately; and also they are not expensive.
  document.querySelector("html").setAttribute("lang", lang.data["lang"]);
  document.querySelector("html").setAttribute("dir", lang.data["lang.dir"]);
  document.title = lang.data["app.document.title"];

  if (content.isError) {
    return (
      <IntlProvider messages={lang.data} locale={locale}>
        <SomethingWentWrong
          h1={<FormattedMessage id="app.error.404.h1" />}
          h2={<FormattedMessage id="app.error.404.h2" />}
          p1={<FormattedMessage id="app.error.404.p1" />}
          p2={<FormattedMessage id="app.error.404.p2" />}
        />
      </IntlProvider>
    );
  }

  return (
    <IntlProvider messages={lang.data} locale={locale}>
      <Navbar locale={locale} />
      <Header data={content.data.general} />
      <Main data={content.data.body} />
      <Footer data={content.data.general} />
      <ToastContainer theme="dark" rtl={lang.data["lang.dir"] === "rtl"} />
    </IntlProvider>
  );
}

export default App;
