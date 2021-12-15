<template>
	<router-view v-slot="{ Component }">
		<component :is="Component"/>
	</router-view>
</template>
<script lang="ts">
// import { Component } from "vue";
export default {
  	name: "App",
};
</script>
