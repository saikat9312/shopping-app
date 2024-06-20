import styled from "styled-components";
import Footer from "../molecules/Footer";
import Header from "../organisms/Header";

export const Layout = ({ children }) => {
  const BodyStyles = styled.div`
    margin: 0 0.5rem;
    padding: 0 0.5rem;
    @media only screen and (min-width: 769px) {
      margin: 0 4rem;
      padding: 0 1.5rem;
    }
    @media only screen and (min-width: 992px) {
      margin: 0 7rem;
      padding: 0 1.5rem;
    }
  `;
  return (
    <main>
      <Header />
      <BodyStyles>{children}</BodyStyles>
      <Footer />
    </main>
  );
};
