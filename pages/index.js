import MainLayout from "../components/MainLayout";
import axios from 'axios';

export default function Home({users}) {
    return (
        <MainLayout>
            <ul className="users">
                {users.map(user=>(
                    <li key={user.id} className="users__item">
                    <span className='users__name'>{user.name}</span>
                    <span className='users__email'>{user.email}</span>
                    <span className='users__id'>{user.id}</span>
                    <span className='users__tel'>{user.tel}</span>
                    </li>
                ))}
            </ul>
        </MainLayout>
    )
}

Home.getInitialProps = async (ctx) => {
    const usersList = await axios.get('http://127.0.0.1:8000/api/users');

    return {users: usersList.data}
}
