// node
import path from "path";
// express
import fileUpload from "express-fileupload";
// third party
import { v4 as uuidv4 } from "uuid";
// app

const getFileExtension = (filename: string) => {
  const extension = /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;

  return extension ? extension[0] : undefined;
};

const extensionPermitted: string[] = ["png", "jpg", "jpeg", "gif"];

interface IUploadFile {
  files: fileUpload.UploadedFile | fileUpload.UploadedFile[];
  extensionValid?: string[];
  extraPath?: string;
}

export const uploadFIle = async ({
  files,
  extensionValid = extensionPermitted,
  extraPath = "",
}: IUploadFile): Promise<string> => {
  // if not array
  if (!Array.isArray(files)) {
    const fileExtension = getFileExtension(files.name);

    if (!extensionValid.includes(fileExtension as string)) {
      throw new Error("File extension not permitted");
    }

    const nameTemp = `${extraPath}${
      extraPath === "" ? "" : "/"
    }${uuidv4()}.${fileExtension}`;
    
    const uploadPath: string = path.join(
      __dirname,
      "../../../upload/",
      nameTemp
    );

    files.mv(uploadPath, function (err) {
      if (err) {
        throw new Error("Error upload file");
      }
    });

    return nameTemp;
  } else {
    throw new Error("File not found");
  }
};
