import MainLayout from "../../../components/layout/MainLayout";
import {withRedux} from "../../../hof/withRedux";
import {withAuth} from "../../../hof/withAuth";
import ProfileCard from "../../../components/profile/ProfileCard";
import {
    followUserAsync, getUser,
    getUserAsync, unfollowUserAsync,
} from "../../../store/user/actions";
import {useDispatch} from "react-redux";
import FollowingsList from "../../../components/list/FollowingsList";
import FollowersList from "../../../components/list/FollowersList";
import {useRouter} from "next/router";
import {useQuery} from "@redux-requests/react";

export default function Follow({follow}) {
    const {data: {user:  {username}}} = useQuery(getUser());
    const {query: {page = 1}} = useRouter();
    const dispatch = useDispatch();
    const router = useRouter();

    const handlePaginateUsers = async pageNumber => router.push(`/users/${username}/${follow}?page=${pageNumber}`, undefined, {shallow: true});

    const handleFollowUser = username => dispatch(followUserAsync(username));

    const handleUnfollowUser = username => dispatch(unfollowUserAsync(username));

    const followingClass = follow === "followings"
        ? "border-bottom border-3 border-info text-info"
        : "text-muted";

    const followersClass = follow === "followers"
        ? "border-bottom border-3 border-info text-info"
        : "text-muted";

    const followController = follow === "followings"
        ?
        <FollowingsList page={page} onPaginationChange={handlePaginateUsers}
                        onFollow={handleFollowUser} onUnfollow={handleUnfollowUser}/>
        :
        <FollowersList page={page} onPaginationChange={handlePaginateUsers}
                       onFollow={handleFollowUser} onUnfollow={handleUnfollowUser}/>

    return <MainLayout>
        <ProfileCard/>
        <div className="d-flex w-50 justify-content-around">
        <span style={{cursor: "pointer"}} onClick={() => {
            if (follow === 'followings') return null;
            router.push(`/users/${username}/followings?page=1`)
        }}
              className={`fs-4 ${followingClass}`}>Following</span>
            <span style={{cursor: "pointer"}} onClick={() => {
                if (follow === 'followers') return null;
                router.push(`/users/${username}/followers?page=1`)
            }}
                  className={`fs-4  ${followersClass}`}>Followers</span>
        </div>
        {followController}
    </MainLayout>;
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, {user}, {dispatch}) => {
            try {
                if (!["followings", "followers"].includes(ctx.query.follow)) {
                    return {
                        notFound: true,
                    };
                }

                await dispatch(getUserAsync(ctx.query.username));

                return {props: {follow: ctx.query.follow}};
            } catch (e) {
                return {
                    notFound: true,
                };
            }
        },
    ));
