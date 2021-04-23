export default function AuthLayout({children}) {
    return (
        <div className="container d-flex align-items-start">
            <main className="min-vh-100 d-flex flex-column align-items-center justify-content-start w-75 m-auto">
                {children}
            </main>
        </div>
    )
}