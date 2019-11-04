<template>
    <div class="ignore">
        <div
            class="title"
            :class="{active:show_ignore_list}"
            @click="show_ignore_list=!show_ignore_list"
        >
            <i class="iconfont icon-right"></i> ignore
        </div>

        <transition
            name="ignore"
            @before-enter="ignores_before_enter"
            @enter="ignores_enter"
            @leave="ignores_leave"
        >
            <div v-show="show_ignore_list" class="ignores">
                <transition-group name="ignore-item" tag="ul">
                    <li v-for="(ignore,i) in ignore_list" :key="ignore.name">
                        <span>{{ignore.name}}</span>
                        <i class="iconfont icon-icon--" @click="remove_ingore(i)"></i>
                    </li>
                    <li key="k" class="control">
                        <input
                            type="text"
                            ref="add_input"
                            v-show="show_add_input"
                            @keydown.enter="add_ignore"
                        />
                        <div class="add" @click="add_handle">
                            <i class="iconfont icon-jia"></i>
                        </div>
                    </li>
                </transition-group>
            </div>
        </transition>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import fu from "../utils/file";

function remove_item(array, index) {
    return array.filter((item, i) => {
        if (i !== index) {
            return true;
        }
    });
}

export default {
    created() {

		//exercise
        this.update_data = fu.link_file("ignore.config.json", data => {
            this.$store.commit("set_ignore_list", data);
            this.ignore_list = data;
        });
    },
    data() {
        return {
            ignore_list: [],
            show_ignore_list: false,
            show_add_input: false
        };
    },
    methods: {
        update_data: function() {},
        remove_ingore(i) {
            this.update_data(remove_item(this.ignore_list, i));
        },
        add_handle() {
            this.show_add_input = !this.show_add_input;
            if (this.show_add_input) {
                setTimeout(() => {
                    this.$refs["add_input"].focus();
                }, 0);
            }
        },
        add_ignore(e) {
            let is_exist = this.ignore_list.find(item => {
                return item.name === e.target.value;
            });
            if (is_exist) {
                e.target.value = "";
                return;
            }

            this.update_data([...this.ignore_list, { name: e.target.value }]);
            e.target.value = "";
            this.show_add_input = false;
        },
        ignores_before_enter(el) {
			el.offsetWidth;
            el.style.maxHeight = "0px";
        },
        ignores_enter(el) {
			el.offsetWidth;
		
            el.style.maxHeight = "500px";
            el.style.transition = "all 0.5s ease";
        },
        ignores_leave(el) {
            el.style.maxHeight = "0px";
        }
    }
};
</script>

<style lang="scss">
.ignore {
    color: white;
    display: flex;
    flex-direction: column;

    .title {
        display: flex;
        i {
            display: block;
            transition: all 0.5s ease;

            font-size: 8px;
            margin: 0 5px;
        }
        background: #74b9ff;
        font-size: 14px;
        line-height: 30px;
    }
    .title.active {
        i {
            transform: rotate(90deg);
        }
    }
    ul {
        position: relative;
        background: #558fff;
    }
    ul > li {
        display: flex;
        background: #558fff;
        align-items: center;
        height: 18px;
        width: 100%;
        cursor: pointer;

        transition: all 0.5s ease;

        &:hover {
            background: #2463e2;
        }

        &:hover i {
            display: block;
        }
        span {
            user-select: none;
            transition: all 0.5s ease;
            font-size: 12px;
            padding-left: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        i {
            display: none;
            cursor: pointer;
            margin-right: 5px;
            margin-left: auto;
        }

        &.control {
            &:hover {
            }

            display: flex;
            flex-direction: column;
            height: auto;
            input {
                width: 100%;
                background: #71a0fd;
                padding-left: 20px;
                color: white;
                border: none;
            }
            .add {
                height: 35px;
                width: 100%;
                background: #558fff;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: all 0.5s ease;
                &:hover {
                    background: #2463e2;
                }
                i {
                    margin-left: 0;
                    display: block;
                }
            }
        }
    }
}

.ignore-item-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
.ignore-item-enter {
    transform: translateY(-100%);
    opacity: 0;
}
.ignore-item-enter-active,
.ignore-item-leave-active {
    transition: all 0.5s ease;
}
.ignore-item-move {
    transition: all 0.5s ease;
}
.ignore-item-leave-active {
    position: absolute;
}

.ignore-enter-active,
.ignore-leave-active {
    transition: all 0.5s ease;
}

.ignores {
    overflow: hidden;
}
</style>