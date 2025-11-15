const globalError = (err, req, res, next) => {
  //here case if the end point return err acces this err if not
  //global err handling middleware
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
export default globalError;
