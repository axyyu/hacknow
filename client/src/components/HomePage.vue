<template>
  <div id="home" class="page">
    <div class="left-panel">
      <img alt="talk:now logo" src="../assets/bear.png" />
    </div>
    <div class="right-panel">
      <h1>talk:<span class="logo-style">now</span></h1>

      <div class="go">
        <input v-model="name" placeholder="first name" />
        <button v-on:click="$emit('change-page', 'questions')">
          go!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
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
}

.go input {
  font-size: 1em;
  outline: none;
  border: none;
  padding: 8px;
  background: grey;
  padding-right: 0;
  border-radius: 36px 0px 0px 36px;
}
.go button {
  background: pink;
  border: none;
  outline: none;
  font-size: 1em;
  text-align: center;
  width: 48px;
  border-radius: 0px 36px 36px 0px;
}
</style>
