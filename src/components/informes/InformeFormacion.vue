<template lang="html">
  <div class="contenedor _alignCenter">
    <h5>Informe de Formación</h5> 
 
		<br>

		<fieldset>

			<div class="row">
				<div class="col m4 row10 _alignRight mtop">Orden Fabricación :</div>
				<div class="col m1 row10">
					<input type="text" autocomplete="off" v-model="informeParams.ofab" :disabled="showInforme">
				</div>
				<div class="col m7 row10">&nbsp;</div>
    	</div>

			<div class="row">
				<div class="col m4 row10 _alignRight mtop">Artículo :</div>
				<div class="col m1 row10">
					<input type="text"  autocomplete="off" v-model="informeParams.articulo" :disabled="showInforme">
				</div>
				<div class="col m7 row10">&nbsp;</div>
    	</div>

			<div class="row">
      	<div class="col m4 row10 _alignRight mtop">Desde / Hasta :</div>
      	<div class="col m3 row10">
					<input class="_full-width" type="date" v-model="informeParams.desde" required :disabled="showInforme">
				</div>
				<div class="col m3 row10">
					<input class="_full-width" type="date" v-model="informeParams.hasta" required :disabled="showInforme">
				</div>
				<div class="col m2 row10">&nbsp;</div>
      </div>

			<div class="row">
				<div class="col m4 row10 _alignRight mtop">Máquina :</div>
				<div class="col m3 row10">
					<select class="_width100" id="maquina"  v-model="informeParams.maquina"  :disabled="showInforme">
						<option value="Todas">Todas</option>
						<option value="Torno 1">Torno 1</option>
						<option value="Torno 2">Torno 2</option>
						<option value="Torno 3">Torno 3</option>
						<option value="Torno 4">Torno 4</option>
						<option value="Torno 5">Torno 5</option>
						<option value="Torno 6">Torno 6</option>
						<option value="Torno Fuentes">Torno Fuentes</option>
						<option value="Torno Aleman">Torno Aleman</option>
						<option value="Torno Tazas Automático">Torno Tazas Automático</option>
						<option value="Torno Tazas Semi Aut.">Torno Tazas Semi Aut.</option>
						<option value="Torno Tazas Vicentini">Torno Tazas Vicentini</option>
						<option value="Colado Manual">Colado Manual</option>
						<option value="Colado Automático">Colado Automático</option>
						<option value="Colado Fuentes">Colado Fuentes</option>
						<option value="Prensa">Prensa</option>
					</select>
				</div>
				<div class="col m5 row10">&nbsp;</div>
    	</div>

			<div class="row">
      	<div class="col m4 row10 _alignRight mtop">Tipo de Pieza :</div>
      	<div class="col m3 row10">
					<select class="_width100" id="tipoPieza" v-model="informeParams.tipoPieza" :disabled="showInforme">
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

			<hr>
				<div class="row" v-if="!showInforme">
					<input type="button" class=" _danger button"  @click="clickInformeFormacion($event)" value="Procesar">
				</div>	

		</fieldset>

		<br>
		<fieldset v-if="showInforme">
			<h5>Resultados</h5>
			<table align=center>
				<tr><td class="_alignLeft">Cantidad:&nbsp;&nbsp;&nbsp;<b>{{cantidad}}</b></td></tr>
				<tr><td class="_alignLeft">Rotura:&nbsp;&nbsp;&nbsp;<b>{{rotura}}</b></td></tr>
				<tr><td class="_alignLeft">Porcentaje Rotura:&nbsp;&nbsp;&nbsp;<b>{{porcentajeRotura}}%</b></td></tr>
			</table>

			<input type="button" class=" _danger button"  @click="clickCerrarInforme($event)" value="Cerrar">

		</fieldset>
		

  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      informeParams: {
        ofab: 0,
        articulo: "",
        desde: "",
        hasta: "",
        maquina: "Todas",
        tipoPieza: "Todas"
      },

      showInforme: false,

			cantidad: 0,
			rotura: 0,
			porcentajeRotura: 0,
			registros: 0
    };
  },

  mounted() {
    this.informeParams.desde = this.getHoy.substring(0, 8) + "01";
    this.informeParams.hasta = this.getHoy;
  },

  computed: {
    ...mapGetters(["getProcessing", "getUrl", "getHoy"])
  },

  methods: {
    clickInformeFormacion(e) {
			e.preventDefault();
			
			//console.log('Data para procesar informe', this.informeParams);
			//return;

      this.$http
        .post(this.getUrl + "informe_formacion", this.informeParams)
        .then(respuesta => {
          //console.log("Respuesta del Server: ", respuesta.data)
          if (respuesta.data.registros > 0) {

						this.registros = respuesta.data.registros;
            this.cantidad = respuesta.data.cantidad;
            this.rotura = respuesta.data.rotura;
            this.porcentajeRotura = respuesta.data.porcentajeRotura.toFixed(2);

          } else {

						this.registros = 0;
            this.cantidad = 0;
            this.rotura = 0;
            this.porcentajeRotura = 0;
            
          }

          this.showInforme = true;
        })
        .catch(e => {
          console.log("Error:", e);
        });
    },

    clickCerrarInforme() {
      this.showInforme = false;
    },

    changeMaquina(e) {
      console.log("Detecto cambio maquina");
      this.informeParams.maquina = e.target.value;
    },
    changeTipoPieza(e) {
      console.log("Detecto cambio TipoPieza");
      this.informeParams.tipoPieza = e.target.value;
    }
  }
};
</script>

<style lang="css" scoped>
.row10 {
  max-height: 35px;
}

.mtop {
  margin-top: 9px;
}

input[type="text"] {
  padding: 0px 3px;
  line-height: 0px;
  width: 60px;
}
</style>