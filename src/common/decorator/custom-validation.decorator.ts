import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { DEFAULT_FILE_MAX_SIZE } from '../constants';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';
import { extname } from 'path';
import { diskStorage } from 'multer';

const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|webp)/)))
    callback(
      new HttpException(
        'Invalid file type. Only .jpeg, .jpg, .png, .webp are allowed.',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  callback(null, true);
};
export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, `${Date.now()}${fileExtName}`);
};

export const imageOptions: MulterOptions = {
  limits: { fileSize: DEFAULT_FILE_MAX_SIZE },
  fileFilter: imageFilter,
  storage: diskStorage({
    destination: './uploads',
    filename: editFileName,
  }),
};

export const allFileTypeOptions: MulterOptions = {
  limits: { fileSize: DEFAULT_FILE_MAX_SIZE },
  storage: diskStorage({
    destination: './uploads',
    filename: editFileName,
  }),
};

@ValidatorConstraint({ name: 'isDateFormat', async: false })
export class IsDateFormat implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    // The regular expression checks if the string matches the DD-MM-YYYY format
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    return regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} format should be DD-MM-YYYY`;
  }
}

export function IsDateFormatValidation() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: propertyName + ' format should be DD-MM-YYYY',
      },
      constraints: [],
      validator: IsDateFormat,
    });
  };
}
