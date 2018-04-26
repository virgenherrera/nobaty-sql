import * as path from 'path';
import * as fs from 'fs';
// import { dd } from '../Lib/Debug';

const parentDir = path.join(__dirname, '../');
if (process.cwd() !== parentDir.slice(0, -1)) {
	// declare parent (directory src) as Current Work Directory
	process.chdir(parentDir);
}

export class Directories {
	[index: string]: any;
	public srcPath: string = parentDir;
	public basePath: string = path.join(parentDir, '../');


	constructor() {
		// map srcPath to Props
		this.mapPathToProps(this.srcPath);

		// map basePath to Props
		this.mapPathToProps(this.basePath);
	}

	static getInstance(): Directories {
		return new Directories;
	}

	getPathToFile(dir: string, file: string | null): string {
		return (this.hasOwnProperty(dir)) ? path.join(this[dir], file) : null;
	}

	fileExists(dir: string, file: string | null): boolean {
		return (fs.existsSync(path.join(this[dir], file)));
	}

	isDirectory(dir) {
		return fs.lstatSync(dir).isDirectory();
	}

	mapPathToProps(Path: string): void {
		fs
			.readdirSync(Path)
			.forEach(dir => {
				const ignoredDirs = ['.git', '.vscode'];
				const dirPath = path.join(Path, dir);

				if (ignoredDirs.indexOf(dir) > -1) {
					return undefined;
				} else if (this.isDirectory(dirPath) && !this.hasOwnProperty(dir) && !this.hasOwnProperty(`${dir}Path`)) {
					return this[`${dir}Path`] = dirPath;
				}
			});
	}
}
