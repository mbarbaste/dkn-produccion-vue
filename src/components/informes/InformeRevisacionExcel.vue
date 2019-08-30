<template lang="html">
  <div class="contenedor _alignCenter">
    <h5>Informe de Revisación (Excel)</h5>
    
    <fieldset>

			<div class="row">
      	<div class="col m3 row10 _alignRight mtop">Desde / Hasta :</div>
      	<div class="col m3 row10">
					<input class="_full-width" type="date" v-model="desde" required>
				</div>
				<div class="col m3 row10">
					<input class="_full-width" type="date" v-model="hasta" required>
				</div>
				<div class="col m3 row10">&nbsp;
					<a :href="reporteRevisacionExcel" target="_blank">
            <i title="Descarga Informe de Revisión" class="fa fa-download" aria-hidden="true"></i>
        </a>
				</div>
      </div>

				<!-- <hr> -->
				<!-- <div class="row">
					<input type="button" class=" _danger button"  @click="reporteRevisacionExcel($event)" value="Procesar">
				</div>	 -->

				<!-- <a :href="reporteRevisacionExcel" target="_blank">
            <i title="Descarga Informe de Revisión" class="fa fa-download" aria-hidden="true"></i>
        </a> -->
			<br>
    </fieldset>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	
	data() {
		return {

			desde: '',
			hasta: ''

			}
	},	

	mounted() {
		this.desde = this.getHoy.substring(0, 8) + '01'
		this.hasta = this.getHoy
	},

  computed: {
    ...mapGetters([
      'getProcessing',
      'getUrl',
      'getHoy'
		]),

		reporteRevisacionExcel() {
      return (
        "https://produccion.dynalias.com/reportes/excel/revisacion/?q=" + this.desde + "|" + this.hasta
      );
    }
		
	}
}
</script>

<style lang="css" scoped>

.row10 {
  max-height: 35px;
}

.mtop {
	margin-top: 9px;
}

.fa-download {
	font-size: 4rem;
}

.fa-download:hover {
	color: crimson;
}

input[type="text"]{ padding: 0px 3px; line-height:0px; width: 60px;}

</style>