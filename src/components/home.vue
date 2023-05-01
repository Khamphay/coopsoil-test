<template>
  <div>
    <ScrollPanel class="home">
      <!-- <div class="flex-item-rigth">
        <div>
          <h3>Active Devices</h3>
          <div>DS18 Temperature</div>
          <input type="Text" value="">
          <div>CO2</div>
          <input type="Text" value="">
          <div>CO2 Temperature</div>
          <input type="Text" value="">
          <div>Relative Humidity</div>
          <input type="Text" value="">
          <div>I2C Device</div>
          <input type="Text" value="">

          <h3>Setting Time To Save</h3>
          <div>Interval to save (s)</div>
          <input type="Text" value="">
        </div>
        <input class="button-start" type="button" value="Start">
        <input class="button-stop" type="button" value="Stop">
      </div> -->
      <div class="flex-item-lelf">
        <section>
          <div class="card">
            <div class='container'>
              <apexchart type="area" height="250" :options="chartOpS1" :series="series1"></apexchart>
            </div>
          </div>
          <div class="card">
            <div class='container'>
              <apexchart type="area" height="250" :options="chartOpS2" :series="series2"></apexchart>
            </div>
          </div>
        </section>
        <section>
          <div class="card">
            <div class='container'>
              <apexchart type="area" height="250" :options="chartOpS3" :series="series3"></apexchart>
            </div>
          </div>
          <div class="card">
            <div class='container'>
              <apexchart type="area" height="250" :options="chartOpS4" :series="series4"></apexchart>
            </div>
          </div>
        </section>
        <section>
          <div class="card">
            <div class='container'>
              <apexchart type="area" height="250" :options="chartOpS5" :series="series5"></apexchart>
            </div>
          </div>
          <div class="card">
            <div class='container'>
              <apexchart type="area" height="250" :options="chartOpS6" :series="series6"></apexchart>
            </div>
          </div>
        </section>
        <section>
          <div class="card">
            <div class='container'>
              <apexchart type="area" height="250" :options="chartOpS7" :series="series7"></apexchart>
            </div>
          </div>
          <div class="card">
            <div class='container'>
              <apexchart type="area" height="250" :options="chartOpS8" :series="series8"></apexchart>
            </div>
          </div>
        </section>
        <hr />
        <div class="card">
          <h3 style="text-align: center; padding-top: 20px;">Data Logger</h3>
          <div class="table">
            <DataTable :value="data_log" paginator :rows="10" :rowsPerPageOptions="[10, 20, 30, 40, 50]" stripedRows tableStyle="min-width: 40rem"
              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate="{first} to {last} of {totalRecords}">
              <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
              <!-- <template #paginatorstart>
                <button type="button" icon="pi pi-refresh"> </button>
              </template>
              <template #paginatorend>
                <Button type="button" icon="pi pi-download" text />
              </template> -->
            </DataTable>
          </div>
        </div>
      </div>
    </ScrollPanel>
  </div>
</template>

<script setup>

</script>

<script >
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios'
import { chartOptions } from '@/model/chartOption';
import { socket } from '@/model/socket';

export default {
  name: "HomePage",
  props: {
    msg: String,
  },
  components: {
    DataTable,
    Column,
  },

  data() {
    return {
      client: null,
      data_log: [],
      columns: null,
      date: [],
      chartOpS1: chartOptions.options[0],
      chartOpS2: chartOptions.options[1],
      chartOpS3: chartOptions.options[2],
      chartOpS4: chartOptions.options[3],
      chartOpS5: chartOptions.options[4],
      chartOpS6: chartOptions.options[5],
      chartOpS7: chartOptions.options[6],
      chartOpS8: chartOptions.options[7],
      series1: chartOptions.series[0],
      series2: chartOptions.series[1],
      series3: chartOptions.series[2],
      series4: chartOptions.series[3],
      series5: chartOptions.series[4],
      series6: chartOptions.series[5],
      series7: chartOptions.series[6],
      series8: chartOptions.series[7],
    }
  },

  created() {
    this.client = socket()
    this.client.emit('ondata');

    this.columns = [{ field: 'StartDate', header: 'Start Date' },
    { field: 'DiameterSensor1', header: 'Diameter Sensor 1' },
    { field: 'DiameterSensor2', header: 'Diameter Sensor 2' },
    { field: 'HeightSensor3', header: 'Height' },
    { field: 'CO2emission', header: 'CO2 Emission' },
    { field: 'AirHumidity', header: 'Air Humidity' },
    { field: 'Temperature1', header: 'Temp 1' },
    { field: 'Temperature2', header: 'Temp 2' },
    { field: 'Weight', header: 'Weight' },
    ]
  },

  mounted() {
    this.client.on('ondata', (res) => {
      let splDate = res.StartDate.split('.')[0];
      let splTime = splDate.split(' ')[1];
      res.StartDate = splDate
      this.data_log.push(res);
      console.log(typeof splTime);
      this.chartOpS7.xaxis.categories.push(splTime);
      this.chartOpS6.xaxis.categories.push(splTime);
      this.chartOpS5.xaxis.categories.push(splTime);
      this.chartOpS4.xaxis.categories.push(splTime);
      this.chartOpS3.xaxis.categories.push(splTime);
      this.chartOpS2.xaxis.categories.push(splTime);
      this.chartOpS1.xaxis.categories.push(splTime);

      this.series1[0].data.push(res.DiameterSensor1);
      this.series2[0].data.push(res.DiameterSensor2);
      this.series3[0].data.push(res.HeightSensor3);
      this.series4[0].data.push(res.Weight);
      this.series5[0].data.push(res.CO2emission);
      this.series6[0].data.push(res.Temperature1);
      this.series7[0].data.push(res.AirHumidity);
      this.series8[0].data.push(res.Temperature2);
    });
  },

  methods: {
    reloadData() {
      axios.get('http://127.0.0.1:5000/get/fileData').then((res) => {
        this.data_log = res.data;
        this.data_log.forEach(item => {
          this.chartOptions.xaxis.categories.push(item.StartDate.split(' ')[0]);
          this.series1[0].data.push(item.DiameterSensor1);
          this.series2[0].data.push(item.DiameterSensor2);
          this.series3[0].data.push(item.HeightSensor3);
          this.series4[0].data.push(item.Weight);
          this.series5[0].data.push(item.CO2emission);
          this.series6[0].data.push(item.Temperature1);
          this.series7[0].data.push(item.AirHumidity);
          this.series8[0].data.push(item.Temperature2);
        });
      });
    }
  }


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
