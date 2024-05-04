import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import { join as joinPath } from 'path';

const FileHandler = class {
    constructor(folder, filename) {
        this.pathname = joinPath(__appdir, folder, filename);
    }

    append(data) {
        try {
            appendFileSync(this.pathname, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            throw error;
        }
    }
    read(isJSON = false) {
        try {
            const data = readFileSync(this.pathname, 'utf8');

            if (isJSON) return JSON.parse(data);

            return data;
        } catch (error) {
            throw error;
        }

    }
    write(data) {
        try {
            writeFileSync(this.pathname, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            throw error;
        }
    }
};

export default FileHandler;