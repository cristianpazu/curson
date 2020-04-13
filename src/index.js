var http = require("http");
var url = require("url");
var querystring = require("querystring");
var {info,error} = require("./modules/mylog");
var cons = require("./utils/const");
var fire = require("../libs/firebase");
var {countries} = require("countries-list");
//request puedo obtener una informacion importante entrante
//response se utiliza para enviar la respuesta al cliente
var serve = http.createServer(function (request, response) {

  var parsed=url.parse(request.url);
  console.log("parsed", parsed);
    
  var pathname=parsed.pathname;

  var query = querystring.parse(parsed.query);
  console.log("query:", query);
  if (pathname == "/") {
    //aqui se dice si la ptecion se hiz de manera correcta
    response.writeHead(200, { "Content-type": "text/html" });
    response.write("<html><body><p>H<p></body></html>");
    response.end();// se manda al cliente 
  } else if (pathname == "/exit") {
    response.writeHead(200, { "Content-type": "text/html" });
    response.write("<html><body><p>B<p></body></html>");
    response.end();
  } else if (pathname == "/country") {
    response.writeHead(200, {"Content-type": "application/json" });
    response.write(JSON.stringify(countries[query.code]));
    response.end();
  } else if (pathname === "/error") {
    var result1 = error(pathname.url);
    response.writeHead(200, { "Content-type": "text/html" });
    response.write(result1);
    response.end();
  } else {
    response.writeHead(404, { "Content-type": "text/html" });
    response.write("<html><body><p>No found<p></body></html>");
    response.end();
  }
});
//donde quiero que me escuche el serve
serve.listen(4000);
console.log("runing on 4000");
