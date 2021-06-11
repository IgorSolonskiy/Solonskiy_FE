export const postsActionTypes = {
  SET_POSTS_LIST: "POSTS.SET_POSTS_LIST",
  ADD_ONE_POST_LIST: "POSTS.ADD_POST_LIST",
  REMOVE_POST: "POSTS.REMOVE_POST",
  SET_POST: "POSTS.SET_POST",
  CHANGE_POST: "POSTS.CHANGE_POST",
};

export const setPostsList = () => ({
  type: postsActionTypes.SET_POSTS_LIST,
});

export const setPost = () => ({
  type: postsActionTypes.SET_POST,
});

export const getPostsListAsync = (username, cursor = "") => ({
  type: postsActionTypes.SET_POSTS_LIST,
  request: {
    url: `users/${username}/posts?cursor=${cursor}`,
  },
  meta: {
    getData: (data, prevState) => {
      return {
        posts: prevState ? [...prevState.posts, ...data.data] : data.data,
        cursor: data.links.next
            ? data.links.next.match(/cursor=(\w+)/)[1]
            : data.links.next,
      };
    },
  },
});

export const getPostsByTagAsync = (tag, cursor = "") => ({
  type: postsActionTypes.SET_POSTS_LIST,
  request: {
    url: `tags/${tag}/posts?cursor=${cursor}`,
  },
  meta: {
    getData: (data, prevState) => {
      return {
        posts: prevState ? [...prevState.posts, ...data.data] : data.data,
        cursor: data.links.next
            ? data.links.next.match(/cursor=(\w+)/)[1]
            : data.links.next,
      };
    },
  },
});

export const addOnePostListAsync = (content) => ({
  type: postsActionTypes.ADD_ONE_POST_LIST,
  request: {
    url: "posts",
    params: content,
    method: "post",
  },
  meta: {
    mutations: {
      [postsActionTypes.SET_POSTS_LIST]: {
        updateData: (prevState, post) => {
          return prevState.cursor ? prevState : {
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

export const changePostAsync = (id, post) => ({
  type: postsActionTypes.CHANGE_POST,
  request: {
    url: `posts/${id}`,
    method: "put",
    params: post,
  },
  meta: {
    mutations: {
      [postsActionTypes.SET_POSTS_LIST]: {
        updateData: (prevState, changedPost) => {
          return {
            ...prevState,
            posts: prevState.posts.map(
                post => post.id === id ? changedPost : post),
          };
        },
      },
      [postsActionTypes.SET_POST]: {
        updateData: (prevState, updatePost) => {
          return {
            ...prevState,
            post: updatePost,
          };
        },
      },
    },
  },
});

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