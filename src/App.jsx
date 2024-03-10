import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import AddQuote from './components/AddQuote'
import Home from './components/Home'
import QuoteList from './components/QuoteList'
import Banner from './components/Banner'

function App() {
  const [createList, setCreateList] = useState(null)

  const handleCreate = () => {

  }

  return (
    <>
      <Banner />
      <QuoteList />
      <div className='new-list'>
        <div onClick={() => setCreateList(true)}>Create</div>
        <div>-------</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>

      </div>

      {createList && (
        <div className="modal-bg">
          <div onClick={() => setCreateList(null)} className="modal-1" />
          <div className="modal-body">
            <label htmlFor="">list name</label>
            <input type="text" />
            <button onClick={handleCreate}>Create</button>
          </div>
        </div>
      )}


    </>
  )
}

export default App
