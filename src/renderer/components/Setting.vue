<template>
    <transition name="setting">
        <div class="setting">
            <ignore></ignore>
        </div>
    </transition>
</template>
<script>
import { mapState } from "vuex";
import Ignore from "./Ignore";
export default {
    computed: {},
    components: {
        Ignore
    }
};
</script>
<style lang="scss">
.setting {
    width: 140px;
    height: 100%;
    background: #efefef;
	
}

.setting-enter,.setting-leave-to{
	// transform: translateX(-100%);
	width:0;

}
.setting-enter-active,.setting-leave-active{
	transition:all 0.5s ease;
}
</style>

