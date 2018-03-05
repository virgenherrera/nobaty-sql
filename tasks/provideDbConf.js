#!/usr/bin/env node

"use strict";
const {
	copyFileSync,
	existsSync,
	mkdirSync,
}	= require('fs');
const { join } = require('path');

	return (()=>{
		const origin = join(__dirname, './lib/templates/dbConfig.example');
		const destiny = join(__dirname, '../persistence', 'config.js');

		if( !existsSync( join(__dirname, '../persistence') ) ){
			mkdirSync( join(__dirname, '../', 'persistence') )
		}

	if( existsSync( destiny ) ){
		console.error(`Cannot Overwrite!${"\n"}file:	${destiny}${"\n"}Already Exists`);
		process.exit(1);
	} else {
		copyFileSync(origin,destiny,{encoding:'utf-8'});
	}
})();
