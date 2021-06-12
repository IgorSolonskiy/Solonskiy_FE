export const postsActionTypes = {
  GET_POSTS: "POSTS.GET_POSTS",
  GET_POST: "POSTS.GET_POST",
  SET_POST: "POSTS.SET_POST",
  DELETE_POST: "POSTS.DELETE_POST",
  UPDATE_POST: "POSTS.UPDATE_POST",
};

export const getPosts = () => ({
  type: postsActionTypes.GET_POSTS,
});

export const getPost = () => ({
  type: postsActionTypes.GET_POST,
});

export const getPostsAsync = (username, cursor = "") => ({
  type: postsActionTypes.GET_POSTS,
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
  type: postsActionTypes.GET_POSTS,
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

export const createPostAsync = (content) => ({
  type: postsActionTypes.SET_POST,
  request: {
    url: "posts",
    params: content,
    method: "post",
  },
  meta: {
    mutations: {
      [postsActionTypes.GET_POSTS]: {
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

export const getPostAsync = (id, cursor = "") => ({
  type: postsActionTypes.GET_POST,
  request: [{url: `posts/${id}`}, {url: `posts/${id}/comments?cursor=${cursor}`}],
  meta: {
    getData: (data, prevState) => {
      return {
        post: data[0],
        postId: data[0].id,
        comments: prevState ? [...prevState.comments, ...data[1].data] : data[1].data,
        cursor: data[1].links.next && data[1].links.next.match(/cursor=(\w+)/)[1],
      };
    },
  },
});

export const updatePostAsync = (id, post) => ({
  type: postsActionTypes.UPDATE_POST,
  request: {
    url: `posts/${id}`,
    method: "put",
    params: post,
  },
  meta: {
    mutations: {
      [postsActionTypes.GET_POSTS]: {
        updateData: (prevState, changedPost) => {
          return {
            ...prevState,
            posts: prevState.posts.map(
                post => post.id === id ? changedPost : post),
          };
        },
      },
      [postsActionTypes.GET_POST]: {
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
  type: postsActionTypes.DELETE_POST,
  request: {
    url: `posts/${id}`,
    method: "delete",
  },
  meta: {
    mutations: {
      [postsActionTypes.GET_POSTS]: {
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