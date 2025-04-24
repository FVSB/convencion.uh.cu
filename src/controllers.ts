import { Request, Response } from 'express';
import Sponsor from './models/Sponsor';

// Para que TS reconozca req.file
type ReqWithFile = Request & { file: Express.Multer.File };

// Crear sponsor
export const createSponsor = async (req: ReqWithFile, res: Response) => {
  try {
    const { name } = req.body;
    const image = req.file.filename;
    const sponsor = await Sponsor.create({ name, image });
    res.status(201).json(sponsor);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos (más recientes primero)
export const listAllSponsors = async (_req: Request, res: Response) => {
  const sponsors = await Sponsor.findAll({ order: [['createdAt', 'DESC']] });
  res.json(sponsors);
};

// Obtener el más antiguo
export const getOldestSponsor = async (_req: Request, res: Response) => {
  const oldest = await Sponsor.findOne({ order: [['createdAt', 'ASC']] });
  if (!oldest) return res.status(404).json({ error: 'No hay sponsors' });
  res.json(oldest);
};

// Eliminar por ID
export const deleteSponsor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Sponsor.destroy({ where: { id: Number(id) } });
  if (!deleted) return res.status(404).json({ error: 'Sponsor no encontrado' });
  res.json({ message: `Sponsor ${id} eliminado` });
};
