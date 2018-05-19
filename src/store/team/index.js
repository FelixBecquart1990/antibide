import * as firebase from "firebase";

export default {
  state: {
    team: null
  },
  mutations: {
    SET_TEAM(state, payload) {
      state.team = payload;
    }
  },
  actions: {
    updateTeam({ commit, getters, state, dispatch }, payload) {
      //console.log("Update user's data");
      firebase
        .database()
        .ref("/teams/" + getters.user.team)
        .on("child_changed", team => {
          console.log("child-changed");
          console.log(team.key);
          console.log(team.val());
          let currentTeam = getters.team;
          currentTeam[team.key] = team.val();
          commit("SET_TEAM", currentTeam);
        });
    },
    fetchNewMember({ commit, state, getters, dispatch }, payload) {
      //console.log("Fetch user's data");
      firebase
        .database()
        .ref("/teams/" + getters.user.team)
        .on("child_added", team => {
          console.log(team.key);
          console.log(team.val());
          let currentTeam = getters.team;
          currentTeam[team.key] = team.val();
          commit("SET_TEAM", currentTeam);
        });
    },
    fetchTeam({ commit, state, dispatch }, payload) {
      //console.log("Fetch user's data");
      firebase
        .database()
        .ref("/teams/" + payload.team)
        .once("value")
        .then(team => {
          commit("SET_TEAM", team.val());
          commit("SET_LOADING", false);
        });
    }
  },
  getters: {
    team(state) {
      return state.team;
    }
  }
};
