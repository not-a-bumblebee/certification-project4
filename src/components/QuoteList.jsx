import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Banner from "./Banner"
import AddQuote from './AddQuote'
import { addItem, deleteItem, updateItem } from "./part3Slice"

export default function QuoteList() {
    let { listId } = useParams()
    const redux = useSelector(state => state.load)
    const dispatch = useDispatch()

    const [editData, setEditData] = useState(null)

    // Fetched items include: author , quote, submission date, and quote id
    console.log(listId, redux);

    const handleCreate = (author, quote, category) => {
        console.log("adding new quote");

        author = author.trim();
        quote = quote.trim();
        category = category.trim();

        if(author ==false || quote==false || category==false){
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
                            <th>Category</th>
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