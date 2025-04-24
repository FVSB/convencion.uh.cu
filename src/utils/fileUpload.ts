import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'public/uploads'),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `sponsor-${Date.now()}${ext}`);
  }
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ok = /\.(png|jpe?g|svg)$/i.test(file.originalname);
  cb(ok ? null : new Error('Solo PNG/JPG/SVG'), ok);
};

export default multer({ storage, fileFilter });
