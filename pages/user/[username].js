import {userPosts} from "../../gateway/postsGateway";
import {userInformation} from "../../gateway/usersGateway";

import UserInfo from "../../components/user/UserInfo";
import List from "../../components/list/List";
import MainLayout from "../../components/layout/MainLayout";
import Post from "../../components/post/Post";

export default function User({user, posts}) {
    return (
        <MainLayout>
            <UserInfo user={user} postNumber={posts.length}>
                <List>
                    {posts.map(post => <Post user={!user} key={post.id} post={post}/>)}
                </List>
            </UserInfo>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    try {
        const user = await userInformation(context.params.username, context);
        const posts = await userPosts(context.params.username, context);

        return {props: {user, posts}};
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
}