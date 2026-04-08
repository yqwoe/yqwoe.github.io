"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revealGeneratorCallback = void 0;
const fs_1 = require("fs");
const process_1 = require("process");
const glob_1 = require("glob");
const revealGeneratorCallback = () => {
    const dirs = [
        __dirname + '/../node_modules/reveal.js',
        (0, process_1.cwd)() + '/node_modules/reveal.js',
    ];
    const dir = dirs.find((dir) => (0, fs_1.existsSync)(dir));
    if (!dir) {
        throw new Error('reveal.js not found');
    }
    const baseDir = (0, fs_1.realpathSync)(dir);

    const files = [
        ...(0, glob_1.sync)(baseDir + '*/dist/**/*', { nodir: true }),
        ...(0, glob_1.sync)(baseDir + '*/plugin/**/*', { nodir: true }),
        ...(0, glob_1.sync)(baseDir + '*/*', { nodir: true }),
        ...(0, glob_1.sync)(baseDir + '*/**/*', { nodir: true }),
        ...(0, glob_1.sync)((0, process_1.cwd)() + '/node_modules/revealjs' + '*/**/*', { nodir: true }),
    ]
        .map((file) => {
            return {
                data: () => (0, fs_1.createReadStream)(file),
                path: file.split('/node_modules/')[1],
            }
        });
    // console.log(files)
    return files;
};
exports.revealGeneratorCallback = revealGeneratorCallback;
