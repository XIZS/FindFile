<template>
    <div class="home">
        <Menu @search="e_search" @set="e_setting" @exit="e_exit"></Menu>
        <Setting v-show="show_setting" />
        <main class="main">
            <file-list />

            <status-bar></status-bar>
        </main>
        <search-bar @toggle="e_search" v-show="show_search"></search-bar>
    </div>
</template>

<script>
import Menu from "../components/Menu";
import Setting from "../components/Setting";
import SearchBar from "../components/SearchBar";
import FileList from "../components/FileList";
import StatusBar from "../components/StatusBar";
import Socket from '../socket'

export default {
    components: {
        Menu,
        Setting,
        SearchBar,
        FileList,
        StatusBar
    },

    methods: {
        
        e_search() {
			console.log("show",this.show_search);

			this.show_search = !this.show_search
			console.log("show",this.show_search);
        },
        e_setting() {
			console.log('seach..........')
            this.show_setting = !this.show_setting;
        },
        e_exit() {
			// console.log(this.socket)
			Socket.exit_app();
		}
    },
    data() {
        return {
            show_setting: true,
            show_search: false
        };
    }
};
</script>

<style lang="scss">
.home {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
}
.main {
    overflow: hidden;

    flex: 1;
    position: relative;
}
</style>