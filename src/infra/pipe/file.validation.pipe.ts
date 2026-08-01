
import { FileTypeValidator, Injectable, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';

@Injectable()
export class ImageValidationPipe extends ParseFilePipe {
    constructor() {
        super({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 5 * 1024 * 1024,
                }),
                new FileTypeValidator({
                    fileType: /(image\/jpeg|image\/jpg|image\/png|image\/webp)/,
                }),
            ],
        });
    }
}
