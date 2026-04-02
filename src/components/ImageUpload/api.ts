export const uploadImage = async (file: File): Promise<string> => {
  // Simulate an API call to upload the image
  return new Promise((resolve) => {
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      resolve(url);
    }, 1000);
  });
};
