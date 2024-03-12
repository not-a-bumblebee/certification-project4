import Back from "./Back";
import Banner from "./Banner";

export default function Contact() {

    return (
        <div>
            <Banner />
            <Back destination={"/"} />
            <div className="contact-container">

                <form className="flex">
                    <label htmlFor="">Email:</label>
                    <input type="email" required />
                    <label htmlFor="">Message:</label>
                    <textarea required />
                    <button>submit</button>
                </form>
            </div>
        </div>
    )
}