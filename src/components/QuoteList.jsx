import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Banner from "./Banner"
import AddQuote from './AddQuote'

export default function QuoteList() {
    let { listId } = useParams()
    const redux = useSelector(state => state.load)
    const dispatch = useDispatch()

    const [editData, setEditData] = useState(null)

    // Fetched items include: author , quote, submission date, and quote id
    console.log(listId, redux);
    // When Clicking the Edit button
    const handleEdit = (author, quote, id, index) => {
        setEditData({ author, quote, id, index })

    }

    //Handles the submit upon editing
    const handleUpdateItem = async (newAuthor, newQuote) => {

        // If no changes or everything is empty for some reason.
        if ((newAuthor === editData.author || newAuthor == false) && (newQuote === editData.quote || newQuote == false)) {
            setEditData(null);
            return

        }


        console.log(res);

        let newShit = redux.loaded
        newShit[listId].quotes[editData.index].author = newAuthor
        newShit[listId].quotes[editData.index].quote = newQuote

        dispatch(updateItem([listId, newShit]))


    }

    const deleteItem = async (id, index) => {
        let res = await axios('http://localhost:3001/api/delete/' + id, { method: 'delete' })

        dispatch(deleteItem(index))
    }

    const ResItem = ({ author, quote, quoteId, index }) => {

        return (
            <tr>
                <td>{author}</td>
                <td>"{quote}"</td>
                <td className="green" onClick={() => handleEdit(author, quote, quoteId, index)}>EDIT</td>
                <td className="red" onClick={() => deleteItem(quoteId, index)}>DELETE</td>
            </tr>
        )
    }

    return (
        <>
            <Banner />

            <div className="list-container">
                <div className="stats">

                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quote</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ResItem author={'frank'} quote={"ive covered wars ya know?"} />
                        <ResItem author={'frank'} quote={"ive covered wars ya know?"} />
                        <ResItem author={'frank'} quote={"ive covered wars ya know?"} />
                        <ResItem author={'frank'} quote={"ive covered wars ya know?"} />
                        <ResItem author={'frank'} quote={"ive covered wars ya know?"} />
                        {redux.loaded[listId].quotes && redux.loaded[listId].quotes.map((x, i) => {
                            console.log(x);
                            return (<ResItem author={x.author} quote={x.quote} quoteId={x.id} index={i} />)
                        })}
                    </tbody>
                </table>
                {editData &&
                    (<div className="modal-bg">
                        <div onClick={() => setEditData(null)} className="modal-1" />
                        <div className="modal-body">
                            <AddQuote author={editData.author} quote={editData.quote} handleSubmit={handleUpdateItem} />
                        </div>

                    </div>)}

                <AddQuote />



            </div>
        </>
    )
}