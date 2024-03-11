import { useRef, useState } from 'react'

import './App.css'
import QuoteList from './components/QuoteList'
import Banner from './components/Banner'
import { useDispatch, useSelector } from 'react-redux'
import { addList, deleteList, updateList } from './components/part3Slice'
import { useNavigate } from 'react-router-dom'

function App() {
  let navigate = useNavigate();

  const [modal, setModal] = useState(null)

  const listNameRef = useRef(null)

  const redux = useSelector(state => state.load)
  const dispatch = useDispatch()
  console.log(redux);

  const handleCreate = () => {
    let name = listNameRef.current.value
    let newList = {
      name,
      quotes: []
    }
    dispatch(addList(newList))
    console.log("Creating new list " + name);
    setModal(null)

  }

  const handleDownload = (index) => {
    let json = redux.loaded[index];
    JSON.stringify(json)

    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' })

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = redux.loaded[index].name;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  }

  const handleEdit = (index) => {

    console.log("Editing " + listNameRef.current.value);

    dispatch(updateList([index, listNameRef.current.value]))
    setModal(null)

  }
  const handleDelete = (index) => {
    console.log("Deleting");
    dispatch(deleteList(index))

  }

  //loads json, then adds it to redux
  const handleLoad = (e) => {
    const file = e.target.files[0]
    console.log("Loading");
    console.log(file);

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const parsedData = JSON.parse(content);
        console.log(parsedData);

        if (parsedData.hasOwnProperty("name") && parsedData.hasOwnProperty("quotes")) {
          dispatch(addList(parsedData))
        }


      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    reader.readAsText(file); // Read the file as text


  }

  const ListCard = ({ name, quant, index }) => {
    return (
      <div className='list-card' onClick={() => navigate("/app/list/" + index)}>
        <h2>{name}</h2>
        <p>Quotes: ({quant})</p>
        <div className='card-buttons'>
          <svg onClick={() => setModal({ name, index })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          <svg onClick={() => handleDownload(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          <svg onClick={() => handleDelete(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>

        </div>
      </div>
    )
  }

  return (
    <>
      <Banner />
      {/* <QuoteList /> */}
      <div className='list-container'>
        {redux.loaded.length > 0 && redux.loaded.map((x, i) => {
          return <ListCard name={x.name} quant={x.quotes.length} index={i} key={x.name} />
        })}
      </div>
      <div className='new-list'>
        <div onClick={() => setModal(true)}>Create</div>
        <div>-------</div>
        <input type='file' accept=".json" onChange={handleLoad} />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>

      </div>
      <button>Download all lists</button>
      <div>
        Upload new masterlist
        <input type='file' accept=".json" />

      </div>

      {/* Modal: Create/Edit*/}
      {modal && (
        <div className="modal-bg">
          <div onClick={() => setModal(null)} className="modal-1" />
          <div className="modal-body">
            <label htmlFor="">list name</label>
            <input ref={listNameRef} type="text" defaultValue={modal?.name || ""} />
            <button onClick={() => modal === true ? handleCreate() : handleEdit(modal.index)}>{modal === true ? "Create" : "Edit"}</button>
          </div>
        </div>
      )}


    </>
  )
}

export default App
