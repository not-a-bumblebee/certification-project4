import { useSelector } from "react-redux";
import Banner from "./Banner";
import Header from "./Header";

export default function Home() {
    const redux = useSelector(state => state.load)
    console.log(redux);
    return (
        <>
            <Banner />
            <div className="intro">Contents of the home page can include
                some details about the certification project
                you are including, a very brief description of
                your project, the various features you are
                going to implement, as well as explanations
                of how exactly you’re meeting the
                requirements.</div>
        </>
    )
}