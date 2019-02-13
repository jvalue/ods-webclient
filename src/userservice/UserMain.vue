<template>
  <div class="user-main">
    <h1>User-Service Configuration</h1>
    <h2>Backend version: {{version}}</h2>
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{props.item.id}}</td>
        <td class="text-xs-left">{{ props.item.name}}</td>
        <td class="text-xs-left">{{props.item.email}}</td>
        <td class="text-xs-left">{{props.item.role}}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editUser(props.item)">edit</v-icon>
          <v-icon small @click="deleteUser(props.item)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
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
  public headers = [
    { text: 'id', value: 'id' },
    { text: 'name', value: 'name' },
    { text: 'email', value: 'email' },
    { text: 'role', value: 'role' },
  ];

  private mounted() {
    this.getUsers();
  }

  private getUsers = () => {
    UserRestService.getAllUsers().then(r => {
      this.users.push(...r);
    });
  };

  private editUser() {
    alert('edit');
  }

  private deleteUser() {
    alert('delete');
  }
}
</script>

