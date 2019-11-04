<template>
    <div class="status-bar">
        <div class="statu">{{statu}}</div>
        <div class="url">{{url}}</div>
        <div class="progress"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            statu: "搜索中",
            url: "D:/source/node/sdkjlskdj"
        };
    }
};
</script>

<style lang="scss">
.status-bar {
    z-index: 11;
    height: 24px;
    width: 100%;
    background: rgb(53, 124, 255);
    position: absolute;
    bottom: 0;
    display: flex;
    color: white;
    font-size: 14px;
    align-items: center;
    padding: 0 10px;
    overflow: hidden;
    .statu {
        margin-right: 10px;
        z-index: 12;
    }
    .url {
        z-index: 12;
    }

    .progress {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        transform: translateX(-10%);

        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            transform-origin: right center;
            background-image: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0),
                rgb(7, 75, 201)
            );
            animation: scaleX 5s infinite;
        }
    }
}

@keyframes scaleX {
    0% {
        transform: scaleX(1);
    }
    25% {
        transform: scaleX(0.25);
    }
    50% {
        transform: scaleX(0.75);
    }
    50% {
        transform: scaleX(0.25);
    }
    100% {
        transform: scaleX(1);
    }
}
</style>