import {allPostsByUser} from "../../gateway/postsGateway";
import {confirmUser, userInformation} from "../../gateway/userGateway";

import UserInfo from "../../components/user/UserInfo";
import List from "../../components/list/List";
import Post from '../../components/post/Post';
import MainLayout from "../../components/layout/MainLayout";

export default function UserPosts({posts,user,postsUser}) {
    return (
        <MainLayout user={user} >
            <UserInfo user={postsUser} postNumber={posts.length}>
                <List>
                    {posts.map(post => <Post user={user} key={post.id} post={post}/>)}
                </List>
            </UserInfo>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        const user = await confirmUser(context);
        const postsUser = await userInformation(context.params.email,context);
        const posts = await allPostsByUser(context.params.email,context);

        return {props: {posts,user,postsUser}};
    } catch (error) {
        return {
            redirect: {
                destination: '/login',
                permanent: true,
            }
        }
    }
}