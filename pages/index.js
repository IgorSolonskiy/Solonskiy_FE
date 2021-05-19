import {withoutAuth} from "../hof/withoutAuth";

import AuthLayout from "../components/layout/AuthLayout";
import Link from "next/link";

export default function Index() {
 return <AuthLayout>
     <div className='min-vh-100 d-flex flex-column justify-content-center align-items-center'>
         <h1 className='text-info'>In the course of what is happening</h1>
         <p className='h3 text-info'>Join Twitter now!</p>
         <Link href="/signup"><span className='btn btn-primary mt-2'>Register now</span></Link>
         <Link href="/login"><span className='btn btn-outline-primary mt-2'>To come in</span></Link>
     </div>
 </AuthLayout>
}

export const getServerSideProps = withoutAuth();