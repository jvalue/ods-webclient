<template>
  <div class="user-main">
    <h1>User-Service Configuration</h1>
    <h2>Backend version: {{version}}</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class UserMain extends Vue {
  public version: string = '2.0.0';
}
</script>

