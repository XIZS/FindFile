<template>
<button class="ff-button">
	<slot></slot>
</button>
</template>

<style lang="scss">
	.ff-button{
		cursor:pointer;
		padding:10px;
		margin:0 5px;
		border:none;
		outline:none;
		background:#74b9ff;
		color:white;
		font-size: 14px;
		font-weight: 600;
		&:hover{
			background:#0984e3;
		}
	}
	
</style>