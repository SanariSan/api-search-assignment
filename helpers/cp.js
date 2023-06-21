const { copyFileSync } = require("fs");

function init(args) {
	if (args.length < 2) throw new Error("cp.js: need at least 2 arguments");

	console.log("Copying: ", args);
	const from = args.slice(0, -1);
	const to = args[args.length - 1];
	try {
		for (let fromEl of from) {
			copyFileSync(fromEl, to);
		}
	} catch (e) {}
}

init(process.argv.slice(2));
