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
              <span class="headline">Add User</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedUser.name" :rules="[required]" label="name"/>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedUser.email"
                      :rules="[required,validMailAdress]"
                      label="email"
                    />
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedUser.password"
                      :rules="[required, pwLength]"
                      :append-icon="showPw ? 'mdi mdi-eye-off':'mdi mdi-eye'"
                      label="password"
                      :type="showPw ? 'text': 'password'"
                      counter
                      @click:append="showPw = !showPw"
                    />
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      :items="availableRoles"
                      :rules="[required]"
                      v-model="editedUser.role"
                      label="Roles"
                    ></v-select>
                  </v-flex>
                </v-layout>

                <v-card-actions>
                  <v-spacer/>
                  <v-btn color="error" flat @click="close">Cancel</v-btn>
                  <v-btn color="primary" flat @click="save">Save</v-btn>
                </v-card-actions>
              </v-container>
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
  public version: string = '2.0.0';
  public users: User[] = [];
  public headers = [
    { text: 'name', value: 'name' },
    { text: 'email', value: 'email' },
    { text: 'role', value: 'role' },
  ];
  public dialog = false;
  public editedUser: User = {
    name: '',
    email: '',
    role: '',
    password: '',
  };
  public defaultUser: User = {
    name: '',
    email: '',
    role: '',
    password: '',
  };
  public editedIndex = -1;
  public availableRoles: string[] = [];
  public search = '';
  public rules = [this.required];
  public showPw = false;

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
    UserRestService.getAllUsers().then(u => this.pushUsers(u));
    UserRestService.getAllRoles().then(r => this.setRoles(r));
  }

  private updateUserRole(user: User) {
    if (user.role === 'ROLE_PUBLIC') {
      user.role = 'public';
    } else if (user.role === 'ROLE_ADMIN') {
      user.role = 'admin';
    } else {
      throw Error('User with id ' + user.id + ' has an invalid role!');
    }
  }

  private deleteUser(deletedUser: User) {
    UserRestService.deleteUserById(deletedUser.id || 'unknown').then(
      r =>
        (this.users = this.users.filter(
          existingUser => existingUser.id !== deletedUser.id,
        )),
    );
  }

  private editUser(user: User) {
    this.editedIndex = this.users.indexOf(user);
  }

  private pushUsers(updated: User[]): void {
    updated.forEach(user => this.updateUserRole(user));
    this.users.push(...updated);
  }

  private addUser(user: User) {
    UserRestService.addUser(this.editedUser).then(r => this.pushUsers([r]));
  }

  private setRoles(roles: string[]) {
    this.availableRoles = roles;
  }

  private close() {
    this.dialog = false;
    setTimeout(() => {
      this.editedUser = Object.assign({}, this.defaultUser);
      this.editedIndex = -1;
    }, 300);
  }

  private save() {
    if (this.editedIndex === -1) {
      this.addUser(this.editedUser);
    } else {
      const id: string = this.users[this.editedIndex].id || '-1';
      UserRestService.deleteUserById(id).then(r => {
        if (r === 200 || r === 201) {
          this.addUser(this.editedUser);
        }
      });
    }
    this.dialog = false;
  }
}
</script>

