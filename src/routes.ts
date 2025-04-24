import { Router } from 'express';
import upload from './utils/fileUpload';
import {
  createSponsor,
  listAllSponsors,
  getOldestSponsor,
  deleteSponsor
} from './controllers';

const router = Router();

router.post('/', upload.single('image'), createSponsor);
router.get('/', listAllSponsors);
router.get('/oldest', getOldestSponsor);
router.delete('/:id', deleteSponsor);

export default router;
