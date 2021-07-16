// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";



// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
let colors: Array<string> = [];

const headers = {
    "content-type": "text/html; charset=UTF-8",
  };

app.handle("/", async (req) => {
    let query = req.url.replace(/\//g, "");
    const params = new URLSearchParams(query);
    let color = params.get("color");
  
    if (color) {
      colors.push(color);

      const colorList = colors.map((color) =>
            <li key={Array.prototype.indexOf(color)}>{color}</li>
      );

      const message = (
        <html>
        <head>
          <meta charSet="utf-8" />
          <title>Desafio Deno</title>
        </head>
        <body>
          <h1>Hello Servest con React!</h1>
          <p>Lista de colores:</p>
          <ul>{colorList}</ul>
        </body>
      </html>
      );
  
      await req.respond({
        status: 200,
        headers: new Headers(headers),
        body: ReactDOMServer.renderToString(message)
      });
    }
    else {
      const message = (
        <html>
          <head>
            <meta charSet="utf-8" />
            <title>Desafio Deno</title>
          </head>
          <body>
          <h1>Hello Servest con React!</h1>
            <form>
                <label>
                    Color:
                    <input style={{margin: `10px`}} type="text" name="color" />
                </label>
                <input type="submit" value="Submit" />
            </form>
          </body>
        </html>
      );
  
      await req.respond({
        status: 200,
        headers: new Headers(headers),
        body: ReactDOMServer.renderToString(message)
      });
    }
});

app.listen({ port: 8899 });