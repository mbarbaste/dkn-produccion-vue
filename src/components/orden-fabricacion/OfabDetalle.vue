<template lang="html">
  <div class="contenedor _alignCenter">
    <fieldset>
  <legend></legend>

  <!-- modal -->
  <div class="modalbox-modal" align="center" :class="{ dBlock: showModal }">
    <div class="modalbox-modal-content w-700">
      <span class="-close" @click="closeModal">✖</span>

      <div class="row">
        <p></p>
        <p><strong>{{ modalTitle }}</strong></p>
        <hr>
      </div>

      <div class="row" v-if="revData.proceso !== 'revisacion'">
        <p><strong>Fecha:</strong>  {{ revData.fecha | fecha }}</p>
        <p><strong>Cantidad:</strong>  {{ revData.cantidad }}</p>
        <p><strong>Rotura:</strong>  {{ revData.rotura }}</p>
      </div>

      <div class="row" v-if="revData.proceso === 'revisacion'">
        <p><strong>Fecha:</strong>  {{ revDataR.fecha | fecha }}</p>
        <p>
          <strong>1era:&nbsp;</strong>  {{ revDataR.primera }} &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>2da:&nbsp;</strong>  {{ revDataR.segunda }} &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>5ta:&nbsp;</strong>  {{ revDataR.quinta }} &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>Descarte:&nbsp;</strong>  {{ revDataR.dte }} &nbsp;&nbsp;&nbsp;&nbsp;
          </p>
      </div>


      <hr>
      <div class="row" v-if="revData.proceso == 'formacion'">
        <button class="_danger" @click="revFormacion(revData)">Confirmar Reversión Formación</button>
      </div>
      <div class="row" v-if="revData.proceso == 'bizcocho'">
        <button class="_danger" @click="revBizcocho(revData)">Confirmar Reversión Bizcocho</button>
      </div>
      <div class="row" v-if="revData.proceso == 'hornoAlta'">
        <button class="_danger" @click="revHornoAlta(revData)">Confirmar Reversión Horno de Alta</button>
      </div>
      <div class="row" v-if="revData.proceso == 'revisacion'">
        <button class="_danger" @click="revRevisacion(revDataR)">Confirmar Reversión Revisación</button>
      </div>

    </div>
  </div>

  <!-- Modal fin -->
  <h5>Detalle Orden de Fabricación <strong>{{ id }}</strong></h5>
  <hr>
  <br>
  <table class="_width100">
    <thead>
      <tr>
        <th class="_alignCenter">Artículo</th>
        <th class="_alignCenter">Cantidad</th>
        <th class="_alignCenter">Máquina</th>
        <th class="_alignCenter">Inicio</th>
        <th class="_alignCenter">Formación</th>
        <th class="_alignCenter">Bizcocho</th>
        <th class="_alignCenter">H.Alta</th>
        <th class="_alignCenter">Revisación</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="_alignCenter">{{ofab.articulo}}</td>
        <td class="_alignCenter">{{ofab.cantidad}}</td>
        <td class="_alignCenter">{{ofab.maquina}}</td>
        <td class="_alignCenter">{{ofab.fecha_inicio | fecha}}</td>
        <td class="_alignCenter">{{ofab.formacion}}</td>
        <td class="_alignCenter">{{ofab.bizcocho}}</td>
        <td class="_alignCenter">{{ofab.horno_alta}}</td>
        <td class="_alignCenter">{{ofab.revisacion}}</td>
      </tr>
    </tbody>
  </table>


  <br>

  </fieldset>

  <br><br>
  <fieldset>
  <legend class="text-formacion _alignLeft">Detalle Formación</legend>
  <br>
  <p  v-if="formacionList.length == 0"><strong>No</strong> hay nada registrado.</p>
  <table  class="_width100">
    <thead>
      <tr>
        <th class="_alignCenter">Fecha</th>
        <th class="_alignCenter">Cantidad</th>
        <th class="_alignCenter">Rotura</th>
        <th class="_alignCenter">&nbsp;</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in formacionList" :key="index">
          <td class="_alignCenter">{{ item.fecha | fecha }}</td>
          <td class="_alignCenter">{{ item.cantidad }}</td>
          <td class="_alignCenter">{{ item.rotura }}</td>
          <td class="_alignRight">
            <a v-if="getLevel > 5" @click="revertirFormacion(item.id, index)" title="Revertir" class="mano">
              <i class="fa fa-exchange" aria-hidden="true"></i>
          </a></td>
        </tr>
        <tr>
          <td class="_alignCenter"><b>Totales</b></td>
          <td class="_alignCenter"><b>{{ getFormacionCantidad }}</b></td>
          <td class="_alignCenter"><b>{{ getFormacionRotura }}</b></td>
          <td class="_alignCenter">&nbsp;</td>
        </tr>
      </tbody>
  </table>
</fieldset>

    <br><br>
    <fieldset>
    <legend class="text-bizcocho _alignLeft">Detalle Bizcocho</legend>
    <br>
    <p  v-if="bizcochoList.length == 0"><strong>No</strong> hay nada registrado.</p>
    <table  class="_width100" v-if="bizcochoList.length > 0">
      <thead>
        <tr>
          <th class="_alignCenter">Fecha</th>
          <th class="_alignCenter">Cantidad</th>
          <th class="_alignCenter">Rotura</th>
          <th class="_alignCenter">&nbsp;</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in bizcochoList" :key="index">
            <td class="_alignCenter">{{ item.fecha | fecha }}</td>
            <td class="_alignCenter">{{ item.cantidad }}</td>
            <td class="_alignCenter">{{ item.rotura }}</td>
            <td class="_alignRight">
              <a v-if="getLevel > 5" @click="revertirBizcocho(item.id, index)" title="Revertir" class="mano">
                <i class="fa fa-exchange" aria-hidden="true"></i>
            </a></td>
          </tr>
        <tr>
          <td class="_alignCenter"><b>Totales</b></td>
          <td class="_alignCenter"><b>{{ getBizcochoCantidad }}</b></td>
          <td class="_alignCenter"><b>{{ getBizcochoRotura }}</b></td>
          <td class="_alignCenter">&nbsp;</td>
        </tr>
        </tbody>
    </table>
  </fieldset>

  <br><br>
  <fieldset>
    <!-- <h6>Detalle Carga Horno Alta</h6> -->
    <legend  class="text-alta _alignLeft">Detalle Carga Horno Alta</legend>
    <br>
    <p  v-if="hornoAltaList.length == 0"><strong>No</strong> hay nada registrado.</p>
    <table  class="_width100" v-if="hornoAltaList.length > 0">
      <thead>
        <tr>
          <th class="_alignCenter">Fecha</th>
          <th class="_alignCenter">Horno</th>
          <th class="_alignCenter">Cantidad</th>
          <th class="_alignCenter">Rotura</th>
          <th class="_alignCenter">&nbsp;</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in hornoAltaList" :key="index">
            <td class="_alignCenter">{{ item.fecha | fecha }}</td>
            <td class="_alignCenter">{{ item.horno }}</td>
            <td class="_alignCenter">{{ item.cantidad }}</td>
            <td class="_alignCenter">{{ item.rotura }}</td>
            <td class="_alignRight">
              <a v-if="getLevel > 5" @click="revertirHornoAlta(item.id, index)" title="Revertir" class="mano">
                <i class="fa fa-exchange" aria-hidden="true"></i>
            </a></td>
          </tr>
          <tr>
            <td class="_alignCenter"><b>Totales</b></td>
            <td class="_alignCenter">&nbsp;</td>
            <td class="_alignCenter"><b>{{ getHornoAltaCantidad }}</b></td>
            <td class="_alignCenter"><b>{{ getHornoAltaRotura }}</b></td>
            <td class="_alignCenter">&nbsp;</td>
          </tr>
        </tbody>
    </table>
  </fieldset>
  <br><br>


  <br><br>
  <fieldset>
    <!-- <h6>Detalle Revisacion</h6> -->
    <legend  class="text-revisacion _alignLeft">Detalle Revisación</legend>
    <br>
    <p  v-if="revisacionList.length == 0"><strong>No</strong> hay nada registrado.</p>
    <table  class="_width100" v-if="revisacionList.length > 0">
      <thead>
        <tr>
          <th class="_alignCenter">Fecha</th>
          <th class="_alignCenter">1era</th>
          <th class="_alignCenter">2da</th>
          <th class="_alignCenter">5ta</th>
          <th class="_alignCenter">Descarte</th>
          <th class="_alignCenter">&nbsp;</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in revisacionList" :key="index">
            <td class="_alignCenter">{{ item.fecha | fecha }}</td>
            <td class="_alignCenter">{{ item.primera }}</td>
            <td class="_alignCenter">{{ item.segunda }}</td>
            <td class="_alignCenter">{{ item.quinta }}</td>
            <td class="_alignCenter">{{ item.dte }}</td>
            <td class="_alignRight">

            <a v-if="getLevel > 5" @click="revertirRevisacion(item.id, index)" title="Revertir" class="mano">
                <i class="fa fa-exchange" aria-hidden="true"></i>
              </a> 

            </td>
          </tr>

          <tr>
            <td class="_alignCenter"><b>Totales</b></td>
            <td class="_alignCenter"><b>{{ getRev1 }}</b></td>
            <td class="_alignCenter"><b>{{ getRev2 }}</b></td>
            <td class="_alignCenter"><b>{{ getRev5 }}</b></td>
            <td class="_alignCenter"><b>{{ getRevD }}</b></td>
            <td class="_alignCenter">&nbsp;</td>
          </tr>

        </tbody>
    </table>
  </fieldset>
  <br><br>


  <fieldset v-if="ofab.observaciones.length !== 0">
    <legend class="_alignLeft">Observaciones</legend>
    <p class="_alignLeft">{{ofab.observaciones}}</p>
  </fieldset>

  <br><br>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      id: this.$route.params.id,
      showModal: false,
      formacionCantidad: 0,
      formacionRotura: 0,

      ofab: {
        articulo: '',
        cantidad: 0,
        maquina: '',
        fecha_inicio: '',
        formacion: 0,
        bizcocho: 0,
        blanco: 0,
        revisacion: 0,
        fecha_fin: '',
        observaciones: '',
        grupo: ''
      },

      revData: {
        articulo: '',
        ordenId:  this.$route.params.id,
        parteId: 0,
        fecha: '',
        cantidad: 0,
        rotura: 0,
        proceso: ''
      },

      revDataR: {
        articulo: '',
        ordenId:  this.$route.params.id,
        parteId: 0,
        fecha: '',
        primera: 0,
        segunda: 0,
        quinta: 0,
        dte: 0,
        proceso: ''
      },

      bizcochoList: [],
      hornoAltaList: [],
      formacionList: [],
      revisacionList: [],
      modalTitle: '',
      modalId: 0
    }
  },

  computed: {
    ...mapGetters([
      'getProcessing',
      'getUrl',
      'getHoy',
      'getLevel',
      'getFormacionCantidad',
      'getFormacionRotura',
      'getBizcochoCantidad',
      'getBizcochoRotura',
      'getHornoAltaCantidad',
      'getHornoAltaRotura',
      'getRev1',
      'getRev2',
      'getRev5',
      'getRevD'
    ])
  },

  watch: {
    '$route' (to, from) {
      this.id = to.params.id
    }
  },

  methods: {
    ...mapMutations([
      'setProcessing',
      'setFormacionCantidad',
      'setFormacionRotura',
      'setBizcochoCantidad',
      'setBizcochoRotura',
      'setHornoAltaCantidad',
      'setHornoAltaRotura',
      'setRev1',
      'setRev2',
      'setRev5',
      'setRevD'
    ]),

    closeModal() {
      this.showModal = false
    },

    revertirFormacion(id, i) {
        // console.log("Revertir Parte Formacion: ", id);
        this.revData.fecha = this.formacionList[i].fecha;
        this.revData.cantidad = this.formacionList[i].cantidad;
        this.revData.rotura = this.formacionList[i].rotura;
        this.revData.parteId = id;
        this.revData.proceso = 'formacion';
        this.revData.articulo = this.ofab.articulo;

        this.modalTitle = "Revertir Parte de Formación " + id + '    ( Orden ' + this.revData.ordenId + ' )';
        this.modalId = id;
        this.showModal = true;
    },

    revertirBizcocho(id, i) {
        // console.log("Revertir Parte Bizcocho: ", id);
        this.revData.fecha = this.bizcochoList[i].fecha;
        this.revData.cantidad = this.bizcochoList[i].cantidad;
        this.revData.rotura = this.bizcochoList[i].rotura;
        this.revData.parteId = id;
        this.revData.proceso = 'bizcocho';
        this.revData.articulo = this.ofab.articulo;

        this.modalTitle = "Revertir Parte de Bizcocho " + id;
        this.modalId = id;
        this.showModal = true;
    },

    revertirHornoAlta(id, i) {
        // console.log("Revertir Parte Horno de Alta: ", id);
        this.revData.fecha = this.hornoAltaList[i].fecha;
        this.revData.cantidad = this.hornoAltaList[i].cantidad;
        this.revData.rotura = this.hornoAltaList[i].rotura;
        this.revData.parteId = id;
        this.revData.proceso = 'hornoAlta';
        this.revData.articulo = this.ofab.articulo;

        this.modalTitle = "Revertir Parte de Horno de Alta " + id;
        this.modalId = id;
        this.showModal = true;
    },

    revertirRevisacion(id, i) {
      this.revDataR.fecha = this.revisacionList[i].fecha;
      this.revDataR.primera = this.revisacionList[i].primera;
      this.revDataR.segunda = this.revisacionList[i].segunda;
      this.revDataR.quinta = this.revisacionList[i].quinta;
      this.revDataR.dte = this.revisacionList[i].dte;

      this.revDataR.parteId = id;
      this.revData.proceso = 'revisacion';
      this.revDataR.proceso = 'revisacion';
      this.revDataR.articulo = this.ofab.articulo;

      this.modalTitle = "Revertir Parte de Revisación " + id;
      this.modalId = id;

      this.showModal = true;

    },

    revFormacion(data) {
      // Llamada a la API
      this.$http.post(this.getUrl + 'revertir_formacion', this.revData)
        .then(respuesta => {
          if (respuesta.data.status == 'ok') {
              console.log('Datos desde API', respuesta.data.data);
            //this.$router.push('/ofab-detalle/0')
            // this.$router.push( {name: 'ofab-detalle', params: { id: data.ordenId } } );
            this.getOrdenFabricacion(this.id);
            this.getCargaFormacion(this.id)

          } else {
            console.log('Error')
          }
        })
      this.showModal = false;
    },

    revBizcocho(data) {
      // Llamada a la API
      this.$http.post(this.getUrl + 'revertir_bizcocho', this.revData)
        .then(respuesta => {
          if (respuesta.data.status == 'ok') {
              console.log('Datos desde API', respuesta.data.data);
            //this.$router.push('/ofab-detalle/0')
            // this.$router.push( {name: 'ofab-detalle', params: { id: data.ordenId } } );
            this.getOrdenFabricacion(this.id);
            this.getCargaBizcocho(this.id)

          } else {
            console.log('Error')
          }
        })
      this.showModal = false;
    },

    revHornoAlta(data) {
      // Llamada a la API
      this.$http.post(this.getUrl + 'revertir_horno_alta', this.revData)
        .then(respuesta => {
          if (respuesta.data.status == 'ok') {
              console.log('Datos desde API', respuesta.data.data);
            //this.$router.push('/ofab-detalle/0')
            // this.$router.push( {name: 'ofab-detalle', params: { id: data.ordenId } } );
            this.getOrdenFabricacion(this.id);
            this.getCargaHornoAlta(this.id)

          } else {
            console.log('Error')
          }
        })
      this.showModal = false;
    },

    revRevisacion(data) {
      console.log('Se ha iniciado reversion de revisacion', this.revDataR);
      // Llamada a la API
      this.$http.post(this.getUrl + 'revertir_revisacion', this.revDataR)
        .then(respuesta => {
          if (respuesta.data.status == 'ok') {           
              console.log('Datos desde API', respuesta.data);
            //this.$router.push('/ofab-detalle/0')
            // this.$router.push( {name: 'ofab-detalle', params: { id: data.ordenId } } );
            this.getOrdenFabricacion(this.id);
            this.getCargaRevisacion(this.id)

          } else {
            console.log('Error Intentando enviar data: ', this.revDataR)
          }
        })
      this.showModal = false;
    },

    getOrdenFabricacion(id) {
      this.$http.get(this.getUrl + 'ofab/' + id)
        .then(respuesta => {
          if (respuesta.data.length > 0) {

            this.ofab = respuesta.data[0];
            

          } else {
            //console.log('No hay artículo o se ejecuto history.back')
          }
        })
      
    },

    getCargaBizcocho(oid) {
      this.$http.get(this.getUrl + 'carga_bizcocho/' + oid)
        .then(respuesta => {
          if (respuesta.data.length > 0) {

            // console.log(respuesta.data)
            this.bizcochoList = respuesta.data

            let cantidad = 0
            let rotura = 0

            this.bizcochoList.forEach(function(obj) {
                
                cantidad += (parseInt(obj.cantidad));
                rotura += (parseInt(obj.rotura));
            });

            this.setBizcochoCantidad(cantidad)
            this.setBizcochoRotura(rotura)

          } else {
            //console.log('No se encontró bizcocho')
            this.bizcochoList = []
          }
        })
    },

    getCargaHornoAlta(oid) {
      this.$http.get(this.getUrl + 'carga_horno_alta/' + oid)
        .then(respuesta => {
          if (respuesta.data.length > 0) {

            //console.log(respuesta.data)
            this.hornoAltaList = respuesta.data

            let cantidad = 0
            let rotura = 0

            this.hornoAltaList.forEach(function(obj) {
                
                cantidad += (parseInt(obj.cantidad));
                rotura += (parseInt(obj.rotura));
            });

            this.setHornoAltaCantidad(cantidad)
            this.setHornoAltaRotura(rotura)

          } else {
            //console.log('No se encontró blanco')
            this.hornoAltaList = []
          }
        })
    },

    getCargaFormacion(oid) {
      this.$http.get(this.getUrl + 'carga_formacion/' + oid)
        .then(respuesta => {
          if (respuesta.data.length > 0) {

            this.formacionList = respuesta.data            

            let cantidad = 0
            let rotura = 0

            this.formacionList.forEach(function(obj) {
                
                cantidad += (parseInt(obj.cantidad));
                rotura += (parseInt(obj.rotura));
            });

            this.setFormacionCantidad(cantidad)
            this.setFormacionRotura(rotura)

          } else {
            //console.log('No se encontró formacion')
            this.formacionList = [];
          }
        })
    },

    getCargaRevisacion(oid) {
      this.$http.get(this.getUrl + 'revisacion/' + oid)
        .then(respuesta => {
          if (respuesta.data.length > 0) {

            //console.log(respuesta.data)
            this.revisacionList = respuesta.data

            let primera = 0
            let segunda = 0
            let quinta = 0
            let dte = 0

            this.revisacionList.forEach(function(obj) {
                
                primera += (parseInt(obj.primera));
                segunda += (parseInt(obj.segunda));
                quinta += (parseInt(obj.quinta));
                dte += (parseInt(obj.dte));
            });

            this.setRev1(primera)
            this.setRev2(segunda)
            this.setRev5(quinta)
            this.setRevD(dte)

          } else {
            //console.log('No se encontró formacion')
            this.revisacionList = [];
          }
        })
    }
  },

  created() {
    this.setProcessing(true)
    this.getOrdenFabricacion(this.id)
    this.getCargaFormacion(this.id)
    this.getCargaBizcocho(this.id)
    this.getCargaHornoAlta(this.id)
    this.getCargaRevisacion(this.id)
    this.setProcessing(false)
  },
  
  updated() {
    //this.getOrdenFabricacion(this.id)
  }
}
</script>

<style lang="css">
.text-formacion {
  color: #2F3E9E;
}

.text-bizcocho {
  color: brown;
}

.text-alta {
  color: #378D3B;
}

.text-revisacion {
  color: #144054;
}
</style>
