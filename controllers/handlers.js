/**
 * serviceHandler - This function takes in a function reference as
 * an argument and pass to it the data argument to perform a specific
 * service and return a response.
 *
 * @service: the function to be run
 * @data: the data to be passed to the function
 * @res: the response object which the service will handle
 *
 * Return: Just invoking the service function, no return
 */
function serviceHandler(service, data, res) {
  service(data)
    .then(async (response) => {
      if (response.hasOwnProperty('error')) {
        const error = response.error;
        res.status(error.code).json({ errors: [{ msg: error.msg }] });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(async (err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
}


export {
  serviceHandler
}
