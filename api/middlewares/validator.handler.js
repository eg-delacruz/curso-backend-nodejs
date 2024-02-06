//const boom = require('@hapi/boom');

//Property es la propiedad donde irá la data
function validatorHandler(schema, property) {
  //Closure: una función que retorna otra función
  return (req, res, next) => {
    //Lo hacemos dinámico, ya que puede estar en el body, los params, las query
    const data = req[property];
    //El abortEarly es para que envíe todos lo errores de forma conjunta y no uno a uno
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      //next(boom.badRequest(error));
      next(error);
    }
    //Si no hay ningún error, dejamos que el servicio siga ejecutándose
    next();
  };
}

module.exports = validatorHandler;
