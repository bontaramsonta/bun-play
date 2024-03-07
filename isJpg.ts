import { file } from "bun";
async function isJpg(path: string) {
  const f = file(path);
  const a = await f.arrayBuffer();
  console.log(f.type);
  const formdata = new FormData();
  formdata.append(
    "file",
    new File([new Uint8Array(a)], f.name ?? "temp.jpg", { type: f.type })
  );
  console.log(formdata);
}
if (import.meta.main) {
  isJpg("./image/image1708954176367.webp");
}
