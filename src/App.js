import Header from "./containers/Header/Header";
import Main from "./containers/Main/Main";
import Footer from "./containers/Footer/Footer";
import Navbar from "./containers/Navbar/Navbar";
import { useQuery } from "react-query";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import SomethingWentWrong from "./components/SomethingWentWrong/SomethingWentWrong";

const fetchContent = () => fetch("./content.json").then((res) => res.json());

function App() {
  const { isLoading, error, data } = useQuery("content", fetchContent);

  if (isLoading) {
    return <LoadingAnimation center />;
  }

  if (error) {
    return (
      <SomethingWentWrong
        h1={"OOPS!"}
        h2={"ERROR 404"}
        p1={"There seems to be a problem loading this page"}
        p2={"Please try again later"}
      />
    );
  }

  return (
    <>
      <Navbar data={data.general} />
      <Header data={data.general} />
      <Main data={data.body} />
      <Footer data={data.general} />
    </>
  );
}

export default App;
