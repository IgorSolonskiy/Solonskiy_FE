import apiClient from "../../libs/apiClient";

export const postsActionTypes = {
  SET_POSTS_LIST: "POSTS.SET_POSTS_LIST",
  ADD_ONE_POST_LIST: "POSTS.ADD_POST_LIST",
  REMOVE_POST: "POSTS.REMOVE_POST",
  SET_POST: "POSTS.SET_POST",
  CHANGE_POST: "POSTS.CHANGE_POST",
  SET_POST_ID: "POSTS.SET_POST_ID",
  SET_FETCHING: "POSTS.SET_FETCHING",
};

export const setPostsList = () => ({
  type: postsActionTypes.SET_POSTS_LIST,
});
export const addOnePostList = () => ({
  type: postsActionTypes.ADD_ONE_POST_LIST,
});
export const setPost = () => ({
  type: postsActionTypes.SET_POST,
});
export const removePost = () => ({
  type: postsActionTypes.REMOVE_POST,
});
export const changePost = () => ({
  type: postsActionTypes.CHANGE_POST,
});
export const setPostId = () => ({
  type: postsActionTypes.SET_POST_ID,
});
export const setFetching = () => ({
  type: postsActionTypes.SET_FETCHING,
});

export const getPostsByPaginateAsync = (username, cursor = "") => ({
  type: postsActionTypes.SET_POSTS_LIST,
  request: {
    url: `users/${username}/posts?cursor=${cursor}`,
  },
  meta: {
    mutations: {
      [postsActionTypes.SET_POSTS_LIST]: {
        updateData: ({posts: prevPosts}, {data: posts, links: {next}}) => {
          return {
            posts: [...prevPosts, ...posts],
            cursor: next && next.match(/cursor=(\w+)/)[1],
          };
        },
      },
    },
  },
});

export const getPostsListAsync = (username, cursor = "") => ({
  type: postsActionTypes.SET_POSTS_LIST,
  request: {
    url: `users/${username}/posts?cursor=${cursor}`,
  },
  meta: {
    getData: (data) => {
      return {
        posts: data.data,
        cursor: data.links.next && data.links.next.match(/cursor=(\w+)/)[1]
      };
    },
  },
});

export const getPostsByTagAsync = (tag, cursor) => ({
  type: postsActionTypes.SET_POSTS_LIST,
  request: {
    url: `tags/${tag}/posts?cursor=${cursor}`,
  },
});

export const addOnePostListAsync = ({content}) => ({
  type: postsActionTypes.ADD_ONE_POST_LIST,
  request: {
    url: "posts",
    params: {
      content,
    },
    method: "post",
  },
  meta: {
    mutations: {
      [postsActionTypes.SET_POSTS_LIST]: {
        updateData: (prevState, post) => {
          return {
            ...prevState,
            posts: [...prevState.posts, post],
          };
        },
      },
    },
  },
});

export const setPostAsync = (id) => ({
  type: postsActionTypes.SET_POST,
  request: {
    url: `posts/${id}`,
  },
  meta: {
    getData: (data) => {
      return {
        post: data,
        postId: data.id,
      };
    },
  },
});

export const changePostAsync = (id, post) => async dispatch => {
  const {data: response} = await apiClient.put(`posts/${id}`, post);

  dispatch(changePost(response));
};

export const deletePostAsync = (id) => ({
  type: postsActionTypes.REMOVE_POST,
  request: {
    url: `posts/${id}`,
    method: "delete",
  },
  meta: {
    mutations: {
      [postsActionTypes.SET_POSTS_LIST]: {
        updateData: (prevState) => {
          return {
            ...prevState,
            posts: prevState.posts.filter(post => post.id !== id),
          };
        },
      },
    },
  },
});