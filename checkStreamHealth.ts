import { $ } from "bun";
import env from "./env.json";
async function checkRTSPStreamHealth(url: string) {
  const command =
    await $`ffprobe -v quiet -print_format json -show_streams ${url}`;
  console.log(command.exitCode);
  if (command.exitCode !== 0) {
    throw new Error("Stream is not healthy [type 1]");
  }
  const output = JSON.parse(command.stdout.toString());
  const result =
    output?.streams?.map((stream: any) => ({
      codec: stream?.codec_name ?? "unknown",
      type: stream?.codec_type ?? "unknown",
      fps: stream?.avg_frame_rate ?? "unknown",
      width: stream?.width ?? "unknown",
      height: stream?.height ?? "unknown",
    })) ?? null;
  if (result === null) {
    throw new Error("Stream is not healthy [type 2]");
  }
  return result;
}

const rtspUrl = env.rtspUrl;
const result = await checkRTSPStreamHealth(rtspUrl);
console.log(result);
