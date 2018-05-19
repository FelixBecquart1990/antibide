// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import * as firebase from "firebase";
import router from "./router";
import { store } from "./store";

import SocialSharing from "vue-social-sharing";
Vue.use(SocialSharing);

Vue.use(Vuetify, {
  theme: {
    primary: "#23a6d5",
    secondary: "#fff",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyDMQQOrKMhm_kwgkrj7lpqzAo_Szcl1vUQ",
      authDomain: "antibideforever.firebaseapp.com",
      databaseURL: "https://antibideforever.firebaseio.com",
      projectId: "antibideforever",
      storageBucket: "",
      messagingSenderId: "415656403542"
    });
    // banner
    let self = this
    window.addEventListener("beforeinstallprompt", function(event) {
      event.preventDefault();
      self.$store.commit("SET_ADD_TO_HOMESCREEN", event);
      return false
    });
    // Auth
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User is signed in");
        //console.log(user)
        this.$store.dispatch("fetchUser", user);

        this.$router.push("/");
      } else {
        console.log("no user");
        this.$router.push("/signin");
        //this.$store.dispatch("createAnonymousUser")
        //localStorage.clear();
        //this.$store.dispatch('fetchData')
      }
    });
  }
});
