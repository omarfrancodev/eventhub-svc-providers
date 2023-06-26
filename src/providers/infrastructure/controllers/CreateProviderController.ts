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

      for (const image of images) {
        const imagePath = `src/uploads/${image.filename}`;
        urlImages.push(imagePath);
        // const imagePath = image.location;
        // urlImages.push(imagePath);
      }

      const provider = new Provider();
      provider.userId = formData.userId;
      provider.name = formData.name;
      provider.description = formData.description;
      provider.phoneNumber = formData.phoneNumber;
      provider.email = formData.email;
      provider.address = formData.address;
      provider.daysAvailability = formData.daysAvailability;
      provider.hoursAvailability = formData.hoursAvailability;
      provider.categories = formData.categories;
      provider.urlImages = urlImages;

      const createdProvider = await this.createProviderUseCase.run(provider);

      return res.status(201).json(createdProvider);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
