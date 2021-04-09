import {allPostsByUser} from "../../gateway/postsGateway";
import {userInformation} from "../../gateway/userGateway";

import UserInfo from "../../components/user/UserInfo";
import List from "../../components/list/List";
import Post from '../../components/post/Post';
import MainLayout from "../../components/layout/MainLayout";

export default function UserPosts({user,posts}) {

    return (
        <MainLayout>
            <UserInfo user={user} postNumber={posts.length}>
                <List>
                    {posts.map(post => <Post key={post.id} post={post}/>)}
                </List>
            </UserInfo>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        const user = await userInformation(context.params.email,context);
        const posts = await allPostsByUser(context.params.email,context);

        return {props: {user,posts}};
    } catch (error) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
}