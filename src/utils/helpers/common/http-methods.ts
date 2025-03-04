import axios from "axios";
import { errorMessages, warningMessages } from "../enums/messages.enum";
import { errorToaster } from "./alert-service";

// export const postRequest = async (url: string, data: any, params: any = {}) => {
//     try {
//         const response = await axios.post(url, data, { params });
//         return response.data;
//     } catch (error) {
//         return errorHandler(error);
//     }
// };

// export const getRequest = async (url: string, params: any = {}) => {
//     try {
//         const response: any = await axios.get(url, { params });
//         return response.data;
//     } catch (error) {
//         return errorHandler(error);
//     }
// };

// export const putRequest = async (url: string, data: any, params: any = {}) => {
//     try {
//         const response: any = await axios.put(url, data, { params });
//         return response.data;
//     } catch (error) {
//         return errorHandler(error);
//     }
// };

// export const patchRequest = async (url: string, data: any, params: any = {}) => {
//     try {
//         const response: any = await axios.patch(url, data, { params });
//         return response.data;
//     } catch (error) {
//         return errorHandler(error);
//     }
// };

// export const deleteRequest: any = async (url: string, params: any = {}) => {
//     try {
//         const response = await axios.delete(url, { params });
//         return response?.data;
//     } catch (error) {
//         return errorHandler(error);
//     }
// }

// const errorHandler = (error: any) => {
//     let message = "";
//     if (error.response) {
//         const res = error.response.data;
//         if (error.response.status === 401) {
//             errorToaster(warningMessages.sessionExpired);
//         } else {
//             errorToaster(errorMessages.somethingWentWrong);
//         }
//         if (res) {
//             message = res.message || res.metadata?.message;
//         } else {
//             message = JSON.stringify(res);
//         }
//     } else if (error?.message) {
//         message = error.message;
//         errorToaster(message);
//     }

//     return { error: message };
// };

const devOrigin: string = "bzu.umsoncloud.com";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers: any = {
    Authorization: `Bearer ${token}`,
    devOrigin,
  };
  if (
    process.env.REACT_APP_PRODUCTION_MODE ||
    window.location.hostname === "localhost"
  ) {
    delete headers.devOrigin;
  }
  return headers;
};

export const postRequest = async (url: string, data: any, params: any = {}) => {
  try {
    const headers = getHeaders();
    const response = await axios.post(url, data, { params, headers });
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const getRequest = async (url: string, params: any = {}) => {
  try {
    const headers = getHeaders();
    const response: any = await axios.get(url, { params, headers });
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const putRequest = async (url: string, data: any, params: any = {}) => {
  try {
    const headers = getHeaders();
    const response: any = await axios.put(url, data, { params, headers });
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const patchRequest = async (
  url: string,
  data: any,
  params: any = {}
) => {
  try {
    const headers = getHeaders();
    const response: any = await axios.patch(url, data, { params, headers });
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const deleteRequest: any = async (url: string, params: any = {}) => {
  try {
    const headers = getHeaders();
    const response = await axios.delete(url, { params, headers });
    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

const errorHandler = (error: any) => {
  let message = "";
  if (error.response) {
    const res = error.response.data;
    if (error.response.status === 401) {
      errorToaster(warningMessages.sessionExpired);
    } else {
      errorToaster(errorMessages.somethingWentWrong);
    }
    if (res) {
      message = res.message || res.metadata?.message;
    } else {
      message = JSON.stringify(res);
    }
  } else if (error?.message) {
    message = error.message;
    errorToaster(message);
  }

  return { error: message };
};
