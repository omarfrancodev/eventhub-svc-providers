import { Request, Response } from 'express';
import { UpdateProviderUseCase } from '../../application/UpdateProviderUseCase';
import * as fs from 'fs';

export class UpdateProviderController {
  constructor(
    private readonly updateProviderUseCase: UpdateProviderUseCase
  ) {}


  async run(req: Request, res: Response): Promise<Response> {
    try {
      const providerId = Number(req.params.id);
      const updatedProviderData = req.body;
      const images: Express.Multer.File[] = req.files as Express.Multer.File[];
      const urlImages: string[] = [];
      
      for (const image of images) {
        const imagePath = `src/uploads/${image.filename}`;
        console.log("provider")
        urlImages.push(imagePath);
        
        await fs.promises.rename(image.path, imagePath);
      }

      const updatedProvider = await this.updateProviderUseCase.run(providerId, {
        ...updatedProviderData,
        urlImages,
      });

      return res.status(200).json(updatedProvider);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
