import { Request, Response } from 'express';
import { Provider } from '../../domain/Provider';
import { CreateProviderUseCase } from '../../application/CreateProviderUseCase';

export class CreateProviderController {
  constructor(private readonly createProviderUseCase: CreateProviderUseCase) { }

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const formData = req.body;
      const images: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];
      const urlImages: string[] = [];
      const parsedServices: number[] = [];

      if (Array.isArray(images)) {
        for (const image of images) {
          const imagePath = `/images-providers/${image.filename}`;
          urlImages.push(imagePath);
          // const imagePath = image.location;
          // urlImages.push(imagePath);
        }
      }

      if (Array.isArray(formData.servicesId)) {
        for (const service of formData.servicesId) {
          const parsedValue = parseInt(service);
          const value = isNaN(parsedValue) ? null : parsedValue
          parsedServices.push(value!);
        }
      }

      const provider = new Provider();
      provider.userId = formData.userId || null;
      provider.name = formData.name || null;
      provider.description = formData.description || null;
      provider.phoneNumber = formData.phoneNumber || null;
      provider.email = formData.email || null;
      provider.address = formData.address || null;
      provider.daysAvailability = formData.daysAvailability || null;
      provider.hoursAvailability = formData.hoursAvailability || null;
      provider.categories = formData.categories || null;
      provider.servicesId = parsedServices.filter((service: number | null) => service !== null) || null;
      provider.urlImages = urlImages;

      const createdProvider = await this.createProviderUseCase.run(provider);

      return res.status(201).json(createdProvider);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
