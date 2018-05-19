<template>
<div>
  <v-layout @click="logout()">
    <div style="position:relative; margin-right:10px">
    <v-tooltip bottom color="secondary">
      <h2 slot="activator">Team</h2>
      <span style="color:#23a6d5">The experience is reset every day</span>
    </v-tooltip>
    </div>
  </v-layout>
  <v-layout mt-2>
    <v-progress-circular style="margin-right:10px" v-if="!team" :size="40" :width="4" indeterminate color="secondary"></v-progress-circular>
    <template v-else>
        <div style="display:inline-block" v-for="(teamMember, index) in teamSorted" :key="index">
          <div style="position:absolute;margin-top:0px">
            <div class="avatar" :style="{ 'background-image':'url('+ teamMember.photoURL +')'}"></div>
          </div>
          <div style="position:relative; margin-right:10px">
            <v-tooltip bottom color="secondary">
              <v-progress-circular slot="activator"  color="secondary" size="40" :rotate="rotate" :value="teamMember.experience/3"></v-progress-circular>
              <span style="color:#23a6d5">{{teamMember.displayName}}: {{teamMember.experience}}xp</span>
          </v-tooltip>
          </div>
          <div class="rank" v-if="index==0 && teamMember.experience>0">1st</div>
          <div class="rank" v-if="index==1 && teamMember.experience>0">2nd</div>
          <div class="rank" v-if="index==2 && teamMember.experience>0">3rd</div>
        </div>
    <!--div id="linker" class="hidden-xs-only elevation-1" @click="share" :value="'https://antibideforever.firebaseapp.com/'+user.team" style="cursor:pointer;background-color: white;border-radius: 25px;text-align: center;padding-top: 9px;width: 60px;color: #23a6d5;height: 40px;">+<span style="margin-bottom:-5px">ADD</span></div-->
      <social-sharing class="hidden-sm-and-up" v-if="user" :url="'https://antibideforever.firebaseapp.com/signin/'+user.team" inline-template>
        <network network="whatsapp">
          <div class="elevation-1" style="cursor:pointer;background-color: white;border-radius: 25px;text-align: center;padding-top: 9px;width: 60px;color: #23a6d5;height: 40px;">+<span style="margin-bottom:-5px">ADD</span></div>
        </network>
      </social-sharing>
    </template>
  </v-layout>
</div>
</template>

<script>
import * as firebase from "firebase";

export default {
  name: "Team",
  data() {
    return {
      rotate: -90
    };
  },
  computed: {
    team() {
      return this.$store.getters.team;
    },
    user() {
      return this.$store.getters.user;
    },
    teamSorted(){
      //console.log(this.team)
      let array = Object.values(this.team).sort(function(a,b) {return (a.experience < b.experience) ? 1 : ((b.experience < a.experience) ? -1 : 0)} )
      return array
    }
  },
  methods: {
    logout: function() {
      /*this.$store.dispatch("logout");
      this.$store.commit("SET_USER", null);
      this.$router.push("/signin")*/
      //this.$store.dispatch("fetchNewMember");
    },
    /*share() {
      this.$store.commit("SET_SNACKBAR", "Link copied to clipboard");
    }*/
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar {
  height: 40px;
  width: 40px;
  background-position: center;
  background-size: 40px;
  position: relative;
  margin-right: 10px;
}
.rank {
  background-color: white;
  border-radius: 10px;
  height: 15px;
  width: 26px;
  margin-left: 14px;
  color: #23a6d5;
  text-align: center;
  font-size: 10px;
  margin-top: -15px;
  position: absolute;
}
.add {
  cursor: pointer;
  background-color: white;
  border-radius: 25px;
  text-align: center;
  padding-top: 9px;
  width: 60px;
  color: #23a6d5;
  height: 40px;
}

* {
  /*border: solid 1px red;*/
}

</style>
