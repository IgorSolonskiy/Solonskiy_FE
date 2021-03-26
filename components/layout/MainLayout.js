import Link from 'next/link';

export default function MainLayout({children}) {
    return (
        <div className="container">
            <header className="header">
                <div className="header__logo"><i className="fab fa-twitter"></i></div>
                <nav className="navigation">
                    <ul className="menu">
                        <li className="menu__list"><Link href="/"><a className='menu__link'>Home</a></Link></li>
                    </ul>
                </nav>
            </header>
            <main className="page">
                {children}
            </main>
        </div>
    )
}