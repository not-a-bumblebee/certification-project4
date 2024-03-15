import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "./part3Slice";

export default function Banner() {
    const redux = useSelector(state => state.load)
    let dispatch = useDispatch()

    const signOut = async () => {
        dispatch(logoutUser())
    }

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
                {redux.user && <button onClick={signOut}>Sign Out</button>}
            </div>
        </header>
    )
}