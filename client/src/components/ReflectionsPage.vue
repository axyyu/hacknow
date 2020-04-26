<template>
  <div id="reflections" class="page">
    <div class="left-panel">
      This is how you felt before:
      <img :src="getImgUrl(this.$parent.feeling || 5)" class="oldfeel" />
      {{ this.$parent.feel }}
      How do you feel now?
      <div class="feeling-container">
        <div v-for="item in feeling" :key="item.id">
          <img :src="getImgUrl(item.id)" />
        </div>
      </div>
    </div>
    <div class="right-panel">
      <h1>
        <button class="go-home" v-on:click="$emit('change-page', 'questions')">
          talk:
          <span class="logo-style">again</span>
        </button>
      </h1>
      <img class="bear" src="../assets/bear.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ReflectionsPage",
  props: ["selectedFeeling"],
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
        { id: 10 }
      ]
    };
  },
  methods: {
    getImgUrl(id) {
      return require("../assets/baymax/" + id + ".png");
    },
    isFeelingSelected(id) {
      return this.$props.selectedFeeling == id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#reflections {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: pink;
  width: 100%;
  height: 100%;
}
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.logo-style {
  color: pink;
}
.oldfeel {
  margin: 20px;
  filter: brightness(150%);
  margin-bottom: 50px;
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
.go-home {
  border: 2px solid pink;
  font-weight: bold;
  background: white;
  outline: none;
  font-size: 1em;
  padding: 0;
  text-align: center;
  width: 250px;
  height: 70px;
  border-radius: 48px 48px 48px 48px;
  margin-top: 100px;
  margin-bottom: 30px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.1s ease;
}
.go-home:hover {
  box-shadow: 0px 0px 16px 8px rgba(255, 20, 147, 0.3);
}
.h1 {
  display: flex;
  flex-direction: column;
}
.bear {
  max-width: 200px;
  max-height: 200 px;
  animation-name: bob;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(50px);
  }
}
</style>
