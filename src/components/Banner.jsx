import { Link } from "react-router-dom";

export default function Banner() {

    return (
        <header>
            <ul>

                <Link to={"/"}>
                    <h2>Home</h2>
                </Link>
                <Link to={"/app"}>
                    <h2>App</h2>
                </Link>
                <Link to={'/contact'}>
                    <h2>Contact</h2>
                </Link>
            </ul>
        </header>
    )
}