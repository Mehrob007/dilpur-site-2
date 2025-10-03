export const getFileURL = (key: string) => {
  return `${process.env.NEXT_PUBLIC_GET_FILE}${key}`;
};
