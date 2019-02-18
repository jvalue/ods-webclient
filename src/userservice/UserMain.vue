<template>
  <div class="user-main">
    <v-card>
      <v-card-title>
        <v-tooltip right>
          <template #activator="data">
            <v-btn slot="activator" v-on="data.on" @click="dialog = true" dark fab top left color="success">
              <i style="font-size: 2em" class="mdi mdi-account-plus"/>
            </v-btn>
          </template>
          <span>Create new user</span>
        </v-tooltip>
        <v-dialog v-model="dialog" max-width="500px">
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
                  type="email"
                  :rules="[required, validMailAddress]"
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

      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        :loading="isLoadingUsers"
        class="elevation-1"
      >
        <v-progress-linear slot="progress" indeterminate></v-progress-linear>
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
import { State, Action } from 'vuex-class';
import * as UserRestService from './userRest';
import User from './user';

const namespace = { namespace: 'user' };

@Component
export default class UserMain extends Vue {

  @State('users', namespace) private users!: User[];
  @State('isLoadingUsers', namespace) private isLoadingUsers!: boolean;
  @State('roles', namespace) private availableRoles!: string[];

  @Action('loadUsers', namespace)
  private loadUsersAction!: () => void;

  @Action('createUser', namespace)
  private createUserAction!: (user: User) => void;

  @Action('deleteUser', namespace)
  private deleteUserAction!: (userID: string) => void;

  @Action('loadRoles', namespace)
  private loadRolesAction!: () => void;

  private headers = [
    { text: 'Name', value: 'name' },
    { text: 'Email', value: 'email' },
    { text: 'Role', value: 'role' },
    { text: 'Action', value: '' },
  ];
  private dialog = false;
  private valid: boolean = false;
  private dialogUser: User = {
    name: '',
    email: '',
    role: '',
    password: '',
  };

  private search = '';
  private showPw = false;

  private required(val: string) {
    return !!val || 'required.';
  }

  private pwLength(pw: string) {
    return pw.length >= 4 || 'min 4 characters.';
  }

  private validMailAddress(mail: string) {
    // tslint:disable-next-line: max-line-length
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(mail) || 'invalid e-mail.';
  }

  private mounted() {
    this.loadRolesAction();
    this.loadUsersAction();
  }

  private deleteUser(user: User) {
    this.deleteUserAction(user.id || 'unknown');
  }

  private close() {
    this.dialog = false;
    setTimeout(() => {
      this.resetForm();
    }, 300);
  }

  private save() {
    this.createUserAction(this.dialogUser);
    this.dialog = false;
  }

  private resetForm() {
    (this.$refs.form as HTMLFormElement).reset();
  }
}
</script>
