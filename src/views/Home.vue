<template>
  <div class="home">
    <h1>Welcome to Open-Data-Service UI</h1>
    <h2>Version: {{version}}</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Home extends Vue {
  public version: string = '0.1.0';
}
</script>
