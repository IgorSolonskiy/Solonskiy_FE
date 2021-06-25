import {withRedux} from "../../../hof/withRedux";
import {withAuth} from "../../../hof/withAuth";
import {useRouter} from "next/router";
import {useQuery} from "@redux-requests/react";
import {useDispatch} from "react-redux";
import {followUserAsync, getUser, getUserAsync, unfollowUserAsync,} from "../../../store/user/actions";

import FollowingsList from "../../../components/list/FollowingsList";
import FollowersList from "../../../components/list/FollowersList";
import ProfileCard from "../../../components/profile/ProfileCard";
import MainLayout from "../../../components/layout/MainLayout";
import classNames from "classnames";

export default function Follow({follow}) {
    const {data: {user: {username}}} = useQuery(getUser());
    const {query: {page = 1}} = useRouter();
    const dispatch = useDispatch();
    const router = useRouter();

    const handlePaginateUsers = async pageNumber => router.push(`/users/${username}/${follow}?page=${pageNumber}`, undefined, {shallow: true});

    const handleFollowUser = username => dispatch(followUserAsync(username));

    const handleUnfollowUser = username => dispatch(unfollowUserAsync(username));

    const handleLinkFollowings = () => follow !== 'followings' ? router.push(`/users/${username}/followings?page=1`) : null

    const handleLinkFollowers = () => follow !== 'followers' ? router.push(`/users/${username}/followers?page=1`) : null

    const followingClass = classNames({
        'border-bottom border-3 border-info text-info': follow === "followings",
        "text-muted": follow !== "followings"
    })

    const followersClass = classNames({
        'border-bottom border-3 border-info text-info': follow === "followers",
        "text-muted": follow !== "followers"
    })

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
            <span style={{cursor: "pointer"}} onClick={handleLinkFollowings}
                  className={`fs-4 ${followingClass}`}>Following</span>
            <span style={{cursor: "pointer"}} onClick={handleLinkFollowers}
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
