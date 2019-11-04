
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')



function create_ignore_rule(list) {
	let rule_str = list.reduce((prev, curr) => {
		return prev + `(${curr})|`
	}, '')
	rule_str = rule_str.substring(0, rule_str.length - 1);
	console.log(rule_str)
	return new RegExp(rule_str);
}

export default {
	load_json(file) {
		return new Promise((resolve, reject) => {

			fs.readFile(path.join(__dirname, '../assets', file), 'utf-8', (err, data) => {
				if (err) {
					reject(err)
				}
				else {
					resolve(JSON.parse(data));
				}
			});

		})
	},
	update_json(file, list) {
		fs.writeFile(path.join(__dirname, '../assets', file), JSON.stringify(list, null, 4), (err) => {
			if (!err) {
				console.log('success write')
			}
		})
	},

	link_file(file, fn) {
		chokidar.watch(path.join(__dirname, '../assets', file))
			.on('change', async (_path) => {
				this.load_json(file).then(result => {

					fn(result)
				});
			})
		this.load_json(file).then(result => {

			fn(result)
		})

		return (newData) => {
			this.update_json(file, newData);
		}

	},
	async read_all_dir(file, ignore_list) {


		let rule = create_ignore_rule(ignore_list);
		let file_list = [];

		// function read_dir(_file){

		// 	fs.readdir(_file,function(err,names){
		// 		for(let i=0;i<names.length;i++){
		// 			if(rule.test(names[i])){
		// 				continue;
		// 			}
		// 			let current_file = path.join(_file,names[i])
		// 			fs.stat(current_file,(err,stats)=>{
		// 				if(stats.isDirectory()){
		// 					read_dir(current_file);
		// 				}else{
		// 					file_list.push(current_file)
		// 				}
		// 			})
		// 		}
		// 	})
		// }
		// read_dir(file);
		// console.log(file_list)
		// return file_list

		async function read_dirs(_file) {

			let names = fs.readdirSync(_file);
			for (let i = 0; i < names.length; i++) {
				if (rule.test(names[i])) {
					continue;
				}
				let current_file = path.join(_file, names[i]);
				let stats = fs.statSync(current_file);
				if (stats.isDirectory()) {
					read_dirs(current_file);
				} else {
					file_list.push(current_file);
				}
			}
		}
		await read_dirs(file);
		return file_list;


	},
	check_content(file, target) {

		return new Promise((resolve, reject) => {
			let rule = new RegExp(`(?:\\r\\n).*?(${target}).*?(?:\\r\\n)`, 'i')
			fs.readFile(file, function (err, data) {
				if (data.includes(target)) {
					let result = rule.exec(data);
					if (!result) {
						// console.log('nulllllllllll')
						reject('no')
					}
					let content = result[0].replace(result[1], `<span class="target">${result[1]}</span>`)
					resolve({
						name: path.basename(file),
						url: file,
						content: content
					})
				}
			})
		})


		//以下会造成阻塞
		// let data
		// try {

		// 	data = fs.readFileSync(file, 'utf-8')
		// } catch (err) {
		// 	console.log(file);
		// 	return new Error();
		// }
		// let rule = new RegExp(`(?:\\r\\n).*?(${target}).*?(?:\\r\\n)`, 'i');

		// // console.log(/\r\n.*?121212.*\r\n/.exec(data));

		// if (data.includes(target)) {
		// 	let result = rule.exec(data);
		// 	console.log(file);
		// 	if (!result) {
		// 		console.log(data);
		// 		return
		// 	}
		// 	let content = result[0].replace(result[1], `<span class="target">${result[1]}</span>`)
		// 	return {
		// 		name: path.basename(file),
		// 		url: file,
		// 		content: content
		// 	}
		// }


	},
	ckeck_name(_path, name) {
		let basename = path.basename(_path);
		return new Promise((resolve, reject) => {

			if (!basename.includes(name)) {
				reject('no')
			}
			resolve({
				name:basename,
				url: _path
			})

		})
	},
	search_file(name, url, ignore) {

		let rule = create_ignore_rule(ignore);
		let result = []
		console.log(rule)
		let names = fs.readdirSync(url)
		function search(_path) {

			for (let i = 0; i < names.length; i++) {
				if (rule.test(names[i])) {
					console.log(names[i]);
					continue;
				}
				let currentPath = path.join(_path, names[i])
				let stats = fs.statSync(currentPath)
				if (names[i].includes(name)) {
					result.push({
						name: names[i],
						url: currentPath
					});
				}
				if (stats.isDirectory()) {
					search(currentPath);
				}

			}
		}
		search(url);
		return result;


	},
	read_file(url) {
		console.log(url)
		let data = fs.readFileSync(url, 'utf-8');
		return data.split(/\r\n/)
	}
}