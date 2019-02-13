<template>
  <div class="user-main">
    <h1>User-Service Configuration</h1>
    <h2>Backend version: {{version}}</h2>
    <ul>
      <li v-for="user in users" :key="user.id">{{user}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as UserRestService from './userRest';
import User from './user';

@Component
export default class UserMain extends Vue {
  public version: string = '2.0.0';
  public users: User[] = [];

  private mounted() {
    this.getUsers();
  }

  private getUsers = () => {
    UserRestService.getAllUsers().then(r => {
      this.users.push(...r);
    });
  }
}
</script>

