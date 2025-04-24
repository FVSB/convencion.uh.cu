import { Request, Response } from 'express';
import Sponsor from './models/Sponsor';

type ReqWithFile = Request & { file: Express.Multer.File };

export const createSponsor = async (req: ReqWithFile, res: Response) => {
  if (!req.file) return res.status(400).json({ error: 'Falta la imagen' });
  const { name } = req.body;
  const image = req.file.filename;
  const sponsor = await Sponsor.create({ name, image });
  res.status(201).json(sponsor);
};

export const listAllSponsors = async (_req: Request, res: Response) => {
  const sponsors = await Sponsor.findAll({ order: [['createdAt', 'DESC']] });
  res.json(sponsors);
};

export const getOldestSponsor = async (_req: Request, res: Response) => {
  const oldest = await Sponsor.findOne({ order: [['createdAt', 'ASC']] });
  if (!oldest) return res.status(404).json({ error: 'No hay sponsors' });
  res.json(oldest);
};

export const deleteSponsor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Sponsor.destroy({ where: { id: Number(id) } });
  if (!deleted) return res.status(404).json({ error: 'Sponsor no encontrado' });
  res.json({ message: `Sponsor ${id} eliminado` });
};
