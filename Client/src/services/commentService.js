import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError } from '../configs/toastConfig';

const commetServices = {
  addComment: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.COMMENT}`, requestBody);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getCommentsByProductId: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.COMMENT}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getAllComments: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.COMMENT}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateComment: async (resquestParrams) => {
    try {
      const { data } = await http.put(`/${END_POIND_API.COMMENT}/${resquestParrams}`);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  deleteComment: async (requestParams) => {
    try {
      const { data } = await http.delete(`/${END_POIND_API.COMMENT}/${requestParams}`);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};

export default commetServices;