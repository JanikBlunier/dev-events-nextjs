'use client'

import {useState} from "react";

export default function BookEvent() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);

    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm"> Thx for signing up</p>
            ): (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your Email"
                        />
                    </div>

                    <button type="submit" className="button-submit">Submit</button>
                </form>
            )
            }
        </div>
    )
}