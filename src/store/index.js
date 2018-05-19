import Vue from "vue";
import Vuex, { createNamespacedHelpers } from "vuex";
import team from './team'
import user from './user'
import utilities from './utilities'
import snackbar from './snackbar'
import missions from './missions'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    team,
    user,
    utilities,
    snackbar,
    missions
  }
});
