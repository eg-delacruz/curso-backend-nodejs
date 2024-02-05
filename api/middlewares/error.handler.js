//Este middleware solamente lo muestra en la consola
function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  //Al enviar el err al next, hacemos que este sea un middleware de tipo error. Si no se envía, sería uno de tipo normal
  next(err);
}

//Este se encarga de enviar una respuesta al cliente. Es necesario poner los cuatro parámetros para que se detecte que es un middleware de tipo error
function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
  //Ya que no usamos el next aquí, este será el último middleware que vamos a ejecutar.
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
