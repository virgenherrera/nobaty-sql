'use strict';
module.exports = (str)=>{
	return 	str
	.replace('-', ' ')
	.replace('_', ' ')
	.replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase() )
	.replace(' ', '');
}
