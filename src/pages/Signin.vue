<template>
    <div>
      <img src="../../static/img/soul.gif" alt="walking guy" class="walking-guy"> 
      <div v-if="!loading" class="buttons">
        <v-layout class="elevation-3 button-home" mt-4>
          <v-flex v-if="user" style="width:200px" @click="myTeam()">
            <h1 class="button-text">My team</h1>
          </v-flex>
          <v-dialog v-else v-model="dialog" max-width="290">
            <v-flex slot="activator"  style="width:200px">
              <h1 class="button-text">Create a team</h1>
            </v-flex>
            <v-card>
              <div id="facebook-connect" @click="facebookSignup()">
                <div id="sign-up"><img id="fb-picture" src="../../static/img/fb.png"/>Sign up with Facebook</div>
              </div>
            </v-card>
          </v-dialog>
        </v-layout>
      </div>
      <div v-else style="display:flex;justify-content:center">
        <v-progress-linear class="loading" :indeterminate="true"></v-progress-linear>
      </div>



    </div>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  methods: {
    myTeam(){
      this.$router.push("/")
    },
    facebookSignup() {
      this.$store.dispatch("facebookSignup", false);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#facebook-connect {
  background-color: #3b5998;
  color: #fff;
  line-height: 52px;
  text-align: center;
  cursor: pointer;
}
#facebook-connect:hover {
  background-color: #4063a0;
}
#fb-picture {
  width: 20px;
  margin-right: 13px;
  margin-bottom: -4px;
  font-size: bold;
}

.buttons {
  position: fixed;
  bottom: 100px;
  width: 100%;
}
.loading {
  position: fixed;
  bottom: 100px;
  width: 20%;
  border-radius:5px;
}
.walking-guy {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 400px;
}
.button-home {
  cursor: pointer;
  border-radius: 30px;
  background-color: #23a6d5;
  height: 60px;
  width: 200px;
  margin-right: auto;
  margin-left: auto;
}
.button-text {
  text-align: center;
  color: #fff;
  font-size: 20px;
  padding-top: 15px;
  width: 100%;
}
</style>
