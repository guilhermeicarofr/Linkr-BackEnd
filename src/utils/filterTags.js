function filterTags(string) {
    return string.split(' ')
    .filter((word) => word[0]==='#' && word.length > 1)
    .map((word) => word.slice(1));
}

export { filterTags };