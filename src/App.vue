<template>
  <div class="nabar p-menubar">
    <Menubar :model="items">
      <template #start>
        <img alt="logo" src="./assets/ird.png" size="40" />
      </template>
      <template #end>
        <h2 style="margin-left: 1rem;">COOP Soil</h2>
      </template>
    </Menubar>
  </div>
  <HomePage id="home" />
</template>

<script>
import HomePage from "./components/home.vue";
import Menubar from 'primevue/menubar';

export default {
  name: "App",
  components: {
    HomePage,
    Menubar
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #3a6a9b;
  margin: 0px;
}

.full {
  width: 100%;
  height: auto;
}

.nabar {
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 200;
  height: 100px;
  position: fixed;
}

#home {
  margin-top: 100px;
}

img {
  width: 80px;
}

img:hover {
  cursor: pointer;
}
</style>
