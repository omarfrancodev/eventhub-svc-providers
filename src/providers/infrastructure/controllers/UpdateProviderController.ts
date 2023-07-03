import { Request, Response } from 'express';
import { UpdateProviderUseCase } from '../../application/UpdateProviderUseCase';
import { FindByIdProviderUseCase } from '../../application/FindByIdProviderUseCase';
import * as fs from 'fs';
import { parseArrayValues } from './CreateProviderController';

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
      const handleUrlImages: string[] = [];

      const existingProvider = await this.findByIdProviderUseCase.run(providerId);

      if (existingProvider) {
        if (images.length > 0) {
          for (const image of images) {
            const imagePath = `src/images-providers/${image.filename}`;
            handleUrlImages.push(imagePath);
            const realImagePath = `/images-providers/${imagePath.split('/').pop()}`;
            urlImages.push(realImagePath);
            // const imagePath = image.location;
            // urlImages.push(imagePath);

            await fs.promises.rename(image.path, imagePath);
          }
          const existingImages = existingProvider.urlImages;
          const imagesToRemove = existingImages.filter(
            (existingImage) => !handleUrlImages.includes(existingImage)
          );
          imagesToRemove.forEach((image) => {
            const imagePath = `src/${image}`;

            fs.unlink(imagePath, (err) => {
              if (err) {
                console.error(`Error al eliminar la imagen ${image}: ${err}`);
              } else {
                console.log(`Imagen ${image} eliminada correctamente`);
              }
            });
          });
        } else {
          urlImages.push(...existingProvider.urlImages);
        }

        let servicesId = existingProvider.servicesId;
        let eventsId = existingProvider.servicesId;

        const newServicesId = this.validate(updatedProviderData.servicesId);
        const newEventsId = this.validate(updatedProviderData.eventsId);

        servicesId = [...new Set(servicesId.concat(newServicesId))];
        eventsId = [...new Set(eventsId.concat(newEventsId))];

        const updatedProvider = {
          ...existingProvider,
          ...updatedProviderData,
          urlImages,
          servicesId,
          eventsId
        };

        const result = await this.updateProviderUseCase.run(existingProvider, updatedProvider);

        return res.status(200).json(result);
      } else {
        return res.status(404).json({ error: "Provider not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  private validate(array: any) {
    if (array !== undefined) {
      const parsedArray = parseArrayValues(array);
      return parsedArray
    }
    return []
  }
}