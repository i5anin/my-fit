import fs from 'fs';
import path from 'path';
import util from 'util';
import { pipeline } from 'stream';
import type { IFileToUpload } from 'fitness-tracker-contracts';

import { deleteFile } from '../helpers/index.js';
import { IUploadService } from '../interface/index.js';

const pump = util.promisify(pipeline);

export const uploadService: IUploadService = {
  upload: async (file: IFileToUpload | undefined) => {
    const isFileExists = !!file;

    if (!isFileExists) {
      return {
        filename: '',
        isFileExists: false,
      };
    }

    const filename = `${Date.now()}-${file.filename}`;

    await pump(file.file, fs.createWriteStream(path.resolve(`./public/upload/${filename}`)));

    return { filename, isFileExists: true };
  },

  delete: async (_id: string) => {
    deleteFile(_id);
  },
};
