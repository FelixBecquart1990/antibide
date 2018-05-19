<template>
  <v-container @click="fullScreen()" fluid class="color-back">
    <div style="max-width:500px;margin-right:auto;margin-left:auto">
    <Team ref="team"/>
    <Missions ref="missions"/>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {
    Team: () => import("@/components/Team"),
    Missions: () => import("@/components/Missions")
  },
  methods: {
    fullScreen(){
      // auto fullscreen
      /*var doc = window.document;
      var docEl = doc.documentElement;
      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(window.document.documentElement);
      }*/
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.color-back {
  position: fixed;
  background: linear-gradient(-45deg, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: Gradient 15s ease infinite;
  -moz-animation: Gradient 15s ease infinite;
  animation: Gradient 15s ease infinite;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
}
</style>
