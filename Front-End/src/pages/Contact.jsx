import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="contact-us">
            <h2>Nous contacter</h2>
            {submitted ? (
                <div className="thank-you-message">
                    Merci de nous avoir envoyé un message ! Nous vous répondrons sous 24h.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                    <label htmlFor=''>Nom</label>
                    <input
                        type="text"
                        // placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor=''>Email</label>
                    <input
                        type="email"
                        // placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor=''>Message</label>
                    <textarea
                        placeholder="Entrez votre message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default Contact;
