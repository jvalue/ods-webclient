<template>
  <v-toolbar-items>
    
    <v-btn v-show="!isAuth" flat @click="onLogin">Login
      <v-icon dark right>mdi-account</v-icon>
    </v-btn>
    
    <v-menu  v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
      <template v-slot:activator="{ on }">
        <v-btn v-show="isAuth" v-on="on" flat to="/">Andi
          <v-icon dark right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>Andi Bauer</v-list-tile-title>
            <v-list-tile-sub-title>andi@internet.de</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile @click="onEditProfile">
          <v-list-tile-title>Edit Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="onLogout">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar-items>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, State } from 'vuex-class';
import { KeycloakProfile } from 'keycloak-js';

@Component
export default class Login extends Vue {
  private isAuth: boolean = false;
  private menu: boolean = false;

  private onLogout() {
    this.isAuth = false;
    this.menu = false;
  }

  private onEditProfile() {
    alert('on edit profile not implemented yet');
    this.menu = false;
  }
}
</script>
