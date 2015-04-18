module.exports.process = function(request, response) {

  response.send(request.query);

};