import { Request, Response } from 'express';
import { UpdateProviderUseCase } from '../../application/UpdateProviderUseCase';
import { FindByIdProviderUseCase } from '../../application/FindByIdProviderUseCase';
import * as fs from 'fs';
import { Provider } from '../../domain/Provider';
import saveLogFile from '../LogsErrorControl';

export class UpdateProviderController {
    constructor(
        private readonly updateProviderUseCase: UpdateProviderUseCase,
        private readonly findByIdProviderUseCase: FindByIdProviderUseCase
    ) { }


    async run(req: Request, res: Response): Promise<Response> {
        const providerId = isNaN(Number(req.params.id)) ? null : Number(req.params.id);
        if (!providerId) {
            return res.status(400).json({ error: 'Invalid provider ID' });
        }
        try {
            const updatedProviderData = req.body;
            const images: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];
            let urlImages: string[] = [];

            const existingProvider = await this.findByIdProviderUseCase.run(providerId);

            if (!existingProvider) {
                return res.status(404).json({ error: "Provider not found" });
            }
            if (images.length > 0) {
                urlImages = await this.manageImages(images, urlImages, existingProvider, updatedProviderData);
            } else {
                urlImages.push(...existingProvider.urlImages);
            }

            let eventsId = existingProvider.eventsId;
            const newEventsId = this.validate(updatedProviderData.eventsId);
            eventsId = [...new Set(eventsId.concat(newEventsId))];

            const updatedProvider = {
                ...existingProvider,
                ...updatedProviderData,
                urlImages,
                eventsId
            };

            const result = await this.updateProviderUseCase.run(existingProvider, updatedProvider);

            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            saveLogFile(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    private validate(array: any) {
        if (array !== undefined) {
            const arrayToParse = array.split(',').map((item: string) => {
                const parsedValue = parseInt(item.trim());
                return isNaN(parsedValue) ? null : parsedValue;
            });
            const parsedArray = arrayToParse.filter((item: number | null) => item !== null) || [];
            return parsedArray
        }
        return []
    }
    private async manageImages(images: Express.MulterS3.File[], urlImages: string[], existingProvider: Provider, updatedProviderData: any) {
        let imagesToKeep: string[] = [];
        const renamePromises = images.map(image => {
            const filename = `src/images-providers/${image.filename}`;
            const imagePath = `${filename.substring(filename.indexOf('/'))}`;
            urlImages.push(imagePath);
            return fs.promises.rename(image.path, filename);
        });
        await Promise.all(renamePromises);

        const existingImages = existingProvider.urlImages;
        if (updatedProviderData.urlImages.length > 0) { imagesToKeep = updatedProviderData.urlImages.split(','); }

        const imagesToRemove = existingImages.filter(
            (existingImage: string) => !imagesToKeep.includes(existingImage)
        );
        urlImages = urlImages.concat(imagesToKeep);

        const unlinkPromises = imagesToRemove.map(async image => {
            const imagePath = `src/${image}`;
            try {
                await fs.promises.unlink(imagePath);
                console.log(`Imagen ${image} eliminada correctamente`);
            } catch (err: any) {
                console.error(`Error al eliminar la imagen ${image}: ${err}`);
                saveLogFile(err);
            }
        });
        await Promise.all(unlinkPromises);

        return urlImages;
    }
}