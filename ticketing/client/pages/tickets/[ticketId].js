import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const TicketShow = ({ ticket }) => {
    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id,
        },
        onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`),
    });

    return (
        <div className="signup-container">
            <div className="glass-card">
                <div className="signup-header">
                    <h1>{ticket.title}</h1>
                    <div className="ticket-price">
                        <span>$</span>{ticket.price}
                    </div>
                </div>

                <div style={{ marginBottom: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Secure this ticket now before it's gone!
                </div>

                {errors}
                <button
                    onClick={() => doRequest()}
                    className="premium-btn"
                    style={{ width: '100%' }}
                >
                    Purchase Ticket
                </button>
            </div>
        </div>
    );
};


TicketShow.getInitialProps = async (context, client) => {
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);

    return { ticket: data };
};

export default TicketShow;
