<template>
  <div id="questions" class="page">
    <div class="left-panel">
      <div class="q-container">
        <div>
          <div class="qprompt">
            Which would you like to talk about?
          </div>
          <div class="q">
            <input
              type="radio"
              name="problem"
              id="p1"
              value="P1"
              v-model="problem"
              v-on:change="selectProblem"
            />
            <label for="p1">Education/Grades</label>
          </div>
          <div class="q">
            <input
              type="radio"
              name="problem"
              id="p2"
              value="P2"
              v-model="problem"
              v-on:change="selectProblem"
            />
            <label for="p2">Familial Relationships</label>
          </div>
          <div class="q">
            <input
              type="radio"
              name="problem"
              id="p3"
              value="P3"
              v-model="problem"
              v-on:change="selectProblem"
            />
            <label for="p3">Romantic Relationships</label>
          </div>
          <div class="q">
            <input
              type="radio"
              name="problem"
              id="p4"
              value="P4"
              v-model="problem"
              v-on:change="selectProblem"
            />
            <label for="p4">Friendships/Social Connections</label>
          </div>
          <div class="q">
            <input
              type="radio"
              name="problem"
              id="p5"
              value="P5"
              v-model="problem"
              v-on:change="selectProblem"
            />
            <label for="p5">Finances</label>
          </div>
          <div class="q">
            <input
              type="radio"
              name="problem"
              id="p6"
              value="P6"
              v-model="problem"
              v-on:change="selectProblem"
            />
            <label for="p6">Unemployment</label>
          </div>
          <div class="q">
            <input
              type="radio"
              name="problem"
              id="p7"
              value="P7"
              v-model="problem"
              v-on:change="selectProblem"
            />
            <label for="p7">Medical Problems</label>
          </div>
          <div class="q">
            <input
              type="radio"
              name="problem"
              id="p8"
              value="P8"
              v-model="problem"
              v-on:change="selectProblem"
            />
            <label for="p8">Stress/Trauma</label>
          </div>
          <div class="q">
            <input
              type="radio"
              name="problem"
              id="p9"
              value="P9"
              v-model="problem"
              v-on:change="selectProblem"
            />
            <label for="p9">Abuse</label>
          </div>
          <div class="q">
            <input
              type="radio"
              name="problem"
              id="p10"
              value="P10"
              v-model="problem"
              v-on:change="selectProblem"
            />
            <label for="p10">Just Talk</label>
          </div>
        </div>
      </div>
    </div>
    <div class="right-panel">
      How do you feel right now?
      <div class="feeling-container">
        <div v-for="item in feeling" :key="item.id">
          <img
            :src="getImgUrl(item.id)"
            @click="selectFeeling(item.id)"
            v-bind:class="{ active: selectedFeeling == item.id }"
          />
        </div>
      </div>
      <div class="feeling">
        Describe how you feel
        <textarea
          class="feel-ans"
          v-model="feel"
          placeholder="I feel..."
          v-on:change="howIFeel"
        ></textarea>
      </div>
      <button class="next" v-on:click="$emit('change-page', 'loading')">
        <i class="fal fa-long-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionsPage',
  props: ['selectedProblems', 'selectedFeeling'],
  data() {
    return {
      feeling: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
      ],
      problem: null,
      feel: null,
    };
  },
  // computed: {
  //   isFeelingSelected(id) {
  //     return this.$props.selectedFeeling == id;
  //   },
  // },
  methods: {
    selectFeeling(id) {
      this.$parent.selectFeeling(id);
    },
    selectProblem() {
      this.$parent.selectProblem(this.problem.substring(1));
    },
    getImgUrl(id) {
      return require('../assets/baymax/' + id + '.png');
    },
    isFeelingSelected(id) {
      return this.$props.selectedFeeling == id;
    },
    howIFeel() {
      this.$parent.howIFeel(this.feel);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#questions {
  display: flex;
  flex-direction: row;
}
.feel-ans {
  margin: 20px;
  width: 340px;
}
.q-container {
  width: fit-content;
  border: 5px solid white;
  border-radius: 48px 48px 48px 48px;
  padding: 30px;
  background: rgb(248, 170, 183);
}
.q-prompt {
  margin-bottom: 15px;
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
.feeling-container {
  margin: 32px 0;
  max-width: calc(70px * 5);
}
.feeling-container div {
  display: inline;
}
.feeling-container img {
  background: none;
  height: 50px;
  width: 50px;
  margin: 10px;
  border-radius: 100%;
  filter: brightness(150%);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.1s ease;
  border: 1px solid white;
  box-sizing: border-box;
}
.feeling-container img:hover {
  cursor: pointer;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.3);
}
.feeling-container img.active {
  box-shadow: 0px 0px 16px 8px rgba(255, 20, 147, 0.3);
}
.next {
  border: 2px solid rgb(190, 188, 188);
  background: pink;
  outline: none;
  font-size: 1em;
  padding: 0;
  text-align: center;
  width: 70px;
  height: 30px;
  border-radius: 48px 48px 48px 48px;
  cursor: pointer;
}
</style>
