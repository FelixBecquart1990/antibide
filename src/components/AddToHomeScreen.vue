<template>
<div>
  <v-btn
    @click.native.stop="dialog = true"
    v-if="notYetAddedToHomeScreen"
    style="margin-bottom:45px"
    absolute
    dark
    fab
    bottom
    right
    color="secondary">
    <v-icon color="primary">add_to_home_screen</v-icon>
  </v-btn>
    
    <v-dialog v-model="dialog" max-width="290">
      <v-card class="color-back">
        <v-card-title class="headline" style="color:#fff">Add Antibide to your home screen</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat="flat" @click.native="dialog = false">later...</v-btn>
          <v-btn color="secondary" flat="flat" @click.native="dialog = false" @click="addToHomeScreen()">Add (+50xp)</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
  name: "AddToHomeScreen",
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    notYetAddedToHomeScreen() {
      return this.$store.getters.addToHomeScreen;
    }
  },
  methods: {
    addToHomeScreen() {
      let self = this;
      if (this.notYetAddedToHomeScreen) {
        this.notYetAddedToHomeScreen.prompt();
        this.notYetAddedToHomeScreen.userChoice.then(function(choiceResult) {
          console.log(choiceResult.outcome);
          if (choiceResult.outcome === "dismissed") {
            console.log("User cancelled installation");
          } else {
            console.log("User accepted installation");
            self.$store.commit("SET_EXPERIENCE", 50);
            self.$store.commit("SET_SNACKBAR", "+50 xp");
            self.$store.dispatch(
              "addExperience",
              self.$store.getters.user.experience
            );
            self.$store.dispatch("addToHomeScreen");
          }
        });
        this.$store.commit("SET_ADD_TO_HOME_SCREEN", null);
      }
    }
  }
};
</script>

<style scoped>
.color-back {
  background: linear-gradient(-45deg, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: Gradient 15s ease infinite;
  -moz-animation: Gradient 15s ease infinite;
  animation: Gradient 15s ease infinite;
}
</style>
