export const extractErrorMessage = (error) => {
  if (!error) return null;

  if (error.response?.data) {
    const data = error.response.data;

    if (data.errors && Array.isArray(data.errors)) {
      return data.errors.map((err) => err.message).join(",");
    }

     if(data.message) {
    return data.message
  }
    if(data.error) {
    return data.error
  }

  }

  if(error.response && !error.response) {
    return 'Network Error, Please check your connection'
  }

  if(error.message) {
    return error.message
  }
 
  return 'Somthing went wrong. please try again'


};
