import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Banner() {
    const redux = useSelector(state => state.load)

    return (
        <header>
            <ul>

                <Link to={"/"}>
                    <h2>Home</h2>
                </Link>
                <Link to={"/list"}>
                    <h2>App</h2>
                </Link>
                <Link to={'/contact'}>
                    <h2>Contact</h2>
                </Link>
            </ul>
            <div className="current-user-container">
                <p>User: {redux.user}</p>
                {redux.user && <button>Sign Out</button>}
            </div>
        </header>
    )
}