import Instance from "../libs/Instance";

const search = async (tag) => {
  const {data: response} = await Instance.get(`tags?name=${tag}`);

  return response.data;
};

export default {
  search
}