<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import HelloWorld from '@/userservice/HelloWorld.vue'; // @ is an alias to /src

@Component({
  name: 'home',
  components: {
    HelloWorld,
  },
})
export default class extends Vue {}
</script>
