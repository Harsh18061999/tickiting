const OrderIndex = ({ orders }) => {
    return (
        <div className="container">
            <h1 className="section-title">My Orders</h1>
            <div className="glass-card" style={{ maxWidth: '800px', margin: '2rem auto' }}>
                <ul className="error-list" style={{ listStyle: 'none', padding: 0 }}>
                    {orders.map((order) => {
                        const statusColor = order.status === 'complete' ? '#4ade80' : '#ff8a97';
                        return (
                            <li key={order.id} style={{
                                padding: '1.5rem',
                                borderBottom: '1px solid var(--border-color)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{order.ticket.title}</span>
                                <span style={{
                                    padding: '0.4rem 1rem',
                                    borderRadius: '50px',
                                    background: `${statusColor}22`,
                                    color: statusColor,
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    border: `1px solid ${statusColor}44`
                                }}>
                                    {order.status}
                                </span>
                            </li>
                        );
                    })}
                </ul>
                {orders.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        You haven't placed any orders yet.
                    </div>
                )}
            </div>
        </div>
    );
};


OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');

    return { orders: data };
};

export default OrderIndex;
