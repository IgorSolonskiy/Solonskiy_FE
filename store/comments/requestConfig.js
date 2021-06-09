export const metaDataByPaginate = {
  getData: (data) => {
    return {
      comments: data.data,
      cursor: data.links.next && data.links.next.match(/cursor=(\w+)/)[1],
    };
  },
  onSuccess: (response, action, store) => {
    const state = store.getState();
    const prevState = state.requests.queries["COMMENTS.SET_COMMENTS_LIST"].data;

    if (prevState) {
      response.data.comments = [
        ...prevState.comments,
        ...response.data.comments];
    }

    return response;
  },
};