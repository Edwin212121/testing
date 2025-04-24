import React, { useState } from 'react';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError('All fields are required.');
            return;
        }
        setError('');
        // Here you would typically handle the form submission, e.g., sending data to an API
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="contact-form">
            <h2>Contact Me</h2>
            {success && <p className="success-message">Your message has been sent!</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ContactForm;