import Resizer from "react-image-file-resizer";

export const resizeFile = (file, height, width, extension, resolution) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      height,
      width,
      extension,
      resolution,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
