import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title,
            price,
        },
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = (event) => {
        event.preventDefault();

        doRequest();
    };

    const onBlur = () => {
        const value = parseFloat(price);

        if (isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    };

    return (
        <div className="signup-container">
            <div className="glass-card">
                <div className="signup-header">
                    <h1>Create a Ticket</h1>
                    <p className="signup-subtitle">List your ticket for others to buy</p>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                            placeholder="e.g. Coldplay Concert"
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            value={price}
                            onBlur={onBlur}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control"
                            placeholder="0.00"
                        />
                    </div>
                    {errors}
                    <button className="signup-btn">Create Ticket</button>
                </form>
            </div>
        </div>
    );
};


export default NewTicket;
