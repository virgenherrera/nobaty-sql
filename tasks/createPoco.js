#!/usr/bin/env node

"use strict";
const {
	existsSync,
	writeFileSync,
	readFileSync
} = require('fs');
const { join } = require('path');
const toPascalCase = require('./lib/toPascalCase');
const parseCliArgs = require("./lib/parseCliArgs");
const propCont = (attr = null, type = null) => {
	if(!attr || !type) return;
	switch ( type.toUpperCase() ) {
		case 'TEXT':
			type = 'string';
		break;
		case 'STRING':
			type = 'string';
		break;
		case 'UUID':
			type = 'string';
		break;
		case 'BOOLEAN':
			type = 'boolean';
		break;
		case 'INTEGER':
			type = 'number';
		break;
		case 'DATE':
			type = 'Date';
		break;
		case 'BLOB':
			type = 'Buffer';
		break;
		default:
			type = type.toLowerCase();
		break;
	}
	return `${'\n\t'}public ${attr}: ${type};`;
}
const propAssign = (attr = null) => {
	if(!attr) return;
	return `${'\n\t\t'}this.${attr} = params.${attr};`;
}

return (()=>{
	let { name = null, attributes = null } = parseCliArgs();
	let propContent = '';
	let propAssignContent = '';
	const ModuleRegExp = new RegExp("{{Module}}", "g");
	const propDefinitionRegExp = new RegExp("{{propDefinition}}", "g");
	const propAssignRegExp = new RegExp("{{propAssign}}", "g");
	const origin = join(__dirname, './lib/templates/poco.example');
	const destiny = join(__dirname, `../src/Poco/${toPascalCase(name)}.ts`);
	const fileContent = readFileSync(origin, 'utf-8');

	if( !name ){
		console.error(`Cannot create unnamed repository`);
		process.exit(1);
	}

	if(!attributes){
		attributes = [
			['demoAttr1',"string"],
			['demoAttr2',"string"],
			['demoAttr3',"string"],
		];
	}

	attributes.forEach(row=>{
		let [ attr=null,type=null ] = row;
		propContent += propCont(attr,type);
		propAssignContent += propAssign(attr);
	});

	const newContent = fileContent
	.toString()
	.replace(ModuleRegExp, toPascalCase(name))
	.replace(propDefinitionRegExp, propContent)
	.replace(propAssignRegExp, propAssignContent)
	;

	if( existsSync( destiny ) ){
		console.error(`Cannot Overwrite!${"\n"}Poco:	${destiny}${"\n"}Already Exists`);
		process.exit(1);
	} else {
		writeFileSync(destiny,newContent,{encoding:'utf-8'});
	}
})();
