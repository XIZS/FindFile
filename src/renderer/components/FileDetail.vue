<template>
    <transition name="file-detail">
        <div class="file-detail" v-if="show&&!!content">
            <ul>
                <li v-for="(line ,i ) in content" :key="i">
                    <span class="ln">{{i+1}}</span>
                    <span class="content">{{line}}</span>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        content: {
            type: Array
        },
        show: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss">
.file-detail {
    font-size: 12px;
    height: 100vh;
    overflow: auto;
    ul > li {
        display: flex;
    }
    .ln {
        color: #999;
        text-align: end;
        padding: 0 10px;
        background: #f8f8f8;
        width: 40px;
    }
    .content {
        flex: 1;
        width: 100%;
        padding: 0 5px;
        white-space: pre-wrap;
        overflow: hidden;
        word-wrap: break-word;
        word-break: normal;
    }

    &::-webkit-scrollbar {
        position: absolute;
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
}

.file-detail-enter,
.file-detail-leave-to {
    opacity: 0;
    height: 0;
}
.file-detail-enter-active,
.file-detail-leave-active {
    transition: all 1s ease;
}
</style>