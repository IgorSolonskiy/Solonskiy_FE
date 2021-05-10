import {withAuth} from "../../hof/withAuth";
import {addUserThunkCreator} from "../../store/user/asyncActions/asyncActions";
import {addPostsListThunkCreator} from "../../store/posts/asyncAtions/asyncActions";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";

export default function ProfileUser() {
    return (
        <MainLayout>
            <UserProfile/>
            <PostsList/>
        </MainLayout>
    )
}

export const getServerSideProps = withAuth(async (ctx, auth, dispatch) => {
        try {
            await dispatch(addUserThunkCreator(ctx.query.username))
            await dispatch(addPostsListThunkCreator(ctx.query.username));

            if (ctx.query.username === auth.user.username) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    }
                }
            }

            return {props: {}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
)

