import Back from "./Back";
import Banner from "./Banner";

export default function Contact() {

    return (
        <div>
            <Banner/>
            <Back />
            <form>
                <input type="email" />
                <textarea/>
                <button>submit</button>
            </form>
        </div>
    )
}