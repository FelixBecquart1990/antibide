<template>
  <v-app id="app" style="background-color:white">
    <main>
      <router-view></router-view>
    </main>
    <Snackbar ref="snackbar"/>
  </v-app>
</template>

<script>

export default {
  name: "app",
  components: {
    Snackbar: () => import("@/components/Snackbar")
  }
};

</script>

<style>

* {
  font-family: mainFont;
}
*,
*:active,
*:focus {
  user-select: none;
  outline: none;
  text-decoration: none;
}

@font-face {
  font-family: mainFont;
  src: url("/static/Quicksand-Bold.ttf");
}

h2 {
  color: #fff;
}
/*.color-back {
  background: linear-gradient(-45deg, #e73c7e, #23a6d5, #23d5ab) !important;
  background-size: 400% 400% !important;
  -webkit-animation: Gradient 15s ease infinite !important;
  -moz-animation: Gradient 15s ease infinite !important;
  animation: Gradient 15s ease infinite !important;
}*/

@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>