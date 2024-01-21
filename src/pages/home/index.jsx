import About from "./About";
import AboutSecond from "./AboutSecond";
import Banner from "./Banner";
import Chef from "./Chef";
import Menu from "./Menu";
import Promotion from "./Promotion";


function HomePage() {
    return (
        <>
            <Banner />
            <Promotion />
            <About />
            <Menu />
            <AboutSecond />
            <Chef />
        </>
    );
}

export default HomePage;