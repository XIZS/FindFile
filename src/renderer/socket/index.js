
const {remote, ipcRenderer } = require('electron')

export default {

	select_folder() {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('open-file-dialog')
			ipcRenderer.on('select-folder', (event, path) => {
				resolve(path);
			})
		})
	},
	open_file(path){
		const {shell} = remote;
		shell.showItemInFolder(path)
	},
	exit_app(){
		ipcRenderer.send('exit')
	}
}