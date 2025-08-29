export const useSpView = (width?: string) => {
  if (width) {
    return useMediaQuery(`(max-width: ${width})`);
  }
  return useMediaQuery('(max-width: 768px)');
};
