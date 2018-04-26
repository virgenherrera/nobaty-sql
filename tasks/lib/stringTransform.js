"use strict";
require('ts-node').register();

const {
	lcFirst,
	ucFirst,
	toCamelCase,
	to_snake_case,
	TO_CONSTANT_CASE,
	ToTitleCase,
} = require('../../src/Helper/stringTransform');

module.exports = {
	lcFirst: lcFirst,
	ucFirst: ucFirst,
	toCamelCase: toCamelCase,
	to_snake_case: to_snake_case,
	TO_CONSTANT_CASE: TO_CONSTANT_CASE,
	ToTitleCase: ToTitleCase,
};
