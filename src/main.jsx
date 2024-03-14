import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Content from './components/List.jsx'
import './index.css'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './store.jsx'

import App from './App.jsx'

// const redux = useSelector(state => state.load)
// const dispatch = useDispatch()
// let navigate = useNavigate();


// //Only do this is theres a cookie.
// //loads the json from the backend.
// const handleFetch = async (username) => {
//   let res = await axios("http://localhost:3001/api/load", { data: { username } })

//   console.log(res);
//   dispatch(loadMasterList(res.data))

// }

// const handleAuth = async () => {
//   console.log("Cookies:");
//   console.log(document.cookie);

//   let session = document.cookie.split(";")[0].split("=")[1];
//   console.log("Username: " + session);

//   // If there are no users and no cookie session, redirect to login page.
//   if (!document.cookie && !redux.user) {
//     navigate("/auth");
//   }
//   // Loads session if there is a cookie, and there is no logged in user.
//   else if (session && !redux.user) {
//     dispatch(loginUser(session))
//     handleFetch(session);

//   }


// }

// useEffect(() => {
//   if (!redux.user) {
//     handleAuth()
//   }

// }, [])


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/contact",
//     element: <Contact />
//   },
//   {
//     path: "/content",
//     element: <Content />,
//   },
//   {
//     path: "/app/list/:listId",
//     element: <QuoteList />,
//   },
//   {
//     path: "/auth",
//     element: <Auth />
//   }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <RouterProvider router={router} /> */}
      {/* <BrowserRouter>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/app' element={<App />} />
          <Route path='/app/list/:listId' element={<QuoteList />} />
          <Route />
        </Routes>
      </BrowserRouter> */}
    </Provider>
  </React.StrictMode>,
)
