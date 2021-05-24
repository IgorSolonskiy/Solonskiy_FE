import Link from "next/link";

export default function Custom404 () {
  return (
    <div className="d-flex flex-column w-100 min-vh-100 justify-content-center align-items-center">
      <h1>404 - Page Not Found! &#128554;</h1>
      <Link href="/"><span className="btn btn-outline-success mt-2">Back to home</span></Link>
    </div>
  );
}