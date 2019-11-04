<template>
    <div class="menu">
        <div class="but" @click="$emit(`search`)">
            <i class="iconfont icon-sousou"></i>
        </div>
        <div class="but" @click="$emit(`set`)">
            <i class="iconfont icon-shezhi1"></i>
        </div>
        <div class="but exit" @click="$emit(`exit`)">
            <i class="iconfont icon-dianyuan"></i>
        </div>
    </div>
</template>
 


<style lang="scss">
.menu {
	z-index:1;
	background:white;
    width: 36px;
    height: 100%;
    box-shadow: 2px 0 1px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
	color:#74B9FF;
    .but {
		transition:all .3s ease;
		cursor:pointer;
		margin:5px 0 0;
        width: 100%;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
		
    }
	.but:hover{
		background:#74B9FF;
		color:#fff;

	}
	.but:active{
			background:#558fff
		}
	
    .exit {
		margin:10px 0;
        margin-top: auto;

    }
}
</style>