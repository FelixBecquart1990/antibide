import * as firebase from "firebase";

export default {
  state: {},
  mutations: {},
  actions: {
    addExperience({ commit, state, getters, dispatch }, experience) {
      //console.log("Fetch user's data");
      if (getters.user.experience>= 300){
        commit("SET_SNACKBAR", "Congratulation! Daily missions accomplished");
      }
      let dataExperience = { experience: experience };
      firebase
        .database()
        .ref("/teams/" + getters.user.team + "/" + getters.user.uid)
        .update(dataExperience);
      firebase
        .database()
        .ref("/users/" + getters.user.uid)
        .update(dataExperience);
    }
  },
  getters: {}
};
