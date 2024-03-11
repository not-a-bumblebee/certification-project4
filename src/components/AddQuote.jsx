import axios from "axios"
import { useRef, useEffect } from "react"

export default function AddQuote({ author, quote, category, handleSubmit }) {

    const authorRef = useRef(null)
    const quoteRef = useRef(null)
    const categoryRef = useRef(null)

    useEffect(() => {
        // Set initial values of the refs based on props once when the component mounts
        if (authorRef.current && quoteRef.current && categoryRef.current) {
            authorRef.current.value = author || "";
            quoteRef.current.value = quote || "";
            categoryRef.current.value = category || "";
        }
    }, [author, quote, category]); // Run this effect when either 'author' or 'quote' props change


    // After the submit is successful, redirect to a search for the exact quote
    const submitQuote = async (e) => {
        e.preventDefault()
        console.log("submitting");
        let author = authorRef.current.value.toUpperCase().trim()
        let quote = quoteRef.current.value.trim()

        let res = await axios('http://localhost:3001/api/upload', { method: "post", data: { author: author, quote: quote } })

        console.log(res);
    }

    return (
        <div>
            <form action="">
                <label htmlFor="">author</label>
                <input type="text" ref={authorRef} />
                <label htmlFor="">category</label>
                <input ref={categoryRef} placeholder="Inspirational" />
                <label htmlFor="">quote (Don't add quotation marks)</label>
                <textarea ref={quoteRef} name="" id="" cols="30" rows="10" required></textarea>
                <button type="button" onClick={() => handleSubmit(authorRef.current.value, quoteRef.current.value, categoryRef.current.value)}>Submit</button>
            </form>
        </div>
    )
}