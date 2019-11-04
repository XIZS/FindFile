<template>
    <div class="scroll" v-if="show_scroll">
        <div class="bar" :style="{width:'100%',height:bar_height,top:bar_top}"></div>
		{{top}}
    </div>
</template>
<script>
//this.$parent.$el.scrollTop
//this.$parent.$el.scrollHeight 等于总高度 559
//this.$parent.$el.offsetHeight 等于显示高度 450
export default {
	props:{
		top:Number
	},
    computed: {
        getElAttr(name) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this.$parent.$el[name]);
                }, 0);
            });
		}, 
		bar_top(){
			console.log(this.$parent.$el.offsetTop)
			return this.$parent.$el.offsetTop+"px";
		},
        bar_height() {
            console.log(this.$parent);
            console.log(this.$parent.$el);

            let total_height = this.$parent.$el.scrollHeight;
            let height = this.$parent.$el.offsetHeight;
            return (height / total_height) * 100 + "%";
        },
        show_scroll() {
            let total_height = this.$parent.$el.scrollHeight;
            let height = this.$parent.$el.offsetHeight;
            return height < total_height;

            // return true;
        }
    },
    mounted() {
      
        // console.log(this.$parent)
        // console.log(this.$parent)
        // 	console.log(this.$parent.$el)
    }
};
</script>
<style lang="scss">
.scroll {
    position: absolute;
    width: 10px;
    height: 100%;
    background: rgb(224, 224, 224);
    top: 0px;
    right: 0px;

    .bar {
        background: #74b9ff;
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>