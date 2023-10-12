import axios from "axios";
import { useEffect, useState, useRef } from "react";

const api = "https://api.quotable.io/quotes/random";
export default function App() {
    const [quote, setQuote] = useState({
        content: "",
        author: "",
    });
    const pointer = useRef({ x: 0, y: 0 });

    const onMouseDown = (e) => {
        pointer.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = (e) => {
        const { x, y } = pointer.current;
        if (Math.abs(e.clientX - x) < 10 && Math.abs(e.clientY - y) < 10) {
            getNewQuote()
        }
    };

    useEffect(() => {
        getNewQuote();
        return () => {
            window.removeEventListener("click", getNewQuote);
        };
    }, []);

    const getNewQuote = () => {
        axios.get(api).then((res) => {
            const { content, author } = res.data[0];
            setQuote({ content, author });
        });
    };

    return (
        <>
            <div onMouseDown={onMouseDown} onMouseUp={onMouseUp} className="w-100 vh-100 pt-6">
                <section className="text-light text-center">
                    <div className="container">
                        <div className="quote">
                            <i className="fa-solid fa-quote-left align-top"></i>
                            <span className="fs-4 fw-bold ms-1">
                                {quote.content}
                            </span>
                        </div>
                        <div className="mt-2"> - {quote.author} - </div>
                    </div>
                </section>
            </div>
        </>
    );
}
