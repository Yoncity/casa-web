import Footer from "../Footer";
import Header from "../Header";

type Props = {
  inverted?: boolean;
};

const Layout: React.FC<Props> = ({ inverted = false, children }) => {
  return (
    <>
      <Header inverted={inverted} />
      {children}
      {!inverted && <Footer />}
    </>
  );
};

export default Layout;
