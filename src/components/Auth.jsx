import axios from "axios"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadMasterList, loginUser } from "./part3Slice"
import { useNavigate } from "react-router-dom"

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)

    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const errorRef = useRef(null)

    const redux = useSelector(state => state.load)
    const dispatch = useDispatch()
    let navigate = useNavigate();


    const handleLogin = async () => {
        console.log("Logging in");
        errorRef.current.innerText = ""
        let body = {
            username: usernameRef.current.value.trim(),
            password: passwordRef.current.value
        }
        try {
            let res = await axios("http://localhost:3001/api/login", { method: "post", data: body })

            if (res.data.auth) {
                dispatch(loginUser(body.username));
                document.cookie = "userCookie=" + body.username + "; path=/;"
                console.log(document.cookie);
                navigate("/")
            }
            else {
                throw new Error(res.data.error)
            }
        } catch (error) {
            errorRef.current.innerText = error;

        }

    }

    const handleRegister = async () => {
        console.log("Registering");
        errorRef.current.innerText = ""
        let body = {
            username: usernameRef.current.value.trim(),
            password: passwordRef.current.value
        }

        try {
            let res = await axios("/api/register", { method: "post", data: body })
            console.log(res);
            if (res.data.auth) {
                dispatch(loginUser(body.username));
                dispatch(loadMasterList(res.data.user))
                document.cookie = "userCookie=" + body.username + "; path=/;"
                console.log(document.cookie);
                navigate("/")
            }
            else {
                throw new Error(res.data.error)
            }

        } catch (error) {
            errorRef.current.innerText = error;
        }

    }

    return (
        <div className="auth-container">

            <h1>{!isLogin ? "Registering" : "Logging in"}</h1>
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); isLogin ? handleLogin() : handleRegister() }}>
                <p ref={errorRef} className="error-text red"></p>
                <label htmlFor="">Username:</label>
                <input ref={usernameRef} type="text" required data-testid="username" />
                <label htmlFor="">Password:</label>
                <input ref={passwordRef} type="password" required data-testid="pw" />
                <button data-testid="submit">{isLogin ? "Login" : "Register"}</button>
            </form>
            <button className="auth-swap-btn" onClick={() => !isLogin ? setIsLogin(true) : setIsLogin(false)}>{!isLogin ? "sign in" : "sign up"}</button>
        </div>
    )
}