import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Banner from "./Banner"
import AddQuote from './AddQuote'
import { addItem, deleteItem, updateItem } from "./part3Slice"
import axios from "axios"
import Back from "./Back"

export default function QuoteList() {
    let { listId } = useParams()
    const redux = useSelector(state => state.load)
    const dispatch = useDispatch()

    const [editData, setEditData] = useState(null)
    const [random, setRandom] = useState(null)
    console.log();
    useEffect(() => {
        console.log("Use effects activated");
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        let quotes = [...redux.loaded[listId].quotes]
        console.log(quotes);
        shuffleArray(quotes)
        console.log(quotes);
        setRandom([quotes, 0])
        if (redux.loaded.length > 0) {
            handleSave()
        }

    }, [redux.loaded[listId]])


    // Fetched items include: author , quote, submission date, and quote id
    console.log(listId, redux);

    const handleSave = async () => {
        console.log("saving data");
        let res = await axios("http://localhost:3001/api/save", { method: "post", data: redux.loaded })
    }

    const handleCreate = (author, quote, category) => {
        console.log("adding new quote");

        author = author.trim();
        quote = quote.trim();
        category = category.trim();

        if (author == false || quote == false || category == false) {
            console.log("nvm nothing to add");
            return
        }

        let newShit = {
            quote,
            author,
            category
        }

        dispatch(addItem([parseInt(listId), newShit]))



    }

    // When Clicking the Edit button
    const handleEdit = (author, quote, category, index) => {
        setEditData({ author, quote, category, index })

    }

    //Handles the submit upon editing
    const handleUpdateItem = async (newAuthor, newQuote, newCategory) => {
        newAuthor = newAuthor.trim();
        newQuote = newQuote.trim();
        newCategory = newCategory.trim();
        console.log("updating quote");

        // If no changes or everything is empty for some reason.
        if ((newAuthor === editData.author || newAuthor == false) && (newQuote === editData.quote || newQuote == false) && (newCategory === editData.category || newCategory == false)) {
            console.log("Changing nothing");
            setEditData(null);
            return

        }


        let newShit = {
            quote: newQuote,
            author: newAuthor,
            category: newCategory
        }
        console.log(editData);
        dispatch(updateItem([parseInt(listId), editData.index, newShit]))
        setEditData(null);



    }

    const handleItem = (index) => {
        console.log("deleting item");

        dispatch(deleteItem([parseInt(listId), index]))
    }

    const ResItem = ({ author, quote, category, index }) => {

        return (
            <tr>
                <td>{author}</td>
                <td>"{quote}"</td>
                <td>{category}</td>
                <td className="green" onClick={() => handleEdit(author, quote, category, index)}>EDIT</td>
                <td className="red" onClick={() => handleItem(index)}>DELETE</td>
            </tr>
        )
    }

    const handleRand = () => {
        console.log("Rand iNdex", random[1], random[0].length);
        if (random[1] === random[0].length - 1) {
            setRandom(x => {
                let temp = [...x];
                temp[1] = 0;
                return [...temp]
            })
        }
        else {
            setRandom(x => {
                let temp = [...x]
                temp[1] += 1
                console.log("index to be: " + temp[1]);
                return [...temp]
            })
        }
        console.log("Rand iNdex AFTER", random[1]);


    }

    return (
        <>
            <Banner />
            <Back destination={"/app"} />
            <div className="random-container">
                {random && (
                    <>
                        <p className="quote-text">"{random[0][random[1]]?.quote}"</p>
                        <p className="quote-author">--{random[0][random[1]]?.author}</p>

                        <button className="rand-button" onClick={handleRand}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>

                        </button>

                    </>
                )}

            </div>

            <h2 className="title">{redux.loaded[listId].name}</h2>
            <div className="quote-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quote</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {redux.loaded[listId].quotes && redux.loaded[listId].quotes.map((x, i) => {
                            console.log(x);
                            return (<ResItem author={x.author} quote={x.quote} category={x.category} index={i} />)
                        })}
                    </tbody>
                </table>
                {editData &&
                    (<div className="modal-bg">
                        <div onClick={() => setEditData(null)} className="modal-1" />
                        <div className="modal-body">
                            <AddQuote author={editData.author} category={editData.category} quote={editData.quote} handleSubmit={handleUpdateItem} />
                        </div>

                    </div>)}

                <AddQuote handleSubmit={handleCreate} />



            </div>


        </>
    )
}