import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
    const ticketList = tickets.map((ticket) => {
        return (
            <div key={ticket.id} className="ticket-card">
                <div>
                    <h3 className="ticket-title">{ticket.title}</h3>
                    <div className="ticket-price">
                        <span>$</span>{ticket.price}
                    </div>
                </div>
                <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`} className="view-btn">
                    View Details
                </Link>
            </div>
        );
    });

    return (
        <div className="container">
            <h1 className="section-title">Available Tickets</h1>
            <div className="ticket-grid">
                {ticketList}
            </div>
        </div>
    );
};


LandingPage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/tickets');

    return { tickets: data };
};

export default LandingPage;
