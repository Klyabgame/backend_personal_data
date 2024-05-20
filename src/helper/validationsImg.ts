import { UploadedFile } from "express-fileupload";
import { imageSettings } from "./uploadImageSettings";
import path from "path";
import fs from "fs";
import { CloudinaryServer } from "../data";

export const validationsImg={
    validationImg:async(foto:UploadedFile):Promise<string>=>{
        const validateType=imageSettings.validateTypeMime(foto);
        if(!validateType) throw new Error('Los tipos de archivo aceptados son jpg,png,gif y jpeg');
         //CAMBIAR EL NOMBRE DEL ARCHIVO 
        const newImage=imageSettings.EditName(foto);
        const tempFilePath=path.join(__dirname,newImage.name);
        fs.writeFileSync(tempFilePath,newImage.data)

        const uploadCloudinaryImage=await CloudinaryServer().uploader.upload(tempFilePath,{folder:'PERSONAL-DATA-BACKEND'});
        fs.unlinkSync(tempFilePath);

        const cloudinarySecure_url=uploadCloudinaryImage.secure_url;

        return cloudinarySecure_url;
    }
}