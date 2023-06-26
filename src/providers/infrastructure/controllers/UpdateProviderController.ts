import { Request, Response } from 'express';
import { UpdateProviderUseCase } from '../../application/UpdateProviderUseCase';
import { FindByIdProviderUseCase } from '../../application/FindByIdProviderUseCase';
import * as fs from 'fs';

export class UpdateProviderController {
  constructor(
    private readonly updateProviderUseCase: UpdateProviderUseCase,
    private readonly findByIdProviderUseCase: FindByIdProviderUseCase
  ) { }


  async run(req: Request, res: Response): Promise<Response> {
    try {
      const providerId = Number(req.params.id);
      const updatedProviderData = req.body;
      const images: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];
      const urlImages: string[] = [];

      const existingProvider = await this.findByIdProviderUseCase.run(providerId);

      if (existingProvider) {
        if (images.length > 0) {
          for (const image of images) {
            const imagePath = `src/uploads/${image.filename}`;
            urlImages.push(imagePath);
            // const imagePath = image.location;
            // urlImages.push(imagePath);

            await fs.promises.rename(image.path, imagePath);
          }
        } else {
          urlImages.push(...existingProvider.urlImages);
        }
        const updatedProvider = {
          ...existingProvider,
          ...updatedProviderData,
          urlImages,
        };

        const result = await this.updateProviderUseCase.run(providerId, updatedProvider);

        return res.status(200).json(result);
      } else {
        return res.status(404).json({ error: "Provider not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
