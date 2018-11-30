import axios from "axios";
import { GET_ERRORS, GET_UPLOADED_FILE } from "./types";

export const fileUpload = file => async dispatch => {
  try {
    const res = await axios.post(`/fileUpload/`, {
      onUploadProgress: progressEvent => {
        console.log(
          "Uploaded Progress: " +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            "%."
        );
      }
    });
    dispatch({
      type: GET_UPLOADED_FILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
