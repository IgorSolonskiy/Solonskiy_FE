import MainLayout from "../../components/layout/MainLayout";
import {withRedux} from "../../hof/withRedux";
import {withAuth} from "../../hof/withAuth";
import ProfileCard from "../../components/profile/ProfileCard";
import {
  followUserAsync,
  getFollowersAsync,
  getFollowingAsync,
  getUserAsync, unfollowUserAsync,
} from "../../store/user/actions";
import UsersList from "../../components/list/UsersList";
import {useDispatch} from "react-redux";
import Link from "next/link";

export default function Follow({follow, auth}) {
  const dispatch = useDispatch();

  const handlePaginateUsers = page => dispatch(
      follow === "following"
          ? getFollowingAsync(auth.user.username, page)
          : getFollowersAsync(page));

  const handleFollowUser = username => dispatch(followUserAsync(username));

  const handleUnfollowUser = username => dispatch(unfollowUserAsync(username));

  const followingClass = follow === "following"
      ? "border-bottom border-3 border-info text-info"
      : "text-muted";

  const followersClass = follow === "followers"
      ? "border-bottom border-3 border-info text-info"
      : "text-muted";

  return <MainLayout>
    <ProfileCard/>
    <div className="d-flex w-50 justify-content-around">
      <Link href={"/profile/following"}>
        <span style={{cursor: "pointer"}}
              className={`fs-4 ${followingClass}`}>Following</span>
      </Link>
      <Link href={"/profile/followers"}>
        <span style={{cursor: "pointer"}}
              className={`fs-4  ${followersClass}`}>Followers</span>
      </Link>
    </div>
    <UsersList onPaginationChange={handlePaginateUsers}
               onFollow={handleFollowUser} onUnfollow={handleUnfollowUser}/>
  </MainLayout>;
}

export const getServerSideProps = withRedux(
    withAuth(async (ctx, {user}, {dispatch}) => {
          try {
            if (!["following", "followers"].includes(ctx.query.follow)) {
              return {
                notFound: true,
              };
            }
            await dispatch(getUserAsync(user.username)),
                ctx.query.follow === "following" ?
                    await dispatch(getFollowingAsync(user.username))
                    :
                    await dispatch(getFollowersAsync(user.username));

            return {props: {follow: ctx.query.follow}};
          } catch (e) {
            console.log(e);
            return {
              notFound: true,
            };
          }
        },
    ));
