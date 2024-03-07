const key =
  "yrhertvpjkgjpo8sgdiuct45yp8gsakgyqxqcewroiy3f42obi7tfatboqro34tfkjhe6jdgv2lqyhvaekuy1bl3x";

const hexEncodeString = (str: string) =>
  str
    .split("")
    .map((c) => c.charCodeAt(0).toString(16))
    .join("");

console.log(hexEncodeString(key));
