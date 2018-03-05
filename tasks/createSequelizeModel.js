#!/usr/bin/env node

"use strict";
const {
	existsSync,
	writeFileSync,
	readFileSync
}	= require('fs');
const { join } = require('path');
const pluralize = require('pluralize');
const ucfirst = require('./lib/ucfirst');
const toPascalCase = require('./lib/toPascalCase');
const parseCliArgs = require("./lib/parseCliArgs");
const scopeIncl = (attr = null) => {
	if( !attr ) return;
	return ` '${attr}',`;
};
const attribDeclaration =(attr = null,type = null) => {
	if( !attr || !type ) return;
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
	return `${'\t'}@Column${'\n\t'}${attr}: ${type};${'\n\n'}`;
};


return (()=>{
	let {name=null,attributes=null} = parseCliArgs();
	const PascalName = toPascalCase( name );
	let scopeAttribs = '';
	let attribDefinition = '';
	const tableNameRegex = new RegExp('{{tableName}}','g');
	const Class_NameRegex = new RegExp('{{Class_Name}}','g');
	const attributesArrRegex = new RegExp('{{attributesArr}}','g');
	const attrDeclarationsRegex = new RegExp('{{attrDeclarations}}','g');
	const origin = join( __dirname , './lib/templates/model.example' );
	const destiny = join(__dirname, `../src/Model/${PascalName}.ts`);
	const fileContent = readFileSync(origin,'utf-8');

	if( !name ){
		console.error(`Cannot create unnamed model`);
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

		scopeAttribs += scopeIncl(attr);
		attribDefinition += attribDeclaration( attr, type );
	});

	const newContent		= fileContent
	.toString()
	.replace(tableNameRegex, pluralize( name ))
	.replace(Class_NameRegex, PascalName)
	.replace(attributesArrRegex, `${scopeAttribs} `)
	.replace(attrDeclarationsRegex, attribDefinition);


	if( existsSync( destiny ) ){
		console.error(`Cannot Overwrite!${"\n"}Model:	${destiny}${"\n"}Already Exists`);
		process.exit(1);
	} else {
		writeFileSync(destiny,newContent,{encoding:'utf-8'});
	}
})();
