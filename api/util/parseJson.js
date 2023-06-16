const parseJson = (json) => {
  const parsedJson = JSON.stringify(json)
    .replace(/\\/g, "")
    .replace(/\]"/g, "]")
    .replace(/"\[/g, "[")
    .replace(/"\{/g, "{")
    .replace(/\}"/g, "}");

  return JSON.parse(parsedJson);
};

export default parseJson;
