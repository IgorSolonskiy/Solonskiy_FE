import {getUserInformation} from "../../api/users";
import {getUserPosts} from "../../api/posts";
import {withAuth} from "../../hof/withAuth";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {postsActions} from "../../store/posts";
import {userActions} from "../../store/user";
import {profileActions} from "../../store/profile";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";

export default function ProfileUser({postsList, user, auth}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(postsActions.addPostsList(postsList));
        dispatch(postsActions.addPost(null));
        dispatch(userActions.addUser(user));
        dispatch(profileActions.addProfile(auth.user));

        return ()=>dispatch(userActions.removeUser());
    }, [postsList]);


    return (
        <MainLayout>
            <UserProfile/>
            <PostsList/>
        </MainLayout>
    )
}

export const getServerSideProps = withAuth(async (ctx, auth) => {
        try {
            const user = await getUserInformation(ctx.query.username);
            const postsList = await getUserPosts(ctx.query.username);

            if (user.id === auth.user.id) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    }
                }
            }

            return {props: {postsList, user}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
)

