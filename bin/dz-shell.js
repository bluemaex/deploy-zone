#!/usr/bin/env node

var program = require('commander')
var config = new (require('../lib/config'))()
var spawn = require('child_process').spawn

program
	.usage('<uuid>')
	.option('-h, --host [host]', 'use host')
	.option('-C, --console', 'connects to the zone console')
	.parse(process.argv)

if(program.args < 1) {
	console.error('uuid required')
	process.exit(1);
}

console(program)

function console(options) {
	var host = options.host
	var uuid = options.args[0]
	
	if(!(host)) {
		host = config.getHostByUUID(uuid)
	}
	if(!(host)) {
		console.log('Unknown UUID, please specify host or refresh cache')
		return
	}
	if(options.console) {
		spawn("ssh", ['-t', host, "vmadm", "console", uuid], { stdio: 'inherit' })
	} else {
		spawn("ssh", ['-t', host, "zlogin", uuid], { stdio: 'inherit' })
	}

}