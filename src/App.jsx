import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, redirect, useNavigate } from "react-router-dom";
import { loadMasterList, loginUser } from "./components/part3Slice";
import { useEffect } from "react";
import Home from "./components/Home";
import Contact from "./components/Contact";

import QuoteList from "./components/QuoteList";
import Auth from "./components/Auth";
import List from "./components/List";

export default function App() {
    const redux = useSelector(state => state.load)
    const dispatch = useDispatch()
    // let navigate = useNavigate();
    // redirect


    //Only do this is theres a cookie.
    //loads the json from the backend.
    const handleFetch = async (username) => {
        console.log("fetching for " + username);
        let res = await axios("http://localhost:3001/api/load", { method: "post", data: { username: username } })

        console.log(res);
        dispatch(loadMasterList(res.data))

    }

    const handleAuth = async () => {
        console.log("Cookies:");
        console.log(document.cookie);

        let session = document.cookie.split(";")[0].split("=")[1];
        console.log("Username: " + session);

        // If there are no users and no cookie session, redirect to login page.
        if (!document.cookie && !redux.user) {
            console.log("redirecting to login");
            // navigate("/auth");
            return redirect("/auth");
        }
        // Loads session if there is a cookie, and there is no logged in user.
        else if (session && !redux.user) {
            console.log("Loading Session");
            handleFetch(session);
            dispatch(loginUser(session))

        }
        return null


    }

    useEffect(() => {
        if (!redux.user) {
            handleAuth()
        }

    }, [])

    const loader = async () => {
        handleAuth()

        if (!redux.user)
            return redirect("/auth");

        return null;
    }


    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            loader: handleAuth
        },
        {
            path: "/contact",
            element: <Contact />,
            loader: handleAuth
        },
        {
            path: "/list",
            element: <List />,
            loader: handleAuth
        },
        {
            path: "/list/:listId",
            element: <QuoteList />,
            loader: handleAuth,
            errorElement: <Home />
        },
        {
            path: "/auth",
            element: <Auth />,
            loader: handleAuth
        }
    ]);

    return (
        <RouterProvider router={router} />
        // <BrowserRouter>
        //     <Routes >
        //         <Route path='/' element={<Home />} />
        //         <Route path='/contact' element={<Contact />} />
        //         <Route path='/app' element={<App />} />
        //         <Route path='/app/list/:listId' element={<QuoteList />} />
        //         <Route />
        //     </Routes>
        // </BrowserRouter>
    )


}