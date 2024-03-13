import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import { useEffect } from "react";
import axios from "axios";
import { loadMasterList, loginUser } from "./part3Slice";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const redux = useSelector(state => state.load)
    const dispatch = useDispatch()
    let navigate = useNavigate();

    console.log(redux);

    // //Only do this is theres a cookie.
    // //loads the json from the backend.
    // const handleFetch = async (username) => {
    //     let res = await axios("http://localhost:3001/api/load", { data: { username } })

    //     console.log(res);
    //     dispatch(loadMasterList(res.data))

    // }

    // const handleAuth = async () => {
    //     console.log("Cookies:");
    //     console.log(document.cookie);

    //     let session = document.cookie.split(";")[0].split("=")[1];
    //     console.log("Username: " + session);

    //     // If there are no users and no cookie session, redirect to login page.
    //     if (!document.cookie && !redux.user) {
    //         navigate("/auth");
    //     }
    //     // Loads session if there is a cookie, and there is no logged in user.
    //     else if (session && !redux.user) {
    //         dispatch(loginUser(session))
    //         handleFetch(session);

    //     }


    // }

    // useEffect(() => {
    //     if (!redux.user) {
    //         handleAuth()
    //     }

    // }, [])


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