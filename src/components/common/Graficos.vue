<template>
  <div class="chart">
    <canvas id="mychart"></canvas>    
  </div>
</template>

<script>
import Chart from 'chart.js'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Graficos',
  props: ['tipo', 'data'],

  computed: {
    ...mapGetters([
      'getRefresh'
    ])
    },

    methods: {
    ...mapMutations([
      'setProcessing',
      'setRefresh'
    ]),

    builGraph() {

    let myChart = document.getElementById('mychart').getContext('2d')

    // Chart.defaults.global.defaultFontFamily = 'Lato';
    // Chart.defaults.global.defaultFontSize = 18;
    // Chart.defaults.global.defaultFontColor = '#777';

    let mbsChart = new Chart(myChart, {
      type: this.tipo, // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: this.data,
      options:{
        title:{
          display:false,
          text:'Titulo',
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });

    }
    },
  
  mounted() {
    let myChart = document.getElementById('mychart').getContext('2d')

    // Chart.defaults.global.defaultFontFamily = 'Lato';
    // Chart.defaults.global.defaultFontSize = 18;
    // Chart.defaults.global.defaultFontColor = '#777';


    if(this.getRefresh) {
        // console.log('Refresco: Entrando ', this.getRefresh)
        // mbsChart.update()
        // this.setRefresh(false)
        // console.log(this.getRefresh)
        // console.log('Refresco: Saliendo', this.getRefresh)

        this.builGraph()
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>