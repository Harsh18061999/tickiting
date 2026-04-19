import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id,
        },
        onSuccess: () => Router.push('/orders'),
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    if (timeLeft < 0) {
        return (
            <div className="order-container">
                <div className="timer-card">
                    <h1 className="section-title">Order Expired</h1>
                    <p className="order-expired">
                        Sorry, the time to purchase this ticket has run out.
                        Please go back and try again.
                    </p>
                </div>
            </div>
        );
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="order-container">
            <h1 className="section-title">Review Your Order</h1>
            <div className="timer-card">
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    Purchasing: <strong>{order.ticket.title}</strong>
                </p>

                <div className="timer-display">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Time remaining to complete your payment
                </p>

                <StripeCheckout
                    token={({ id }) => doRequest({ token: id })}
                    stripeKey="pk_test_51TNV3ZRDRm7pHWYBcuwyGHFX5G232bCiw33JvoiDbaYdrXiwwHg9rbSVw0mlwCwWcBA47jOKvsSOfKKXrOSDANBG00bWGsGZhM"
                    amount={order.ticket.price * 100}
                    email={currentUser.email}
                >
                    <button className="premium-btn" style={{ width: '100%' }}>
                        Pay ${order.ticket.price}
                    </button>
                </StripeCheckout>

                {errors}
            </div>
        </div>
    );
};


OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
};

export default OrderShow;
