import { Request, Response } from 'express';
import { Provider } from '../../domain/Provider';
import { CreateProviderUseCase } from '../../application/CreateProviderUseCase';
import { validationResult } from 'express-validator';
import saveLogFile from '../LogsErrorControl';

export class CreateProviderController {
  constructor(private readonly createProviderUseCase: CreateProviderUseCase) { }

  async run(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
    try {
      const formData = req.body;
      const images: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];
      const urlImages: string[] = [];
      let eventsId: number[] = [];

      for (const image of images) {
        const imagePath = `/images-providers/${image.filename}`;
        urlImages.push(imagePath);
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
      provider.eventsId = eventsId;
      provider.urlImages = urlImages;

      const createdProvider = await this.createProviderUseCase.run(provider);

      return res.status(201).json(createdProvider);
    } catch (error: any) {
      console.error(error);
      saveLogFile(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

