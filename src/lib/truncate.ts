export const truncate_to = (str: string, to: number) => {
  if (str.length > to) {
    return str.substring(0, to) + '...';
  } else {
    return str;
  }
};
