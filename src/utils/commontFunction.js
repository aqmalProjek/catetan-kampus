export function Truncate(str, length = 150) {
    return str.length > length
      ? `${str.substr(0, length)}---`
      : str;
}