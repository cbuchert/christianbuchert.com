const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

app.prepare()
   .then(() => {
     const server = express();

     server.get("/blog/post/:id", (request, response) => {
       const actualPage = "/blog/post";
       const queryParams = { id: request.params.id };

       app.render(request, response, actualPage, queryParams);
     });

     server.get("*", (request, response) => {
       return handle(request, response);
     });

     server.listen(port, error => {
       if (error) throw error;

       console.log(`Ready on http://localhost:${port}`);
     });
   })
   .catch(exception => {
     console.error(exception.stack);
     process.exit(1);
   });
