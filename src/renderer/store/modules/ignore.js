import fu from '../../utils/file';


export default { 
	state:{
		ignore_list:[ ]
	}, 
	mutations:{
		set_ignore_list(state,data){
			console.log('set',data);
			state.ignore_list = data;
		},
		minus_ingore(state,index){
			state.ignore_list.splice(index,1);

			fu.update_json('ignore.config.json',state.ignore_list)
		},
		push_ignore(state,ignore){
			state.ignore_list.push(ignore);

			fu.update_json('ignore.config.json',state.ignore_list);
		}
	},
	getters:{
		ignore_list_str(state){
			return state.ignore_list.map(item=>{
				return item.name
			})
		}
	},
	actions:{
		async load_ignore_list(context){
			let data = await fu.load_json('ignore.config.json')
			console.log(data)
			context.commit('set_ignore_list',data);

		},
		async delete_ignore(context,index){
			context.commit('minus_ingore',index)
		}
	}
}