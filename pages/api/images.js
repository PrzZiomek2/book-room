import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import moment from "moment/moment";
import slugify from "slugify";

 async function handler(req, res) {

  switch (req.method) {
    case "POST":
      fs.mkdir( 
         `./public/uploaded`, 
         {recursive: true}, 
         (err) => res.status(500).json({msg: "error when creating folder"})
      );

      const resData = await new Promise((resolve, rej) => {
         const form = formidable({
            multiple: true,
            uploadDir: `./public/uploaded`,
            filename: (name, ext, part) => part.originalFilename
         });
         form.keepExtensions = true;
         form.keepFilenName = true;
   
         form.on("fileBegin", (name, file) => {
            file.path = path.join(`./public/uploaded`, file.originalFilename)
         });

         form.parse(req, (err, fields, files) => {
            if(err) return rej(err);
            resolve(files);
         })
      });

      res.json(resData);
      
      break;
  }

    
};


export const config = {
   api: {
      bodyParser: false
   }
};

export default handler;




 /*  
  const timeStamp = moment().format("DD-MM-YYYY");
 
      fs.mkdir( 
         `./public/uploaded`, 
         {recursive: true}, 
         (err) => res.status(500).json({msg: "error when creating folder"})
      );

      const resData = await new Promise((resolve, rej) => {
         const form = formidable({
            multiple: true,
            uploadDir: `./public/uploaded`,
            filename: (name, ext, part) => part.originalFilename
         });
         form.keepExtensions = true;
         form.keepFilenName = true;
   
         form.on("fileBegin", (name, file) => { console.log({fileno: file.originalFilename});
            file.path = path.join(`./public/uploaded`, file.originalFilename)
         });

         form.parse(req, (err, fields, files) => {
            if(err) return rej(err);
            resolve(files);
         })
      });

      res.json(resData);
   */