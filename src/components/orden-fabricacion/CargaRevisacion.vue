<template lang="html">
  <div class="contenedor _alignCenter w-700">
    <h5>Carga Revisación</h5>
    <br>

    <div v-if="partesRev > 0" >
      Ya se han registrado <span class="count _danger">{{ partesRev }}</span>&nbsp; Partes de Revisación.
      <p>&nbsp;</p>
    </div>

    <fieldset v-if="!showParte">
      <div class="row">

        <div class="col m4">
          &nbsp;
        </div>

        <div class="col m2">
            <input class="_full-width" type="number" id="aSearch" name="ofabSearch" v-model="ofabSearch" maxlength="6" @focus="closeAlert" @keyup.enter="buscaOfab">
        </div>

        <div class="col m1">
            &nbsp;
        </div>

        <div class="col m3">
          <a @click="buscaOfab" >
              <i title="Buscar" class="fa fa-search fasearch hand" aria-hidden="true"></i>
          </a>
        </div>


        <div class="col m2"  v-if="ofabSearch.length != 0">
          <!-- <a :href="reporte" target="_blank"> -->
              <i title="Imprimir" class="fa fa-print faprint" aria-hidden="true"></i>
          <!-- </a> -->
        </div>

      </div>
    </fieldset>

    <fieldset v-if="showParte">

      <div class="row">

        <div class="col m3">
          <h6>Orden Fabricación</h6>
          <h4> {{ ofab.id }}</h4>
        </div>

        <div class="col m3">
          <h6>Artículo</h6>
          <h4> {{ ofab.articulo }}</h4>
        </div>
        
        <div class="col m1">
            &nbsp;
        </div>

        <div class="col m3">
          <h6>Fecha Revisación</h6>
          <input class="_full-width" v-model="revisacion.fecha" type="date" required>
        </div>

        <div class="col m1">
            &nbsp;
        </div>

        <div class="col m1">
            <i @click="resetCarga" title="Cerrar" class="fa fa-close fared" aria-hidden="true"></i>
        </div>

      </div>

      <hr>

      <div class="row">

        <div class="col m1">
          <h6>1<sup>ra</sup></h6>
        </div>

        <div class="col m2">
          <input class="_full-width" type="number" id="primera" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('primera','segunda', $event)" v-model="revisacion.primera" autocomplete="off">
        </div>

        <div class="col m1">
          <h6>2<sup>da</sup></h6>
        </div>

        <div class="col m2">
          <input class="_full-width" type="number" id="segunda" v-on:focus="selectFocus($event)"  v-on:keyup="sendTab('primera','quinta', $event)" v-model="revisacion.segunda" autocomplete="off">
        </div>

        <div class="col m1">
          <h6>5<sup>ta</sup></h6>
        </div>

        <div class="col m2">
          <input class="_full-width" type="number" id="quinta" v-on:focus="selectFocus($event)"  v-on:keyup="sendTab('segunda','descarte', $event)" v-model="revisacion.quinta" autocomplete="off">
        </div>

        <div class="col m1">
          <h6>DTE</sup></h6>
        </div>
        
        <div class="col m2">
          <input class="_full-width" type="number" id="descarte" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('quinta','d01', $event)" v-model="revisacion.descarte" autocomplete="off">
        </div>

      </div>

      <hr>

      <form>

      <div class="row">
      	<div class="col m2 row10 _alignRight">1</div>
      	<div class="col m4 row10 _alignLeft"><span class="vertical">DEFORMACION</span></div>
      	<div class="col m3 row10"><input type="text" id="d01" name="d01" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d01','d02', $event)" v-model="revisacion.d01" autocomplete="off"></div>
      	<div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
      	<div class="col m2 row10 _alignRight">2</div>
      	<div class="col m4 row10 _alignLeft">PUNTO MARRON</div>
      	<div class="col m3 row10"><input type="text" id="d02" name="d02" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d01', 'd03', $event)" v-model="revisacion.d02" autocomplete="off"></div>
      	<div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">3</div>
        <div class="col m4 row10 _alignLeft">PIN HOLE</div>
        <div class="col m3 row10"><input type="text" id="d03" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d02', 'd04', $event)" name="d03" v-model="revisacion.d03" autocomplete="off"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">4</div>
        <div class="col m4 row10 _alignLeft">RAJADO</div>
        <div class="col m3 row10"><input type="text" id="d04" name="d04" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d03', 'd05', $event)" v-model="revisacion.d04" autocomplete="off"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">5</div>
        <div class="col m4 row10 _alignLeft">CACHADO</div>
        <div class="col m3 row10"><input type="text" id="d05" name="d05" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d04', 'd06', $event)" v-model="revisacion.d05" autocomplete="off"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">6</div>
        <div class="col m4 row10 _alignLeft">DESPAREJO PASTA</div>
        <div class="col m3 row10"><input type="text" id="d06" name="d06" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d05', 'd07', $event)" v-model="revisacion.d06" autocomplete="off"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">7</div>
        <div class="col m4 row10 _alignLeft">YESO</div>
        <div class="col m3 row10"><input type="text" id="d07" name="d07" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d06', 'd08', $event)" v-model="revisacion.d07"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">8</div>
        <div class="col m4 row10 _alignLeft">DESPEGADO</div>
        <div class="col m3 row10"><input type="text" id="d08" name="d08" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d07', 'd09', $event)" v-model="revisacion.d08"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">9</div>
        <div class="col m4 row10 _alignLeft">BURBUJA GRANDE</div>
        <div class="col m3 row10"><input type="text" id="d09" name="d09" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d08', 'd10', $event)" v-model="revisacion.d09"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">10</div>
        <div class="col m4 row10 _alignLeft">DESPAREJO ESMALTE</div>
        <div class="col m3 row10"><input type="text" id="d10" name="d10" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d09', 'd11', $event)" v-model="revisacion.d10"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">11</div>
        <div class="col m4 row10 _alignLeft">RASPADO ESMALTE</div>
        <div class="col m3 row10"><input type="text" id="d11" name="d11" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d10', 'd12', $event)" v-model="revisacion.d11"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">12</div>
        <div class="col m4 row10 _alignLeft">SALTEADO ESMALTE</div>
        <div class="col m3 row10"><input type="text" id="d12" name="d12" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d11', 'd13', $event)" v-model="revisacion.d12"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">13</div>
        <div class="col m4 row10 _alignLeft">CACHADO ESMALTE</div>
        <div class="col m3 row10"><input type="text" id="d13" name="d13" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d12', 'd14', $event)" v-model="revisacion.d13"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">14</div>
        <div class="col m4 row10 _alignLeft">SALTADO ESMALTE MANIJA</div>
        <div class="col m3 row10"><input type="text" id="d14" name="d14" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d13', 'd15', $event)" v-model="revisacion.d14"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">15</div>
        <div class="col m4 row10 _alignLeft">PASTA</div>
        <div class="col m3 row10"><input type="text" id="d15" name="d15" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d14', 'd16', $event)" v-model="revisacion.d15"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">16</div>
        <div class="col m4 row10 _alignLeft">TOCHI TORCIDO</div>
        <div class="col m3 row10"><input type="text" id="d16" name="d16" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d15', 'd17', $event)" v-model="revisacion.d16"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">17</div>
        <div class="col m4 row10 _alignLeft">CABETA PEGADO</div>
        <div class="col m3 row10"><input type="text" id="d17" name="d17" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d16', 'd18', $event)" v-model="revisacion.d17"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">18</div>
        <div class="col m4 row10 _alignLeft">BORO</div>
        <div class="col m3 row10"><input type="text" id="d18" name="d18" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d17', 'd19', $event)" v-model="revisacion.d18"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">19</div>
        <div class="col m4 row10 _alignLeft">PEGADO</div>
        <div class="col m3 row10"><input type="text" id="d19" name="d19" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d18', 'd20', $event)" v-model="revisacion.d19"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">20</div>
        <div class="col m4 row10 _alignLeft">TOCHI PEGADO</div>
        <div class="col m3 row10"><input type="text" id="d20" name="d20" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d19', 'd21', $event)" v-model="revisacion.d20"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">21</div>
        <div class="col m4 row10 _alignLeft">AHUMADO</div>
        <div class="col m3 row10"><input type="text" id="d21" name="d21" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d20', 'd22', $event)" v-model="revisacion.d21"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">22</div>
        <div class="col m4 row10 _alignLeft">MANCHADO</div>
        <div class="col m3 row10"><input type="text" id="d22" name="d22" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d21', 'd23', $event)" v-model="revisacion.d22"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">23</div>
        <div class="col m4 row10 _alignLeft">CASCARA NARANJA</div>
        <div class="col m3 row10"><input type="text" id="d23" name="d23" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d22', 'd24', $event)" v-model="revisacion.d23"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <div class="row">
        <div class="col m2 row10 _alignRight">24</div>
        <div class="col m4 row10 _alignLeft">CRUDO</div>
        <div class="col m3 row10"><input type="text" id="d24" name="d24" v-on:focus="selectFocus($event)" v-on:keyup="sendTab('d23', 'd24', $event)" v-model="revisacion.d24"></div>
        <div class="col m3 row10">&nbsp;</div>
      </div>

      <hr>
      <div class="row">
        <input type="button" class=" _danger button"  @click="sendRevisacion($event)" value="Guardar">
      </div>

    </form>

    </fieldset>

    <div v-if="showAlert">
      <br><br>
      <div class="alert _warning _shadow _box">
        <span class="-close" @click="closeAlert">×</span>
        <strong>Oops!! </strong> No se ha encontrado la orden <strong>{{ ofabSearch }}</strong>.
      </div>
    </div>

    <div v-if="!showParte">
      <br><br>
      <p>Ingrese Número de Orden de Fabricación</p>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      ofabSearch: 0,
      showAlert: false,
      showParte: false,
      primera: 0,
      segunda: 0,
      quinta:0,
      descarte:0,
      ofab: {
        id: 0,
        articulo: '',
        cantidad: 0,
        maquina: '',
        fecha_inicio: '',
        formacion: 0,
        bizcocho: 0,
        blanco: 0,
        fecha_fin: '',
        observaciones: ''
      },
      revisacion: {
        ofab_id: 0,
        fecha: '',
        articulo: '',
        primera: 0,
        segunda: 0,
        quinta: 0,
        descarte: 0,
        d01: 0,
        d02: 0,
        d03: 0,
        d04: 0,
        d05: 0,
        d06: 0,
        d07: 0,
        d08: 0,
        d09: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0,
        d15: 0,
        d16: 0,
        d17: 0,
        d18: 0,
        d19: 0,
        d20: 0,
        d21: 0,
        d22: 0,
        d23: 0,
        d24: 0
      },
      partesRev: 0
    }
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
      'setProcessing'
    ]),

    clearAlert() {
      this.showAlert = false
    },

    sendRevisacion(e) {

      console.log('Sending POST request')

      e.preventDefault();
    
      // Chequeo que 1era o 2da o 5ta o descarte son > 0

      if(this.revisacion.primera == 0 
          && this.revisacion.segunda == 0 
          && this.revisacion.quinta == 0 
          && this.revisacion.descarte == 0) {

            console.log('Hay ceros')
            return;
      }

      
      this.revisacion.ofab_id = this.ofab.id;
      this.revisacion.articulo = this.ofab.articulo

      this.setProcessing(true)

      this.$http.post(this.getUrl + 'carga_revisacion', this.revisacion)
          .then( respuesta => {
            console.log(respuesta.data)
            this.resetForm()
            this.showParte = false
            this.$router.push('/carga-revisacion')
          })
          .catch(e => {
            console.log(e)
          })

        this.setProcessing(false)
    },

    buscaRevisacion() {
      console.log('Busca si existen Revisacion en ofab:' + this.ofabSearch);
      this.$http.get(this.getUrl + 'revisacion/' + this.ofabSearch)
        .then( respuesta => {
          this.partesRev = respuesta.data.length
          console.log(respuesta.data)
          if(respuesta.data.length > 0) {
            console.log('Ya hay ' + respuesta.data.length + ' registros cargados.')
          } else {
            console.log('Todavía NO hay registros cargados.')
          }
        })
        .catch ( e => {
          console.log(e)
        })

    },

    buscaOfab() {
      // console.log('Buscar Ofab', this.ofabSearch);
      this.setProcessing(true)

      this.buscaRevisacion()

      
      this.$http.get(this.getUrl + 'ofab/' + this.ofabSearch)
        .then(respuesta => {
          if (respuesta.data.length > 0) {

            this.resetForm()
            this.ofab = respuesta.data[0]

            this.showParte = true;
            this.showAlert = false;
            this.revisacion.fecha = this.getHoy;
            console.log(this.ofab)

          } else {
            this.showAlert = true
            this.showParte = false
          }
        })
      this.setProcessing(false)

    },
    closeAlert() {
      this.showAlert = false
    },
    resetCarga() {
      this.showParte = false
    },
    resetForm() {
      this.revisacion.ofab_id = 0;
      this.revisacion.fecha =  '';
      this.revisacion.articulo = '';
      this.revisacion.primera = 0;
      this.revisacion.segunda = 0;
      this.revisacion.quinta = 0;
      this.revisacion.descarte = 0;
      this.revisacion.d01 = 0;
      this.revisacion.d02 = 0;
      this.revisacion.d03 = 0;
      this.revisacion.d04 = 0;
      this.revisacion.d05 = 0;
      this.revisacion.d06 = 0;
      this.revisacion.d07 = 0;
      this.revisacion.d08 = 0;
      this.revisacion.d09 = 0;
      this.revisacion.d10 = 0;
      this.revisacion.d11 = 0;
      this.revisacion.d12 = 0;
      this.revisacion.d13 = 0;
      this.revisacion.d14 = 0;
      this.revisacion.d15 = 0;
      this.revisacion.d16 = 0;
      this.revisacion.d17 = 0;
      this.revisacion.d18 = 0;
      this.revisacion.d19 = 0;
      this.revisacion.d20 = 0;
      this.revisacion.d21 = 0;
      this.revisacion.d22 = 0;
      this.revisacion.d23 = 0;
      this.revisacion.d24 = 0;

    },

    sendTab(prev, next, e) {
      e.preventDefault();
      
      console.log("Tecla: ", e.which);
      if(e.which < 48 || e.which > 57) {
        //console.log("no es número", e)
        //console.log("target: ", e.target.id);
        let x = e.target.id;
        //console.log("Exis: ",x);
        let campo = document.getElementById(x);
        campo.focus();

        


        if(campo.value == "0") {
          //document.getElementById(x).select();
        }
      }
      
      if (e.which == 13) {
        // || e.which == 40
        document.getElementById(next).focus();
        //document.getElementById(next).select();
      }

      /*
      if (e.which == 38) {
        document.getElementById(prev).focus();
        document.getElementById(prev).select();
      }
      */

    },
    selectFocus(e) {
      //console.log(e.target.id);
      document.getElementById(e.target.id).select();
    }
  },
  computed: {
    ...mapGetters([
      'getProcessing',
      'getUrl',
      'getHoy'
    ])
  }
}
</script>

<style lang="css">

.row10 {
  max-height: 35px;
}

.w-700 {
  max-width: 700px;
}

.vertical {
  vertical-align: center;
  padding-right: 10px;
  width: 400px;
}

.myalert {
  background-color: #2C3E50;
  color: beige;
}


input[type="text"]{ padding: 0px 3px; line-height:0px; width: 60px;}
</style>
