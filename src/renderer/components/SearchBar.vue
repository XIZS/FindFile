<template>
    <div class="search-bar">
        <div class="back" @click="$emit('toggle')"></div>
        <div>
            <div class="file-address">
                <button @click="select_folder">by</button>
                <input class="url" v-model="url" />
            </div>
            <div class="searchs">
                <search
                    @search="search_content"
                    prompt="Input search text content"
                    @select="select_search"
                    class="active"
                />
                <search
                    @search="search_file"
                    prompt="Input search file name"
                    @select="select_search"
                />
            </div>
        </div>
    </div>
</template>
<script>
import Search from "./Search";
import $ from "jquery";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import fu from "../utils/file";
import socket from "../socket";

export default {
    watch: {},
    components: {
        Search
    },
    data() {
        return {
            show: false,
            url: `D:\\source\\nodejs-workspace`
        };
    },
    computed: {
        ...mapState("file", ["file_list"]),
        ...mapGetters(["ignore_list_str"])
    },
    methods: {
        ...mapMutations(["set_status", "push_file_list", "push_file"]),
        ...mapActions(["filter"]),
        handel_click(e) {},
        select_search(e) {
            let $e = $(e);
            let childs = $e.parent().children();
            console.log(childs);
            childs.each(function(index, item) {
                $(item).removeClass("active");
            });

            $e.addClass("active");
        },
        select_folder() {
            //electron

            socket.select_folder().then(result => {
                this.url = result;
            });
        },
        search_content(content) {
            //get yield function

            setTimeout(() => {
                fu.read_all_dir(this.url, this.ignore_list_str).then(result => {
                    let paths = result;
                    //遍历地址集合
                    this.$store.dispatch("filter_content", { paths, content });
                });
            }, 0);

            // let file_list = await fu.read_content(path)
            // console.log(file_list)

            //检测地址目标是否是符合的对象

            //electron

            this.$emit("toggle");
        },
        search_file(name) {
            //electron
            fu.read_all_dir(this.url,this.ignore_list_str).then(result=>{
				this.$store.dispatch('filter_filename',{paths:result,name})
			})
            // this.$store.dispatch("search_file", { url:this.url, name,ignore:this.ignore_list_str });
           
            console.log("file");
            this.$emit("toggle");
        }
    }
};
</script>

<style lang="scss">
.search-bar {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .back {
        background: rgba(255, 255, 255, 0.7);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    > div {
        position: absolute;
        top: calc(50%-100px);
    }

    .file-address {
        width: 380px;
        display: flex;
        justify-content: left;
        align-items: center;
        margin-bottom: 5px;
        button {
            cursor: pointer;
            height: 16px;
            width: 45px;
            background: #74b9ff;
            border: none;
            outline: none;
            border-radius: 8px;
            font-size: 12px;
            color: white;
            margin-right: 5px;

            &:hover {
                background: #0984e3;
            }
        }
        .url {
            font-size: 10px;
            color: #999;
            border: 1px solid rgba(238, 238, 238, 0);
            outline: none;
            background: none;
            flex-grow: 1;
            border-radius: 2px;
            padding: 0 3px;
            &:focus {
                background: white;
                border: 1px solid #666;
            }
        }
    }
    .searchs {
        width: 380px;
        height: 100px;
        position: relative;
        .search {
            width: 100%;
            position: absolute;
            transition: all 0.5s ease;
            transform: scale(0.9) translateY(30px);
            z-index: 9;
        }
        .active {
            z-index: 10;

            transform: scale(1);
        }
    }
}
</style>