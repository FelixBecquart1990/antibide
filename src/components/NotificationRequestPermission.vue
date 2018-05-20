<template>
<div>
  <v-btn
    @click.native.stop="dialog = true"
    v-if="notification"
    style="margin-bottom:45px"
    absolute
    dark
    fab
    bottom
    left
    color="secondary">
    <v-icon color="primary">notifications_none</v-icon>
  </v-btn>
    
    <v-dialog v-model="dialog" max-width="290">
      <v-card class="color-back">
        <v-card-title class="headline" style="color:#fff">Allow your teammates to encourage you with a push notification</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat="flat" @click.native="dialog = false">later...</v-btn>
          <v-btn color="secondary" flat="flat" @click.native="dialog = false" @click="askForNotificationPermission()">Allow (+50xp)</v-btn>
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
      dialog: false,
      notification: false
    };
  },
  mounted() {
    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        this.notification = true;
      }
    }
  },
  methods: {
    askForNotificationPermission() {
      let self = this;
      Notification.requestPermission(function(result) {
        console.log("User choice", result);
        if (result !== "granted") {
          console.log("No notification permission granted!");
        } else {
          self.notification = false;
          self.$store.commit("SET_EXPERIENCE", 50);
          self.$store.commit("SET_SNACKBAR", "+50 xp");
          self.$store.dispatch(
            "addExperience",
            self.$store.getters.user.experience
          );
          self.$store.dispatch("notificationAllowed");
        }
      });
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
