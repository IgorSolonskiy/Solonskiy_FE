import Link from 'next/link';

export default function MainLayout({children}) {
    return (
        <div className="container">
            <header className="header">
                <div className="header__logo"><i className="fab fa-twitter"></i></div>
                <nav className="navigation">
                    <ul className="menu">
                        <li className="menu__list"><Link href="/"><a className='menu__link'>Home</a></Link></li>
                        <li className="menu__list"><Link href="/Explore"><a className='menu__link'>Explore</a></Link>
                        </li>
                        <li className="menu__list"><Link href="/Notifications"><a
                            className='menu__link'>Notifications</a></Link></li>
                        <li className="menu__list"><Link href="/Messages"><a className='menu__link'>Messages</a></Link>
                        </li>
                        <li className="menu__list"><Link href="/Lists"><a className='menu__link'>Lists</a></Link></li>
                        <li className="menu__list"><Link href="/Topics"><a className='menu__link'>Topics</a></Link></li>
                        <li className="menu__list"><Link href="/Profile"><a className='menu__link'>Profile</a></Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="page">
                {children}
            </main>
        </div>
    )
}