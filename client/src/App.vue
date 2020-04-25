<template>
  <div id="app">
    <HomePage v-if="isHomePage" v-on:change-page="switchPage" />
    <QuestionsPage v-if="isQuestionsPage" />
    <LoadingPage v-if="isLoadingPage" />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue';
import QuestionsPage from './components/QuestionsPage.vue';
import LoadingPage from './components/LoadingPage.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    QuestionsPage,
    LoadingPage,
  },
  data() {
    return {
      currentPage: 'home',
    };
  },
  computed: {
    isHomePage() {
      return this.currentPage == 'home';
    },
    isQuestionsPage() {
      return this.currentPage == 'questions';
    },
    isLoadingPage() {
      return this.currentPage == 'loading';
    },
  },
  methods: {
    switchPage(page) {
      console.log(page);
      this.currentPage = page;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.page {
  height: 100vh;
  width: 100vw;
}
</style>
