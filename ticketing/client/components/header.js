import Link from 'next/link';

const Header = ({ currentUser }) => {
    const links = [
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        !currentUser && { label: 'Sign Up', href: '/auth/signup', className: 'nav-cta' },
        currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
        currentUser && { label: 'My Orders', href: '/orders' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href, className }) => {
            return (
                <li key={href} className="nav-item">
                    <Link href={href} className={className || 'nav-link-custom'}>
                        {label}
                    </Link>
                </li>
            );
        });

    return (
        <nav className="navbar-custom">
            <Link href="/" className="brand-custom">
                GitTix
            </Link>

            <div className="nav-links-container">
                <ul className="nav-list-custom">
                    {links}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
