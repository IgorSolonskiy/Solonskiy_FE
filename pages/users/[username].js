import {userInformation} from "../../gateway/usersGateway";
import {userPosts} from "../../gateway/postsGateway";

import Link from "next/link";
import List from "../../components/list/List";
import Post from "../../components/post/Post";
import MainLayout from "../../components/layout/MainLayout";

export default function User({postsList, user}) {
    return (
        <MainLayout user={user}>
            <div className='d-flex justify-content-start w-100'>
                <div className="d-flex flex-column   w-50">
                    <Link href="/"><span className='btn btn-outline-success mt-2 w-25'>Home</span></Link>
                    <h1 className='fs-3 m-0 mt-3'> {user.name}</h1>
                    <div className='fs-3'>Number of posts: {postsList.length}</div>
                </div>
                <List>
                    {postsList.map(post => <Post user={!user} key={post.id} post={post}/>)}
                </List>
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        const user = await userInformation(context.query.username);
        const postsList = await userPosts(context.query.username);

        return {props: {postsList, user}};
    } catch (error) {
        return {notFound: true}
    }
}