<template>
    <v-snackbar
      :timeout="timeout"
      top
      v-model="snackbar.activated"
      auto-height
      color="primary"
      :class="{ 'hidden': hidden }"
    >
      {{ snackbar.text }}
    </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Snackbar",
  data() {
    return {
      timeout: 3000
    };
  },
  computed: {
    ...mapGetters(["snackbar","hidden"])
  }
};
</script>

<style scoped>
.hidden{
  opacity: 0;
}
</style>
