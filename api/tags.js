import Api from "../libs/Api";

export const getSearchHashtags = async (tag) => {
  const {data: response} = await Api.get(`tags?name=${tag}`);

  return response.data;
};

export default {
  search
}