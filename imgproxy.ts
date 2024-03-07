import env from "./env.json";
import { serve, sleep } from "bun";
import { createHmac } from "crypto";

const KEY = env.imgProxyKey;
const SALT = env.imgProxySalt;

const hexDecode = (hex: string) => Buffer.from(hex, "hex");

const sign = (salt: string, target: string, secret: string) => {
  const hmac = createHmac("sha256", hexDecode(secret));
  hmac.update(hexDecode(salt));
  hmac.update(target);

  return hmac.digest("base64url");
};

// const path = `/wm:1:soea/${base64encoded}`;

// const signature = sign(SALT, path, KEY);
// const result = `/${signature}${path}`;
// const base = "http://localhost:3001";
// // const base = "https://proxy.uat.thefusionapps.com"

// const proxyUrl = `${base}${result}`;
// console.log(proxyUrl);

// // fetch image
// const start = performance.now();
// const response = await fetch(str);
// const end = performance.now();
// console.log("Time taken: ", end - start);
// if (response.ok) {
//   // write image to fs
//   const contentType = response.headers.get("content-type");
//   const format = contentType?.split("/")[1];
//   await Bun.write(
//     `./image/image${Date.now()}.${format}`,
//     await response.arrayBuffer()
//   );
// }

serve({
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const sourceURl = url.pathname;

    const path = `/wm:1:soea/${sourceURl}`;
    const signature = sign(SALT, path, KEY);
    const result = `/${signature}${path}`;
    const ImgProxyBase = "http://localhost:3001";
    const proxyUrl = `${ImgProxyBase}${result}`;
    return fetch(proxyUrl);
  },
  // Optional port number - the default value is 3000
  port: process.env.PORT || 3000,
});
await sleep(100);
const str = env.testImg;
// 2 step encoding
// const urlencoded = encodeURI(str);
// const base64encoded = Buffer.from(urlencoded).toString("base64");
// 1 step encoding
const base64encoded = Buffer.from(str).toString("base64url");
const response = await fetch(`http://localhost:3000/${base64encoded}`);
console.log({ response });
