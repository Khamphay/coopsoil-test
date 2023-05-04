<template>
  <div>
    <TabView>
      <TabPanel header="All Data">
        <DataPage />
      </TabPanel>
      <TabPanel header="Real Time Monitor">
        <RealTimePage />
      </TabPanel>

    </TabView>
  </div>
</template>

<script setup>

</script>

<script >
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import RealTimePage from './realtimepage.vue'
import DataPage from './datapage.vue'

export default {
  name: "HomePage",
  props: {
    msg: String,
  },
  components: {
    TabView,
    TabPanel,
    RealTimePage,
    DataPage
  },

  data() {
    return {

    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  padding: 1rem;
  display: flex;
  flex-direction: row;
  height: max-content;
}

.flex-item-rigth {
  width: 300px;
  background-color: #ffffff;
}

.flex-item-lelf {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

section {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.card {
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 12px -4px rgba(31, 107, 5, 0.514);

}

.container {
  padding: 2px;
}

.table {
  padding: 10px;
}

h3 {
  margin: 20px 0 10px;
}

input {
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 6px 0 15px;
  padding: 10px;
}

.button-start,
.button-stop {
  outline: 1;
  border: 1;
  margin-right: 12px;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-weight: 600;
  height: 40px;
  line-height: 1.17;
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
  text-align: center;
}

.button-start:focus {
  border-color: #03744b;
}

.button-stop:focus {
  border-color: #03744b;
}
</style>
