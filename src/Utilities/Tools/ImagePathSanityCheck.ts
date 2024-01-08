/**
 * Due to case of null ending path
 * Process the given path.
 * @param path string
 * @returns string or undefined
 */
export default (path: string | undefined) => {
  const isInsane =
    path !== undefined ? path?.split('/').includes('null') : false;

  if (isInsane) return undefined;
  return path;
};
