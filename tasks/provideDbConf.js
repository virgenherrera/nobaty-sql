"use strict";
const { copyFileSync, existsSync, mkdirSync, } = require('fs');
const { join } = require('path');

return (() => {
	const origin = join(__dirname, './lib/templates/dbConfig.example');
	const destiny = join(__dirname, '../persistence', 'config.js');

	if (!existsSync(join(__dirname, '../persistence'))) {
		mkdirSync(join(__dirname, '../', 'persistence'))
	}

	if (existsSync(destiny)) {
		console.log(`File: "${destiny}" already exists!`);
	} else {
		copyFileSync(origin, destiny, {
			encoding: 'utf-8'
		});
	}
})();
