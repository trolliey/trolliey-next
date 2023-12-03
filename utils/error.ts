import { disconnect } from "./mongo";

const onError = (err: any) => {
  console.log(err.response.data.errors,"err.response.status")
  return (
    err.response &&
    err.response.data &&
    err.response.data.message
      ? err.response.data.message
      : err.message
  );
  
};


const formatErrors = (errors: Record<string, string[]>) => {
  const formattedErrors: Record<string, string> = {};
  for (const key in errors) {
    formattedErrors[key] = errors[key][0]; // Take the first error message for simplicity
  }
  return formattedErrors;
};

const getError = async (err: any) => {
  await disconnect();

  let errorMessage = '';

  if (err.response && err.response.status === 422) {
    // Handle 422 Unprocessable Entity errors
    const errorsData = err.response.data && err.response.data.errors;
    const formattedErrors = formatErrors(errorsData ? errorsData : err.errors);

    if (Array.isArray(formattedErrors)) {
      errorMessage = formattedErrors.map(error => error.message).join(', ');
    } else if (typeof formattedErrors === 'object') {
      // Handle the case when formattedErrors is an object
      const errorMessages = Object.values(formattedErrors).map(error => error);
      errorMessage = errorMessages.join(', ');
    } else {
      errorMessage = formattedErrors;
    }

    return errorMessage; // Return only the error message
  } else if (err.response && err.response.status === 401) {
    // Handle 401 Unauthorized errors
    errorMessage = "Unauthorized. Please login.";
    return errorMessage; // Return only the error message
  } else if (err.response && err.response.status === 502) {
    // Handle 502 Bad Gateway errors
    errorMessage = "Server error. Please try again later.";
    return errorMessage; // Return only the error message
  } else {
    // Handle other types of errors with a generic message
    errorMessage = "There seems to be a problem on our side. Please try again later";
    return errorMessage; // Return only the error message
  }
};





console.log(getError,"getError")

export { getError, onError };
