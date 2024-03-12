import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import { useEffect } from "react";
import axios from "axios";
import { loadMasterList } from "./part3Slice";


export default function Home() {
    const redux = useSelector(state => state.load)
    const dispatch = useDispatch()
    console.log(redux);

    //loads the json from the backend
    const handleFetch = async () => {
        let res = await axios("http://localhost:3001/api/load")

        console.log(res);
        dispatch(loadMasterList(res.data))


    }

    useEffect(() => {
        if(redux.loaded.length ==0){
            handleFetch()
        }

    }, [])


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