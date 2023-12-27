export function removePTags(input) {
  return input.replace(/<p>(.*?)<\/p>/g, "$1");
}
