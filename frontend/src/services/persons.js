import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () =>
  axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      alert(error);
      console.log("fail", error);
    });

const create = (newObject) =>
  axios
    .post(baseUrl, newObject)
    .then((res) => res.data)
    .catch((error) => {
      alert(error);
      console.log("fail", error);
    });

const update = (newObject) =>
  axios
    .put(`${baseUrl}/${newObject.id}`, newObject)
    .then((res) => res.data)
    .catch((error) => {
      alert(error);
      console.log("fail", error);
    });

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((resp) => resp.data);

export default {
  getAll,
  create,
  update,
  remove,
};
