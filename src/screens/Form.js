import React, {useState} from 'react';

export default function Form(props) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.setName(name)
        props.setPhoneNumber(phone)
        props.setIsDetailsEntered(true);
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
            <input type="text" id="name" value={name} required onChange={(e) => setName(e.target.value)}/>

            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" value={phone} required onChange={(e) => setPhone(e.target.value)}/>
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
