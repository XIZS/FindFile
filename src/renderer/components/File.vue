<template>
    <div class="file">
        <div class="card">
            <div class="info">
                <div class="base">
                    <span class="name">{{file.name}}</span>
                    <span class="url">{{file.url}}</span>
                </div>
                <div class="content" v-html="file.content"> </div>
                <!-- <div class="content">sss dddddddddddsssssssssssssssssssssssssssssdddddddddddddddsssssssss</div> -->
            </div>
            <div class="control">
                <ff-button @click.native="e_detail">detail</ff-button>
                <ff-button @click.native="e_open">open</ff-button>
                <!-- <div class="detail"></div>
                <div class="open"></div>-->
            </div>
        </div>
        <!-- <div class="detail"></div> -->
        <file-detail :content="content" :show="show_detail"></file-detail>
    </div>
</template>

<script>
import FfButton from "./FfButton";
import FileDetail from './FileDetail'
import fu from "../utils/file";
import socket from '../socket'

export default {
    components: {
		FfButton,
		FileDetail
    },
    props: {
        file: {
            type: Object,
            require: true
        }
	},
	methods:{
		async e_detail(){
			if(this.content.length===0){
				this.content = fu.read_file(this.file.url)
				console.log(this.content)

			}
			 
			this.show_detail=!this.show_detail
			console.log(this.show_detail)
		},
		e_open(){

			socket.open_file(this.file.url)
		}
	},
	data(){
		return{
			show_detail:false,
			content:[
				// `{`,
				// `	"name": "exercise",`,
				// `	<span>"version": "1.0.0",</span>`,
				// `	"description": "",`,
				// `	"main": "index.js",`,
				// `	"dependencies": {`,
				// 	`	"_vue@2.6.10@vue": "^2.6.10",`,
				// 	`	"bcrypt": "^3.0.6",`,
				// 	`	"request": "^2.88.0",`,
				// 	`	"request-promise": "^4.2.4",`,
				// 	`	"vue": "^2.6.10"`,
		 
				// `"devDependencies": {},`,
				// `"scripts": {`,
				// 	`"test": "dir"`,
	 
				// `"keywords": [],`,
				// `"author": "",`,
				// `"license": "ISC"`,
			],
		}
	}
};
</script>
<style lang="scss">
.file {
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
	border:1px solid #ddd;
    margin-bottom: 15px;
	.file-detail{
	}
    .card {
		background:white;
		filter:drop-shadow(0px 1px 0px rgba(0,0,0,0.2));
        display: flex;
        padding: 0 5px;
        align-items: center;
        justify-content: flex-end;
        .control {
            // flex:1;
        }
        .info {
            flex: 1;
            overflow: hidden; //************** */
			
			.target{
				color:red;
			}
            div {
                height: 30px;
            }
            // position: relative;
            .base {
                border-bottom: 1px solid #74b9ff;

                padding: 3px 10px;
                font-size: 14px;
                display: flex;
                .name {
                    display: flex;
                    align-items: center;
                    // margin: 3px 0;
                    padding-right: 10px;
                    border-right: 1px solid #74b9ff;

					 overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                }
                .url {
                    margin: 3px 0;
                    display: flex;
                    align-items: center;
                    padding: 0 5px;
                    font-size: 12px;

					 overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                }
            }
            .content {
                width: 100%;
                height: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 3px 10px;
                font-size: 14px;
            }
        }
    }
}
</style>