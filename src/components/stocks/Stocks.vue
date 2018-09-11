<template lang="html">
  <div class="contenedor _alignCenter w-950">

    <div class="modalbox-modal" align="center" :class="{ dBlock: showModal }">
      <div class="modalbox-modal-content w-950">
        <span class="-close" id="modalbox-close1" @click="closeModal">✖</span>

        <div class="row">

            <div class="col m2 _alignLeft">
              <label for="articulo">Artículo</label>
              <input class="_full-width" id="articulo" type="text" v-model="articulo.articulo" placeholder="Artículo" disabled>
            </div>

            <div class="col m1 _alignLeft">
              <label for="formacion">Form.</label>
              <input class="_full-width" id="formacion" type="text" v-model="articulo.stock_formacion">
            </div>

            <div class="col m1 _alignLeft">
              <label for="bizcocho">Biz.</label>
              <input class="_full-width" id="bizcocho" type="text" v-model="articulo.stock_bizcocho">
            </div>

            <div class="col m1 _alignLeft">
              <label for="blanco">H.Alta</label>
              <input class="_full-width" id="blanco" type="text" v-model="articulo.stock_horno_alta">
            </div>

             <div class="col m1 _alignLeft">
              <label for="blanco">1era</label>
              <input class="_full-width" id="blanco" type="text" v-model="articulo.stock_revisacion_1">
            </div>

            <div class="col m1 _alignLeft">
              <label for="blanco">2da</label>
              <input class="_full-width" id="blanco" type="text" v-model="articulo.stock_revisacion_2">
            </div>

            <div class="col m1 _alignLeft">
              <label for="blanco">5ta</label>
              <input class="_full-width" id="blanco" type="text" v-model="articulo.stock_revisacion_5">
            </div>      

            <div class="col m2 _alignLeft">
              &nbsp;
            </div>     


            <div class="col m1 _alignLeft">
              <label for="acciones">&nbsp;</label>
              <button class="_danger" @click="saveStock">Guardar</button>
            </div>

        </div>

      </div>
    </div>

    <h5>Stocks</h5>
    <br>

    <fieldset>

      <div class="row">

        <div class="col m4">
            <input class="_full-width" type="text" id="aSearch" name="articuloSearch" v-model="articuloSearch" maxlength="6" @keyup.enter="searchArticulo">
        </div>

        <div class="col m2">
          <a @click="getStock" >
              <i title="Buscar" class="fa fa-search fasearch hand" aria-hidden="true"></i>
          </a>
        </div>

        <div class="col m4">

        </div>

        <div class="col m2">
          <!-- <div class="col m2"  v-if="articulos.length != 0"> -->
          <!-- <a :href="reporte" target="_blank"> -->
          <a :href="reporteStock" target="_blank">
              <i title="Imprimir" class="fa fa-print faprint" aria-hidden="true"></i>
          </a>
          <!-- </a> -->
        </div>

      </div>
    </fieldset>

  <div v-if="showAlert">
    <br><br>

    <div class="alert _warning _shadow _box">
      <span class="-close" @click="closeAlert">×</span>
      <strong>Oops!! </strong> No se ha encontrado <strong>{{ articuloSearch}}</strong>.
    </div>

  </div>

    <div v-if="articulos.length == 0 && showAlert == false">
      <br><br>
      <p>Ingrese Modelo / Artículo para obtener datos.</p>
    </div>

    <div v-if="articulos.length != 0">
      <br>
      <fieldset>

        <table class="_width100">

          <thead>
            <tr>
              <th class="_alignCenter">Artículo</th>
              <th class="_alignCenter">Descripción</th>
              <th class="_alignRigth">Formación</th>
              <th class="_alignRigth">Bizcocho</th>
              <th class="_alignRigth">H. Alta</th>
              <th class="_alignRigth">1era</th>
              <th class="_alignRigth">2da</th>
              <th class="_alignRigth">5ta</th>
              <th class="_alignCenter" v-if="getLevel > 5">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(articulo,index) in articulos">
              <td class="_alignCenter">{{ articulo.articulo }}</td>
              <td class="_alignCenter">{{ articulo.descrip }}</td>
              <td class="_alignRigth">{{ articulo.stock_formacion }}</td>
              <td class="_alignRigth">{{ articulo.stock_bizcocho }}</td>
              <td class="_alignRigth">{{ articulo.stock_horno_alta }}</td>
              <td class="_alignRigth">{{ articulo.stock_revisacion_1 }}</td>
              <td class="_alignRigth">{{ articulo.stock_revisacion_2 }}</td>
              <td class="_alignRigth">{{ articulo.stock_revisacion_5 }}</td>
              <td class="_alignCenter" v-if="getLevel > 5"><button class="_xsmall _danger" @click="editaStock(index)">Editar</button></td>
            </tr>
          </tbody>
        </table>

      </fieldset>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      showAlert: false,
      showModal: false,
      articuloSearch: '',
      articulos: [],
      articulo: {
        id: 0,
        articulo: '',
        stock_formacion: 0,
        stock_bizcocho: 0,
        stock_horno_alta: 0,
        stock_revisacion_1: 0,
        stock_revisacion_2: 0,
        stock_revisacion_5: 0
      },
      index: 0
    }
  },

  computed: {
    ...mapGetters([
      'getProcessing',
      'getUrl',
      'getLevel'
    ]),

    reporteStock() {
      return 'http://produccion.dynalias.com/reportes/pdf/stocks'
    },
  },

  methods: {
    getStock() {
      if(this.articuloSearch.length == 0) {
        //console.log('articuloSearch vacio')
        return
      }

      this.$http.get(this.getUrl + 'stocks/' + this.articuloSearch)
        .then(respuesta => {
          this.articulos = respuesta.data
          if(this.articulos.length == 0 ) {
            this.showAlert = true
          }
          //console.log(respuesta.data)
        })
    },

    editaStock(index) {
      console.log('editar stock index:', index)
      this.articulo.id = this.articulos[index].id
      this.articulo.articulo = this.articulos[index].articulo
      this.articulo.stock_formacion = parseInt(this.articulos[index].stock_formacion) 
      this.articulo.stock_bizcocho = parseInt(this.articulos[index].stock_bizcocho) 
      this.articulo.stock_horno_alta = parseInt(this.articulos[index].stock_horno_alta) 
      this.articulo.stock_revisacion_1 = parseInt(this.articulos[index].stock_revisacion_1)
      this.articulo.stock_revisacion_2 = parseInt(this.articulos[index].stock_revisacion_2) 
      this.articulo.stock_revisacion_5 = parseInt(this.articulos[index].stock_revisacion_5)

      this.index = index

      this.showModal = true
      console.log(this.articulo)
    },

    searchArticulo(e) {
      if(this.articuloSearch.length == 0) {
        this.articulos = []
        return
      }
      let search;
      search = document.getElementById('aSearch')
      this.articuloSearch = search.value
      this.getStock()
    },

    closeAlert() {
      this.showAlert = false
    },

    closeModal() {
      this.showModal = false;
    },

    saveStock() {
      //console.log(this.articulo)

      this.$http.post(this.getUrl + 'stocks', this.articulo)
        .then(respuesta => {
          if (respuesta.data.status == 'ok') {

            this.showModal = false
            this.getStock()

          } else {

            console.log('Error', respuesta)

          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="css">

.w-950 {
  max-width: 950px;
}

.w-700 {
  max-width: 700px;
}

.w-400 {
  max-width: 400px;
}

.fasearch {
  font-size: 30px;
  color: #378D3B;
}
</style>
