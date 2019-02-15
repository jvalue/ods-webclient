<template>
  <div class="user-main">
    <h1>User-Service Configuration</h1>
    <h2>Backend version: {{version}}</h2>
    <v-card>
      <v-card-title>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" dark fab top left color="success">
            <i style="font-size: 2em" class="mdi mdi-account-plus"/>
          </v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Create New User</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field v-model="dialogUser.name" label="Name" required></v-text-field>
                <v-text-field
                  v-model="dialogUser.email"
                  label="E-mail"
                  :rules="[required,validMailAdress]"
                ></v-text-field>
                <v-text-field
                  v-model="dialogUser.password"
                  label="Password"
                  :rules="[required, pwLength]"
                  :append-icon="showPw ? 'mdi mdi-eye-off':'mdi mdi-eye'"
                  :type="showPw ? 'text': 'password'"
                  counter
                  @click:append="showPw = !showPw"
                ></v-text-field>
                <v-select
                  v-model="dialogUser.role"
                  :items="availableRoles"
                  label="Role"
                  :rules="[v => !!v || 'Role is required']"
                ></v-select>

                <v-btn color="error" flat @click="close">Cancel</v-btn>
                <v-btn :disabled="!valid" color="primary" flat @click="save">Save</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-spacer/>
        <v-text-field
          v-model="search"
          label="Search"
          append-icon="mdi mdi-account-search"
          single-line
          hide-details
        />
      </v-card-title>

      <v-data-table :headers="headers" :items="users" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.name}}</td>
          <td class="text-xs-left">{{props.item.email}}</td>
          <td class="text-xs-left">{{props.item.role}}</td>
          <td class="justify-center">
            <v-icon small class="mdi mdi-delete" @click="deleteUser(props.item)"/>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as UserRestService from './userRest';
import User from './user';

@Component
export default class UserMain extends Vue {
  private version: string = '2.0.0';
  private users: User[] = [];
  private headers = [
    { text: 'name', value: 'name' },
    { text: 'email', value: 'email' },
    { text: 'role', value: 'role' },
  ];
  private dialog = false;
  private valid: boolean = false;
  private dialogUser: User = {
    name: '',
    email: '',
    role: '',
    password: '',
  };

  private availableRoles: string[] = [];
  private search = '';
  private rules = [this.required];
  private showPw = false;

  private required(val: string) {
    return !!val || 'required.';
  }

  private pwLength(pw: string) {
    return pw.length >= 4 || 'min 4 characters.';
  }

  private validMailAdress(mail: string) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(mail) || 'invalid e-mail.';
  }

  private mounted() {
    this.loadUsers();
    this.loadRoles();
  }

  private loadUsers() {
    console.log('loadUsers');
    UserRestService.getAllUsers().then(u => (this.users = u));
  }

  private loadRoles() {
    UserRestService.getAllRoles().then(r => (this.availableRoles = r));
  }

  private deleteUser(deletedUser: User) {
    UserRestService.deleteUserById(deletedUser.id || 'unknown').then(
      r =>
        (this.users = this.users.filter(
          existingUser => existingUser.id !== deletedUser.id,
        )),
    );
  }

  private addUser(user: User) {
    UserRestService.addUser(user).then(() => this.loadUsers());
  }

  private close() {
    this.dialog = false;
    setTimeout(() => {
      this.resetForm();
    }, 300);
  }

  private save() {
    this.addUser(this.dialogUser);
    this.dialog = false;
  }

  private resetForm() {
    (this.$refs.form as HTMLFormElement).reset();
  }

}
</script>

