import { TextLineStream, TextDelimiterStream, toText } from "@std/streams";

export const readLineByLine = (
  file: ReadableStream<Uint8Array> = Deno.stdin.readable
) => {
  return file
    .pipeThrough(new TextDecoderStream()) // decode Uint8Array to string
    .pipeThrough(new TextLineStream()); // split string line by line
};

export const readByDelimiter = (
  delim: string,
  file: ReadableStream<Uint8Array> = Deno.stdin.readable
) => {
  return file
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextDelimiterStream(delim));
};

export const readAllStdin = (
  file: ReadableStream<Uint8Array> = Deno.stdin.readable
) => {
  return toText(file.pipeThrough(new TextDecoderStream()));
};
