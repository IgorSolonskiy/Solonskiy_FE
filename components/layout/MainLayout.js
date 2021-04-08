import Link from 'next/link';

export default function MainLayout({children}) {
    return (
        <div className="container" >
            <main className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
                {children}
            </main>
        </div>
    )
}