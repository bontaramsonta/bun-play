import { readableStreamToArrayBuffer, serve, sha } from "bun";
import sharp from "sharp";

serve({
  async fetch(request, server) {
    if (request.body !== null) {
      const body = await readableStreamToArrayBuffer(request.body);
      const buffer = await sharp(body).tint({ r: 0, g: 0, b: 255 }).toBuffer({
        resolveWithObject: true,
        fileOut: "img.png",
      });
      console.log(buffer.info);
      return new Response(buffer.data, {
        headers: {
          "Content-Type": "image/png",
        },
      });
    }
    return new Response("Hello, world!");
  },
  port: 3040,
  development: true,
});
console.log("Server started at http://localhost:3040");
