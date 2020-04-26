<template>
  <div id="home" class="page">
    <div class="left-panel"></div>
    <div class="right-panel">
      <h1>
        talk:
        <span class="logo-style">now</span>
      </h1>

      <div class="go">
        <input placeholder="first name" v-model="name" v-on:change="storeName" />
        <button v-on:click="$emit('change-page', 'questions')">
          <i class="fal fa-long-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      name: null
    };
  },
  methods: {
    storeName() {
      this.$parent.storeName(this.name);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home {
  display: flex;
  flex-direction: row;
}

.left-panel {
  flex: 1;
  display: flex;
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

.logo-style {
  color: pink;
}

.go {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  height: 48px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.go input {
  font-size: 1em;
  outline: none;
  border: 2px solid pink;
  padding: 8px 16px;
  padding-right: 0;
  width: 200px;
  border-radius: 8 0px 0px 8;
}
.go button {
  background: pink;
  border: none;
  outline: none;
  font-size: 1em;
  padding: 0;
  text-align: center;
  width: 48px;
  border-radius: 0px 8px 8px 0px;
  cursor: pointer;
}
</style>
