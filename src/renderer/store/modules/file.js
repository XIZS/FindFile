import fu from "../../utils/file";

export default {
	namespace:true,
	state:{
		file_list:[]
	},
	mutations:{
		push_file(state,file){
			state.file_list.push(file)
			console.log(state.file_list);
		},
		reset_file_list(state){
			state.file_list=[];
		}
	},
	actions:{
		async filter_content({commit},{paths,content}){
			commit('reset_file_list')
			let time=1;
			for (let i = 0; i < paths.length; i++) {
				// console.log(i)
                //set current search path

				//search content 

				fu.check_content(paths[i], content)
					.then(result=>{
						console.log(result)
						setTimeout(() => {

							commit('push_file',result);
						}, time*100);
						time++;
					}).catch(reject=>{
						console.log(reject);
					})
				// console.log(info);
				// if(info==null){
				// 	continue;
				// }

            }
		},
		filter_filename({commit},{paths,name}){
			commit('reset_file_list')
			let time=1; 
			for(let i=0;i<paths.length;i++){
				fu.ckeck_name(paths[i],name)
					.then(result=>{
						console.log(result)
						setTimeout(() => { 
							commit('push_file',result);
						}, time*100);
						time++;
					}).catch(reject=>{
						console.log(reject);
					})
			}
			
			// commit('reset_file_list')
			// commit('push_file',result);

		}
	}
}
