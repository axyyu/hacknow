<template>
  <div id="questions" class="page">
    <div class="left-panel">
      Which category of problems would you like to address?
      <div class="q">
        <input type="radio" id="p1" value="P1" v-model="problem" />
        <label for="p1">P1</label>
      </div>
      <div class="q">
        <input type="radio" id="p2" value="P2" v-model="problem" />
        <label for="p2">P2</label>
      </div>
      <span>Your chosen category is: {{ problem }}</span>
    </div>
    <div class="right-panel">
      How do you feel right now?
      <div class="feeling">
        Describe how you feel
        <textarea v-model="feel" placeholder="I feel..."></textarea>
      </div>
      <button v-on:click="$emit('change-page', 'loading')">go!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionsPage',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#questions {
  display: flex;
  flex-direction: row;
}

.left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: pink;
  justify-content: center;
  align-items: center;
}
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.q {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}
.feeling {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
</style>
