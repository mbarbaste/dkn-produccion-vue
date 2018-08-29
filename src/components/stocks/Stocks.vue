<template lang="html">
  <div class="contenedor _alignCenter w-700">

    <div class="modalbox-modal" align="center" :class="{ dBlock: showModal }">
      <div class="modalbox-modal-content w-700">
        <span class="-close" id="modalbox-close1" @click="closeModal">✖</span>

        <div class="row">

            <div class="col m3 _alignLeft">
              <label for="articulo">Artículo</label>
              <input class="_full-width" id="articulo" type="text" v-model="articulo.articulo" placeholder="Artículo" disabled>
            </div>

            <div class="col m2 _alignLeft">
              <label for="formacion">St.Formación</label>
              <input class="_full-width" id="formacion" type="text" v-model="articulo.stock_formacion">
            </div>

            <div class="col m2 _alignLeft">
              <label for="bizcocho">St.Bizcocho</label>
              <input class="_full-width" id="bizcocho" type="text" v-model="articulo.stock_bizcocho">
            </div>

            <div class="col m2 _alignLeft">
              <label for="blanco">St.Blanco</label>
              <input class="_full-width" id="blanco" type="text" v-model="articulo.stock_blanco">
            </div>

            <div class="col m2 _alignLeft">
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
              <th class="_alignRigth">Blanco</th>
              <th class="_alignCenter" v-if="getLevel > 5">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(articulo,index) in articulos">
              <td class="_alignCenter">{{ articulo.articulo }}</td>
              <td class="_alignCenter">{{ articulo.descrip }}</td>
              <td class="_alignRigth">{{ articulo.stock_formacion }}</td>
              <td class="_alignRigth">{{ articulo.stock_bizcocho }}</td>
              <td class="_alignRigth">{{ articulo.stock_blanco }}</td>
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
        stock_blanco: 0
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
      this.articulo.stock_formacion = this.articulos[index].stock_formacion
      this.articulo.stock_bizcocho = this.articulos[index].stock_bizcocho
      this.articulo.stock_blanco = this.articulos[index].stock_blanco

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
      console.log(this.articulo)

      this.$http.post(this.getUrl + 'stocks', this.articulo)
        .then(respuesta => {
          if (respuesta.data.status == 'ok') {
            this.showModal = false
            this.articulos[this.index].stock_formacion = this.articulo.stock_formacion
            this.articulos[this.index].stock_bizcocho = this.articulo.stock_bizcocho
            this.articulos[this.index].stock_blanco = this.articulo.stock_blanco

          } else {
            console.log('Error')
          }
        })
    }
  }
}
</script>

<style lang="css">
.w-700 {
  max-width: 700px;
}

.w-400 {
  max-width: 400px;
}
</style>
