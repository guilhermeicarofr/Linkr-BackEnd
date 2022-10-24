function filterTags(string) {
  const taglist = string
    .split(" ")
    .filter((word) => word[0] === "#" && word.length > 1)
    .map((word) => word.slice(1));
  return taglist.filter((word, index) => taglist.indexOf(word) === index);
}

export { filterTags };
