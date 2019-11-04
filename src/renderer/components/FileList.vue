<template>
    <div class="file-list">
        <transition-group tag="ul" name="file">
            <li v-for="file in file_list" :key="file.url">
                <file :file="file" />
            </li>
        </transition-group>
    </div>
</template>

<script>
import { mapState } from "vuex";
import File from "./File";
// import Scroll from './Scroll'
export default {
    components: {
        File
        // 'scroll':()=>import('./Scroll')//遇到的问题 一般方法加载的组件中的computed初始化时候无法获取$el或$parent.$el中的属性,使用异步组件可以解决这个问题
    },
    computed: {
        ...mapState({
            file_list: state => state.file.file_list
        })
    }
};
</script>
<style lang="scss">
.file-list {
    // border:1px solid red;
    // flex-grow: 1;
    // position:relative;

    padding: 15px;
    width: 100%;
    height: 100%;
    margin-right: 15px;
    overflow-y: overlay;
    &::-webkit-scrollbar {
        /*滚动条整体样式*/

        width: 10px;
        /*高宽分别对应横竖滚动条的尺寸*/

        height: 1px;
    }

    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);

        background: #74b9ff;
    }

    &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/

        background: #ededed;
    }
    .scroll {
        width: 10px;
        height: 100%;
        background: #ddd;
        position: absolute;
        right: 0;
        top: 0;
        .bar {
            width: 100%;
        }
    }
}

.file-enter,.file-leave-to{
	transform:translateX(100%);
	opacity:0;
}
.file-enter-active,.file-enter-active{
	transition:all 1s ease;
}
</style>