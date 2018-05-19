<template>
<div>
  <v-layout mt-4>
    <h2>Missions</h2>
  </v-layout>

  <v-btn
    @click.native.stop="dialog = true"
    v-if="notYetAddedToHomescreen"
    style="margin-bottom:45px"
              absolute
              dark
              fab
              bottom
              right
              color="secondary"
            >
              <v-icon color="primary">add_to_home_screen</v-icon>
            </v-btn>



    <v-dialog v-model="dialog" max-width="290">
      <v-card class="color-back">
        <v-card-title class="headline" style="color:#fff">Add Antibide to your home screen and get a bonus of 50xp!</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat="flat" @click.native="dialog = false">later...</v-btn>
          <v-btn color="secondary" flat="flat" @click.native="dialog = false" @click="addToHomescreen()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


 <v-layout v-if="user" mt-2 row wrap>
   <v-flex xs6 v-for="(exercice, key, index) in exercices" :key="index">
      <v-card style="margin:5px">
        <v-card-media
          :src="exercice.image"
          height="100px"
        >
        </v-card-media>
        <v-card-actions>
          <v-menu offset-y>
                <v-btn icon slot="activator">
           <v-icon color="primary">more_vert</v-icon>
          </v-btn>
      <v-list>
        <v-list-tile-content class="mx-3">
          <v-list-tile-title style="color:#23a6d5;">{{exercice.title}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile  @click.native.stop="openDialogVideo(exercice.src)">
          <v-list-tile-title>
            <v-icon color="primary">videocam</v-icon>
            <span style="color:#23a6d5">watch tutorial</span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

          <v-spacer></v-spacer>

         <v-btn v-if="exercice.id != 'groupClosures'" icon @click.native.stop="openDialogTimer(key)">
           <v-icon color="primary">timer</v-icon>
         </v-btn>
         <v-btn v-else icon @click="addGroupClosures()">
           <span style="color:#23a6d5;font-size:20px">+10</span>
         </v-btn>

        </v-card-actions>
      </v-card>
   </v-flex>

        <v-dialog v-model="dialogVideo" width="266">
      <v-card height="148" style="overflow:hidden">
        <div id="video"></div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogTimer" width="0">
      <div  @click="closeDialogTimer()" style="position:fixed; width:0%;height:0%">
        <div v-if="countDown>0" class="timer">{{countDown}}</div>
        <div v-else class="timer">{{time}}s</div>
      </div>

    </v-dialog>

    </v-layout>
    <v-layout v-else mt-2 row wrap>
      <v-progress-linear class="loading" color="secondary" :indeterminate="true"></v-progress-linear>
    </v-layout>
</div>
</template>

<script>
export default {
  name: "Missions",
  data() {
    return {
      dialog: false,
      counterDown: null,
      countDown: 3,
      time: 0,
      timer: null,
      exercice: null,
      experience: 0,
      exercices: {
        elbowSheathing: {
          id: "elbowSheathing",
          title: "Elbow Sheathing (+2xp/sec)",
          image: "../../static/img/gainage-anime.gif",
          src:
            "https://www.youtube.com/embed/AFdKKFh16lw?rel=0&amp;controls=0&amp;showinfo=0&amp;start=120&amp;autoplay=1"
        },
        groupClosures: {
          id: "groupClosures",
          title: "Group Closures (+2xp/sec)",
          image: "../../static/img/giphy.gif",
          src:
            "https://www.youtube.com/embed/zChOfSt4WVU?rel=0&amp;controls=0&amp;showinfo=0&amp;start=140&amp;autoplay=1"
        },
        spoon: {
          id: "spoon",
          title: "Spoon (+2xp/sec)",
          image: "../../static/img/gainage_abdo_lombaire.gif",
          src:
            "https://www.youtube.com/embed/SAZYcGPYu7E?rel=0&amp;controls=0&amp;showinfo=0&amp;start=25&amp;autoplay=1"
        },
        superman: {
          id: "superman",
          title: "Superman (+2xp/sec)",
          image: "../../static/img/superman.jpg",
          src:
            "https://www.youtube.com/embed/3wbBWYfI-Ic?rel=0&amp;controls=0&amp;showinfo=0&amp;start=67&amp;autoplay=1"
        }
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    notYetAddedToHomescreen() {
      return this.$store.getters.addToHomescreen;
    },
    dialogVideo: {
      get() {
        return this.$store.getters.dialogVideo;
      },
      set() {
        this.$store.commit("SET_DIALOG_VIDEO", false);
        document.getElementById("video").innerHTML = "";
      }
    },
    dialogTimer: {
      get() {
        return this.$store.getters.dialogTimer;
      },
      set() {
        this.closeDialogTimer();
        this.$store.commit("SET_DIALOG_TIMER", false);
      }
    }
  },
  methods: {
    addToHomescreen(){
      let self = this
      if(this.notYetAddedToHomescreen){
        this.notYetAddedToHomescreen.prompt();
        this.notYetAddedToHomescreen.userChoice.then(function(choiceResult){
          console.log(choiceResult.outcome)
          if(choiceResult.outcome === 'dismissed'){
            console.log('User cancelled installation')
          } else {
            console.log('User accepted installation')
            self.$store.commit("SET_EXPERIENCE", 50)
            self.$store.commit("SET_SNACKBAR", "+50 xp");
            self.$store.dispatch("addExperience", self.$store.getters.user.experience)
            self.$store.dispatch("addToHomescreen")
          }
        })
        this.$store.commit("SET_ADD_TO_HOMESCREEN", null);
      }
    },
    openDialogVideo(src) {
      this.$store.commit("SET_DIALOG_VIDEO", true);
      let video = document.createElement("iframe");
      video.src = src;
      video.style = "margin-left:-11px;margin-top:-2px";
      video.width = "290px";
      video.height = "auto";
      video.frameborder = "0";
      video.allow = "autoplay; encrypted-media";
      document.getElementById("video").appendChild(video);
    },
    openDialogTimer(exercice) {
      this.exercice = exercice;
      this.$store.commit("SET_DIALOG_TIMER", true);
      this.countDown = 3;
      this.time = 0;
      let self = this;
      this.counterDown = setInterval(function() {
        self.countDown = self.countDown - 1;
        if (self.countDown <= 0) {
          clearInterval(self.counterDown);
          self.countDown = null;
          self.timer = setInterval(self.startTimer, 1000);
        }
      }, 1000);
    },
    closeDialogTimer() {
      clearInterval(this.counterDown);
      clearInterval(this.timer);
      this.$store.commit("SET_SNACKBAR", "+" + this.time * 2 + " xp");
      this.$store.commit("SET_EXPERIENCE", this.time * 2)
      this.$store.dispatch("addExperience", this.$store.getters.user.experience)
      this.$store.commit("SET_DIALOG_TIMER", false);
    },
    addGroupClosures(){
      this.$store.commit("SET_EXPERIENCE", 25)
      this.$store.commit("SET_SNACKBAR", "+25 xp");
      this.$store.dispatch("addExperience", this.$store.getters.user.experience)
    },
    addElbowSheathing(index, user) {
      this.$store.dispatch("addElbowSheathing", { index, user });
    },
    startTimer() {
      this.time = this.time + 1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.color-back {
  background: linear-gradient(-45deg, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: Gradient 15s ease infinite;
  -moz-animation: Gradient 15s ease infinite;
  animation: Gradient 15s ease infinite;
}
.loading {
  margin-right:auto;
  margin-left:auto;
  width: 20%;
  border-radius:5px;
  margin-top:100px
}
.timer {
  font-size: 50px;
  color: #fff;
  text-align: center;
  width: 200px;
  margin-left: -100px;
  margin-top: -50px;
  background-color: #23a6d5;
  border-radius: 50px;
}
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
  margin-top: -8px;
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
