import { useRef, useEffect } from "react"

export default function AddQuote({ author, quote, category, handleSubmit }) {

    const authorRef = useRef(null)
    const quoteRef = useRef(null)
    const categoryRef = useRef(null)


    // GPT Here
    useEffect(() => {
        // Set initial values of the refs based on props once when the component mounts
        if (authorRef.current && quoteRef.current && categoryRef.current) {
            authorRef.current.value = author || "";
            quoteRef.current.value = quote || "";
            categoryRef.current.value = category || "";
        }
    }, [author, quote, category]); // Run this effect when either 'author' or 'quote' props change


    return (
        <div>
            <form className="flex">
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