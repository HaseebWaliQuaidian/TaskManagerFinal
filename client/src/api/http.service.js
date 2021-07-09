import axios from "axios";

export const get = async (url) => {
  try {
    let res = await axios.get(url);
    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return parseErrors(error.response);
  }
};

export const getById = async (url, id) => {
  try {
    let res = await axios.get(`${url}/${id}`);
    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return parseErrors(error.response);
  }
};

export const create = async (url, data) => {
  try {
    let res =  await axios.post(url, data);

    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: error.response.data && error.response.data.success || false,
      data: null,
      message: error.response.data && error.response.data.message || "Something went wrong contact adminstrator",
    };

  }
};

export const putCall = async (url, data) => {
  try {
    let res = await axios.put(url, data);
    
    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: error.response.data && error.response.data.success || false,
      data: null,
      message: error.response.data && error.response.data.message || error.response.data.errors || "Something went wrong contact adminstrator",
    };
    // return parseErrors(error.response);
  }
};

export const update = async (url, id, data, isAuthenticated = true) => {
  try {
    let res = await axios.put(`${url}/${id}`, data);
    
    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return parseErrors(error.response);
  }
};

export const del = async (url, id, isAuthenticated = true) => {
  try {
    let res = await axios.delete(`${url}/${id}`);
    
    return {
      success: res.data.success,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return parseErrors(error.response);
  }
};


export const parseErrors = (errObj) => {
    try {
      let message = "";
      const { errors } = errObj.data;
      switch (errObj.status) {
        case 400:
          errors.map((obj, index) => {
            message = `${message + obj.param.toUpperCase()}: ${obj.msg}`;
            message = index === errors.length - 1 ? message : `${message} ,`;
            return message;
          });
          return {
            success: false,
            message,
          };
        case 401:
          return {
            success: false,
            message:
              errObj.data && errObj.data.message
                ? errObj.data.message
                : "You are not authorized. Please login",
          };
        case 403:
        case 404:
        case 409:
        case 422:
          return {
            success: false,
            message: errObj.data
              ? errObj.data.message
              : errObj.message
              ? errObj.message
              : "An error occurred while processing your request.",
          };
        default:
          return {
            success: false,
            message: "An error occurred while processing your request.",
          };
      }
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while processing your request.",
      };
    }
  };