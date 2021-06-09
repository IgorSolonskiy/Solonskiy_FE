export const metaDataByPaginate = {
  getData: (data) => {
    return {
      posts: data.data,
      cursor: data.links.next && data.links.next.match(/cursor=(\w+)/)[1],
    };
  },
  onSuccess: (response, action, store) => {
    const state = store.getState();
    const prevState = state.requests.queries["POSTS.SET_POSTS_LIST"].data;

    if (prevState) {
      response.data.posts = [...prevState.posts, ...response.data.posts];
    }

    return response;
  },
};

export const metaDataAddPost = {
  mutations: {
    updateData: (prevState, post) => {
      return prevState.cursor ? prevState : {
        ...prevState,
        posts: [...prevState.posts, post],
      };
    },
  },
};