<template>
    <div class="search" @click.stop="select">
        <input
            type="text"
            @keydown.enter="$emit('search',search_content)"
            v-model="search_content"
            :placeholder="prompt"
        />
        <button @click="search">
            <i class="iconfont icon-sousou"></i>
        </button>
    </div>
</template>
<script>
import $ from "jquery";
export default {
    props: {
        prompt: {
            type: String,
            default: "input content"
        }
    },
    data() {
        return {
            search_content: ""
        };
    },
    methods: {
        select() {
            if (!$(this.$el).hasClass("active")) {
                this.$emit("select", this.$el);
                return false;
            }
        },
        search() {
            if ($(this.$el).hasClass("active")) {
                this.$emit("search", this.search_content);
            }
        }
    }
};
</script>
<style lang="scss">
.search {
    display: flex;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    input {
        flex: 1;
        height: 30px;
        padding: 5px 10px;
        border: none;
        outline: none;

        &::-webkit-input-placeholder {
            color: #aaa;
            font-size: 14px;
            font-weight: 400;
            text-transform: capitalize;
        }
    }
    button {
        cursor: pointer;
        width: 70px;
        background: #74b9ff;
        outline: none;
        border: none;

        i {
            font-size: 24px;
            color: white;
        }
        &:hover {
            background: #0984e3;
        }
    }
}
</style>