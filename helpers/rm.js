const { rmSync } = require("fs");

function init(args) {
	console.log("Removing: ", args);
	for (let el of args) {
		try {
			rmSync(el, { force: true, recursive: true });
		} catch (e) {}
	}
}

init(process.argv.slice(2));
