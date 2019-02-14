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
      <template slot="footer">
        <td :colspan="headers.length" align="left">
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn slot="activator" color="success">ADD</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">Add User</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedUser.id" label="id"/>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedUser.name" label="name"/>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedUser.email" label="email"/>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedUser.role" label="role"/>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedUser.password" label="password"/>
                    </v-flex>
                  </v-layout>

                  <v-card-actions>
                    <v-spacer/>
                    <v-btn color="blue-darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue-darken-1" flat @click="save">Save</v-btn>
                  </v-card-actions>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>

          <!-- <v-btn color="success" @click="addUser">add user</v-btn> -->
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
  public dialog = false;
  public editedUser: User = {
    id: '',
    name: '',
    email: '',
    role: '',
    password: '',
  };
  public defaultUser: User = {
    id: '',
    name: '',
    email: '',
    role: '',
    password: '',
  };
  public editedIndex = -1;

  private mounted() {
    this.getUsers();
  }

  private getUsers = () => {
    UserRestService.getAllUsers().then(r => {
      this.users.push(...r);
    });
  };

  private deleteUser(deletedUser: User) {
    UserRestService.deleteUserById(deletedUser.id).then(
      r =>
        (this.users = this.users.filter(
          existingUser => existingUser.id !== deletedUser.id
        ))
    );
  }

  private editUser(user: User) {
    alert('edit');
  }

  private close() {
    this.dialog = false;
    setTimeout(() => {
      this.editedUser = Object.assign({}, this.defaultUser);
      this.editedIndex = -1;
    }, 300);
  }

  private save() {
    UserRestService.addUser(this.editedUser).then(r => this.users.push(r));
    this.dialog = false;
  }
}
</script>

