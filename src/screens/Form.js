import {useState} from 'react';

export default function Form(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(props.picks);
    }
    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh'
        }}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            <button type="submit" style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                backgroundColor: '#0077cc',
                color: '#fff',
                border: 'none',
                cursor: 'pointer'
            }}>Submit
            </button>
        </form>
    );
};
