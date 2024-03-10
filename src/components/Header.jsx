import axios from "axios"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchResults, updateSearch } from "./searchSlice"

export default function Header() {

    const reduxa = useSelector(state => state.search)
    const dispatch = useDispatch()
    console.log(reduxa);
    const searchRef = useRef(null)
    const search = async (e) => {
        e.preventDefault()

        let input = searchRef.current.value
        console.log("Searching " + input);

        if (input) {
            let res = await axios('http://localhost:3001/api/search/quote/' + input)
            console.log(res);

            if (res){
                dispatch(searchResults(res.data))
            }
        }


    }

    return (
        <header>
            <h1>Quote Manager</h1>
            <div className='search'>
                <form onSubmit={search}>
                    <input ref={searchRef}/>
                </form>
                <svg onClick={search} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>

            <div className='search-options'>
                <input type="radio" name='query' value='author' checked />
                <label htmlFor="">author</label>
                <input type="radio" name='query' value='quote' />
                <label htmlFor="">quote</label>
            </div>
        </header>
    )
}