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
        errorRef.current.value = ""
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
            errorRef.current.value = error;

        }

    }

    const handleRegister = async () => {
        errorRef.current.value = ""
        let body = {
            username: usernameRef.current.value.trim(),
            password: passwordRef.current.value
        }

        try {
            let res = await axios("http://localhost:3001/api/register", { method: "post", data: body })

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
            errorRef.current.value = error;
        }

    }

    return (
        <div>
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
                <p ref={errorRef} className="error-text"></p>
                <input type="text" name="" id="" required />
                <input type="password" name="" id="" required />
                <button>{isLogin ? "Login" : "Register"}</button>
            </form>
            <button onClick={() => !isLogin ? setIsLogin(true) : setIsLogin(false)}>{!isLogin ? "sign in" : "sign up"}</button>
        </div>
    )
}