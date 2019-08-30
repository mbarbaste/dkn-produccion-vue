<template lang="html">
  <div class="contenedor _alignCenter">
    <h5>Informe de Revisación</h5>
    
    <fieldset>

			<div class="row">
      	<div class="col m4 row10 _alignRight mtop">Orden Fabricación :</div>
      	<div class="col m1 row10">
					<input type="text"  autocomplete="off" v-model="informeRevisionParams.ofab" :disabled="showInforme">
				</div>
      	<div class="col m7 row10">&nbsp;</div>
      </div>

			<div class="row">
      	<div class="col m4 row10 _alignRight mtop">Artículo :</div>
      	<div class="col m1 row10">
					<input type="text"  autocomplete="off" v-model="informeRevisionParams.articulo" :disabled="showInforme">
				</div>
      	<div class="col m7 row10">&nbsp;</div>
      </div>

			<div class="row">
      	<div class="col m4 row10 _alignRight mtop">Desde / Hasta :</div>
      	<div class="col m3 row10">
					<input class="_full-width" type="date" v-model="informeRevisionParams.desde" required :disabled="showInforme">
				</div>
				<div class="col m3 row10">
					<input class="_full-width" type="date" v-model="informeRevisionParams.hasta" required :disabled="showInforme">
				</div>
				<div class="col m2 row10">&nbsp;</div>
      </div>

			<div class="row">
      	<div class="col m4 row10 _alignRight mtop">Horno :</div>
      	<div class="col m3 row10">
					<select class="_width100" id="horno" @change="changeHorno($event)" :disabled="showInforme">
						<option value="Todos">Todos</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25 Z1">25 Z1</option>
            <option value="25 Z2">25 Z2</option>
          </select>
				</div>
      	<div class="col m5 row10">&nbsp;</div>
      </div>

			<div class="row">
      	<div class="col m4 row10 _alignRight mtop">Tipo de Pieza :</div>
      	<div class="col m3 row10">
					<select class="_width100" id="tipoPieza" @change="changeTipoPieza($event)" :disabled="showInforme">
						<option value="Todas">Todas</option>
            <option value="PG">PLATO GRANDE</option>
            <option value="PC">PLATO CHICO</option>
            <option value="FU">FUENTES</option>
            <option value="TA">TAZAS</option>
            <option value="CO">PIEZAS COLADAS</option>
          </select>
				</div>
      	<div class="col m5 row10">&nbsp;</div>
      </div>

			<div class="row">
      	<div class="col m4 row10 _alignRight mtop">Defecto :</div>
      	<div class="col m3 row10">
					<select class="_width100" id="defecto" @change="changeDefecto($event)" :disabled="showInforme">
						<option value="Todos"> 00- Todos</option>
            <option value="d01">01- DEFORMACION</option>
            <option value="d02">02- PUNTO MARRON</option>
            <option value="d03">03- PIN HOLE</option>
            <option value="d04">04- RAJADO</option>
            <option value="d05">05- CACHADO</option>
            <option value="d06">06- DESPAREJO PASTA</option>
            <option value="d07">07- YESO</option>
						<option value="d08">08- DESPEGADO</option>
						<option value="d09">09- BURBUJA GRANDE</option>
						<option value="d10">10- DESPAREJO ESMALTE</option>

						<option value="d11">11- SALTADO ESMALTE</option>
            <option value="d12">12- RAJADO ESMALTE</option>
            <option value="d13">13- CACHADO ESMALTE</option>
            <option value="d14">14- SALTADO ESMALTE MANIJA</option>
            <option value="d15">15- PASTA</option>
            <option value="d16">16- TOCHI TORCIDO</option>
            <option value="d17">17- CAZETA PEGADO</option>
						<option value="d18">18- BORO</option>
						<option value="d19">19- PEGADO</option>
						<option value="d20">20- TOCHI PEGADO</option>

						<option value="d21">21- AHUMADO</option>
						<option value="d22">22- MANCHADO</option>
						<option value="d23">23- CASCARA NARANJA</option>
						<option value="d24">24- CRUDO</option>
          </select>
				</div>
      	<div class="col m5 row10">&nbsp;</div>
      </div>			

				<hr>
				<div class="row" v-if="!showInforme">
					<input type="button" class=" _danger button"  @click="clickInformeRevisacion($event)" value="Procesar" :disabled="showInforme">
				</div>	

    </fieldset>
		<br>

		<fieldset v-if="showInforme">
			<h5>Resultados</h5>
      <div class="col m5">
        <table align=center>
        <tr><td class="_alignLeft">Cantidad Total: <b>{{cantidadTotal}}</b></td></tr>
				<tr><td class="_alignLeft">Primera:&nbsp;&nbsp;&nbsp;<b>{{primera}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{porcentajePrimera}}%)</td></tr>
				<tr><td class="_alignLeft">Segunda:&nbsp;&nbsp;&nbsp;<b>{{segunda}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{porcentajeSegunda}}%)</td></tr>
				<tr><td class="_alignLeft">Quinta:&nbsp;&nbsp;&nbsp;<b>{{quinta}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{porcentajeQuinta}}%)</td></tr>
				<tr><td class="_alignLeft">Descarte:&nbsp;&nbsp;&nbsp;<b>{{dte}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{porcentajeDte}}%)</td></tr>
				<tr v-if="cantidadDefecto > 0"><td class="_alignLeft">Cantidad con Defectos:&nbsp;&nbsp;&nbsp;<b>{{cantidadDefecto}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{porcentajeDefecto}}%)</td></tr>
				
			</table>
      </div>
			
      <div class="col m7">
        <Graficos :tipo="tipo" :data="data"></Graficos>
      </div>
      <br><br>
			<!-- <input type="button" class=" _danger button"  @click="clickCerrarInforme($event)" value="Cerrar"> -->

		</fieldset>
		<div  v-if="showInforme">
			<br>
			<input type="button" class=" _danger button"  @click="clickCerrarInforme($event)" value="Cerrar">
		</div>
		

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Graficos from '@/components/common/Graficos.vue'

export default {
	components: {
    Graficos
  },
	data() {
		return {

			informeRevisionParams: {
				ofab: 0,
				articulo: '',
				desde: '',
				hasta: '',
				horno: 'Todos',
				tipoPieza: 'Todas',
				defecto: 'Todos'
			},

			showInforme: false,

			primera: 0,
			segunda: 0,
			quinta: 0,
			dte: 0,
			cantidadTotal: 0,
			porcentajePrimera: 0,
			porcentajeSegunda: 0,
			porcentajeQuinta: 0,
			porcentajeDte: 0,
			cantidadDefecto: 0,
			porcentajeDefecto: 0,      

			tipo: 'doughnut', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['Primera', 'Segunda', 'Quinta', 'Descarte'],
        datasets:[{
          label:'Revisacion',
          data:[
            0,
            0,
            0,
            0,
          ],
          //backgroundColor:'green',
          backgroundColor:[
						'rgba(255, 33, 0, 0.8)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            '#FF0000'
          ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:1,
          hoverBorderColor:'#000'
        }]
      }


		}
	},

	mounted() {
		this.informeRevisionParams.desde = this.getHoy.substring(0, 8) + '01'
		this.informeRevisionParams.hasta = this.getHoy
	},

  computed: {
    ...mapGetters([
      'getProcessing',
      'getUrl',
      'getHoy'
    ])
	},
	
	methods: {
    ...mapMutations([
      'setProcessing',
      'setRefresh'
    ]),

		clickInformeRevisacion(e) {
			e.preventDefault();
			
			this.$http.post(this.getUrl + 'informe_revisacion', this.informeRevisionParams)
			.then( respuesta => {
				
				if(respuesta.data.registros > 0) {
					this.primera = respuesta.data.primera
					this.segunda = respuesta.data.segunda
					this.quinta = respuesta.data.quinta
					this.dte = respuesta.data.dte
					this.porcentajePrimera = respuesta.data.porcentajePrimera.toFixed(2)
					this.porcentajeSegunda = respuesta.data.porcentajeSegunda.toFixed(2)
					this.porcentajeQuinta = respuesta.data.porcentajeQuinta.toFixed(2)
					this.porcentajeDte = respuesta.data.porcentajeDte.toFixed(2)
					this.cantidadTotal = respuesta.data.cantidadTotal

					this.cantidadDefecto = respuesta.data.cantidadDefecto
					this.porcentajeDefecto = (respuesta.data.cantidadDefecto / respuesta.data.cantidadTotal * 100).toFixed(2)

          this.data.datasets[0].data = [respuesta.data.primera, respuesta.data.segunda, respuesta.data.quinta, respuesta.data.dte]
					console.log(this.data)
					console.log(respuesta.data)
          this.setRefresh(true)
					
				} else {
					this.primera = 0
					this.segunda = 0
					this.quinta = 0
					this.dte = 0
					this.porcentajePrimera = 0
					this.porcentajeSegunda = 0
					this.porcentajeQuinta = 0
					this.porcentajeDte = 0
					this.cantidadTotal =0

					this.data.datasets[0].data = [0, 0, 0, 0]
          //console.log(this.data)
          this.setRefresh(true)
				}

				this.showInforme = true;
				this.setRefresh(true)

				
			})
			.catch(e => {
				console.log("Error:", e)
			})
		},

		clickCerrarInforme() {
			this.showInforme = false
		},

		changeHorno(e) {
			//console.log('Detecto cambio horno')
			this.informeRevisionParams.horno = e.target.value;
		},
		changeTipoPieza(e) {
			// console.log('Detecto cambio TipoPieza')
			this.informeRevisionParams.tipoPieza = e.target.value;
		},
		changeDefecto(e) {
			// console.log('Detecto cambio Defecto')
			this.informeRevisionParams.defecto = e.target.value;
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

input[type="text"]{ padding: 0px 3px; line-height:0px; width: 60px;}

</style>