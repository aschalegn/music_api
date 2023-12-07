import Multer from "multer";
import path from "path";

// const memoryStorage  = Multer.memoryStorage();

const storage = Multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        // req
        // mimetype
        cb(null, path.join('uploads', 'profile_images'));
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname}`
        cb(null, fileName);
    }
});


export const upload = Multer({ storage });
// export const upload = Multer({ dest: "uploads" });
