<template>
    <div>
        <div class="card flex justify-content-center" style="padding: 10px">
            <div>Select date: </div>
            <div>
                <Calendar v-model="date" dateFormat="dd-mm-yy" showIcon @date-select="filterData" />
            </div>
        </div>
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
                    <DataTable :value="filterDate" paginator :rows="10" :rowsPerPageOptions="[10, 20, 30, 40, 50]" stripedRows tableStyle="min-width: 40rem"
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
    </div>
</template>

<script setup>

</script>

<script >
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios'
import { chartOps } from '@/model/chartOption2';
import { ref } from 'vue'
import Calendar from 'primevue/calendar';
import moment from 'moment'
const date = ref();

export default {
    name: "DataPage",
    props: {
        msg: String,
    },
    components: {
        DataTable,
        Column,
        Calendar
    },

    data() {
        return {
            data_log: [],
            filterDate: [],
            columns: null,
            date: date,
            chartOpS1: chartOps.options[0],
            chartOpS2: chartOps.options[1],
            chartOpS3: chartOps.options[2],
            chartOpS4: chartOps.options[3],
            chartOpS5: chartOps.options[4],
            chartOpS6: chartOps.options[5],
            chartOpS7: chartOps.options[6],
            chartOpS8: chartOps.options[7],
            series1: chartOps.series[0],
            series2: chartOps.series[1],
            series3: chartOps.series[2],
            series4: chartOps.series[3],
            series5: chartOps.series[4],
            series6: chartOps.series[5],
            series7: chartOps.series[6],
            series8: chartOps.series[7],
        }
    },

    created() {
        this.columns = [{ field: 'StartDate', header: 'Start Date' },
        { field: 'DiameterSensor1', header: 'Diameter Sensor 1' },
        { field: 'DiameterSensor2', header: 'Diameter Sensor 2' },
        { field: 'HeightSensor3', header: 'Height' },
        { field: 'CO2emission', header: 'CO2 Emission' },
        { field: 'AirHumidity', header: 'Air Humidity' },
        { field: 'Temperature1', header: 'Temp 1' },
        { field: 'Temperature2', header: 'Temp 2' },
        { field: 'Weight', header: 'Weight' },
        ];
    },

    mounted() {
        this.loadData();
    },

    methods: {
        loadData() {
            axios.get('http://100.93.101.37:8000/get/fileData').then((res) => {
                this.data_log = res.data;
                this.fillDate(this.data_log);
            })
        },

        filterData() {
            let dateStr = moment(this.date).format('DD-MM-YYYY');
            let fltDate = this.data_log.filter((a) => a.StartDate.split(' ')[0] == dateStr);
            this.fillDate(fltDate);
        },

        fillDate(data) {
            this.filterDate = data;
            // let times = []
            this.chartOpS1.xaxis.categories = [];
            this.chartOpS2.xaxis.categories = [];
            this.chartOpS3.xaxis.categories = [];
            this.chartOpS4.xaxis.categories = [];
            this.chartOpS5.xaxis.categories = [];
            this.chartOpS6.xaxis.categories = [];
            this.chartOpS7.xaxis.categories = [];

            this.series1[0].data = [];
            this.series2[0].data = [];
            this.series3[0].data = [];
            this.series4[0].data = [];
            this.series5[0].data = [];
            this.series6[0].data = [];
            this.series7[0].data = [];
            this.series8[0].data = [];

            for (const item of this.filterDate) {
                let splTime = item.StartDate.split(' ');
                let date = splTime[0].split('-');
                let times = new Date(`${date[2]}-${date[1]}-${date[0]} ${splTime[1]}`).getTime();

                this.chartOpS1.xaxis.categories.push(times);
                this.chartOpS2.xaxis.categories.push(times);
                this.chartOpS3.xaxis.categories.push(times);
                this.chartOpS4.xaxis.categories.push(times);
                this.chartOpS5.xaxis.categories.push(times);
                this.chartOpS6.xaxis.categories.push(times);
                this.chartOpS7.xaxis.categories.push(times);

                this.series1[0].data.push(parseFloat(item.DiameterSensor1).toFixed(2));
                this.series2[0].data.push(parseFloat(item.DiameterSensor2).toFixed(2));
                this.series3[0].data.push(parseFloat(item.HeightSensor3).toFixed(2));
                this.series4[0].data.push(parseFloat(item.Weight).toFixed(2));
                this.series5[0].data.push(parseFloat(item.CO2emission).toFixed(2));
                this.series6[0].data.push(parseFloat(item.Temperature1).toFixed(2));
                this.series7[0].data.push(parseFloat(item.AirHumidity).toFixed(2));
                this.series8[0].data.push(parseFloat(item.Temperature2).toFixed(2));

                // times.push(new Date(`${date[2]}-${date[1]}-${date[0]} ${splTime[1]}`).getTime());

                // sr1.push(parseFloat(item.DiameterSensor1).toFixed(2));
                // sr2.push(parseFloat(item.DiameterSensor2).toFixed(2));
                // sr3.push(parseFloat(item.HeightSensor3).toFixed(2));
                // sr4.push(parseFloat(item.Weight).toFixed(2));
                // sr5.push(parseFloat(item.CO2emission).toFixed(2));
                // sr6.push(parseFloat(item.Temperature1).toFixed(2));
                // sr7.push(parseFloat(item.AirHumidity).toFixed(2));
                // sr8.push(parseFloat(item.Temperature2).toFixed(2));
            }

            // this.chartOpS1.xaxis.categories = times;
            // this.chartOpS2.xaxis.categories = times;
            // this.chartOpS3.xaxis.categories = times;
            // this.chartOpS4.xaxis.categories = times;
            // this.chartOpS5.xaxis.categories = times;
            // this.chartOpS6.xaxis.categories = times;
            // this.chartOpS7.xaxis.categories = times;

            // this.series1[0].data = sr1;
            // this.series2[0].data = sr2;
            // this.series3[0].data = sr3;
            // this.series4[0].data = sr4;
            // this.series5[0].data = sr5;
            // this.series6[0].data = sr6;
            // this.series7[0].data = sr7;
            // this.series8[0].data = sr8;
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
