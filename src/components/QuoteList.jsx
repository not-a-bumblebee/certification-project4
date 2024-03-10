import { useSelector, useDispatch } from "react-redux"
import { searchResults, updateSearch, deleteItem, updateItem } from "./searchSlice"
import axios from "axios"
import AddQuote from "./AddQuote"
import { useState } from "react"

export default function QuoteList() {
    const reduxa = useSelector(state => state.search)
    const dispatch = useDispatch()

    const [editData, setEditData] = useState(null)

    // Fetched items include: author , quote, submission date, and quote id

    const handleEdit = (author, quote, id, index) => {
        setEditData({ author, quote, id, index })

    }

    const handleUpdateItem = async (newAuthor, newQuote) => {
        

        let body = {
            ...(newAuthor === editData.author ? {} : { author: newAuthor.trim().toUpperCase() }),
            ...(newQuote === editData.quote ? {} : { quote: newQuote.trim() })
        }

        let res = await axios('http://localhost:3001/api/update/' + editData.id, { method: 'put', data: body })

        console.log(res);

        let newShit = reduxa.results
        newShit[editData.index].author.name = newAuthor === handleEdit.author ? handleEdit.author : newAuthor
        newShit[editData.index].text = newQuote === handleEdit.quote ? handleEdit.quote : newQuote

        dispatch(updateItem([editData.index, newShit]))


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
                    {reduxa.results && reduxa.results.map((x, i) => {

                        return (<ResItem author={x.author.name} quote={x.text} quoteId={x.id} index={i} date={new Date(x.date).toDateString()} />)
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

        </div>
    )
}