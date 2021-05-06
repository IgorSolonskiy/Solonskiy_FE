import {getUserInformation} from "../../api/users";
import {getUserPosts} from "../../api/posts";
import {withAuth} from "../../hof/withAuth";


import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import User from '../../components/user/User';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {postsActions} from "../../store/posts";
import {userActions} from "../../store/user";
import {profileActions} from "../../store/profile";

export default function ProfileUser({postsList, user,auth}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(postsActions.addPostsList(postsList));
        dispatch(userActions.addUser(user));
        dispatch(profileActions.addProfile(auth.user));
    }, [postsList]);


    return (
        <MainLayout>
            <div className='d-flex justify-content-start w-100'>
                <User/>
                <PostsList />
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = withAuth(async (ctx) => {
        try {
            const user = await getUserInformation(ctx.query.username);
            const postsList = await getUserPosts(ctx.query.username);

            return {props: {postsList, user}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
)

