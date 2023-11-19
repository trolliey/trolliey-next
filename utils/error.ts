import { disconnect } from "./mongo";

const getError = (err: any) => {
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

const onError = async (err: any, req: any, res: any, next: any) => {
  await disconnect();

  if (err.response && err.response.status === 422) {
    // Handle 422 Unprocessable Entity errors
    const formattedErrors = formatErrors(
      err.response.data && err.response.data.errors
        ? err.response.data.errors
        : err.errors
    );
    res.status(422).send({ message: "Missing field(s)", errors: formattedErrors });
  } else if (err.response && err.response.status === 401) {
    // Handle 401 Unauthorized errors
    res.status(401).send({ message: "Unauthorized. Please login." });
  } else if (err.response && err.response.status === 502) {
    // Handle 502 Bad Gateway errors
    res.status(502).send({ message: "Server error. Please try again later." });
  } else {
    // Handle other types of errors with a generic message
    res.status(500).send({ message: "There seemes to be a problem on our side. Please try again later" });
  }
};

export { getError, onError };
