   <fieldset>

		<div class="row">
      <div class="col m4 row10 _alignRight mtop">Orden Fabricación :</div>
      <div class="col m1 row10">
        <input type="text"  autocomplete="off" v-model="informeFormacionParams.ofab">
      </div>
      <div class="col m7 row10">&nbsp;</div>
    </div>

		<div class="row">
      <div class="col m4 row10 _alignRight mtop">Artículo :</div>
      <div class="col m1 row10">
        <input type="text"  autocomplete="off" v-model="informeFormacionParams.articulo">
      </div>
      <div class="col m7 row10">&nbsp;</div>
    </div>

		<div class="row">
      	    <div class="col m4 row10 _alignRight mtop">Desde / Hasta :</div>
      	    <div class="col m3 row10">
				<input class="_full-width" type="date" v-model="informeFormacionParams.desde" required>
			</div>
			<div class="col m3 row10">
				<input class="_full-width" type="date" v-model="informeFormacionParams.hasta" required>
			</div>
			<div class="col m2 row10">&nbsp;</div>
        </div>

		<div class="row">
			<div class="col m4 row10 _alignRight mtop">Máquina :</div>
			<div class="col m3 row10">
				<select class="_width100" id="maquina"  v-model="ofab.maquina">
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

    <div class="col m5 row10">&nbsp;</div>
     
			<div class="row">
      	<div class="col m4 row10 _alignRight mtop">Defecto :</div>
      	<div class="col m3 row10">
					<select class="_width100" id="defecto" @change="changeDefecto($event)">
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

						<option value="d11">11- RASPADO ESMALTE</option>
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
					<input type="button" class=" _danger button"  @click="clickInformeRevisacion($event)" value="Procesar">
				</div>	

    </fieldset>


    <fieldset v-if="showInforme">
			<h5>Resultados</h5>
			<table align=center>
        <tr><td class="_alignLeft">Cantidad Total: <b>{{cantidadTotal}}</b></td></tr>
				<tr><td class="_alignLeft">Primera:&nbsp;&nbsp;&nbsp;<b>{{primera}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{porcentajePrimera}}%)</td></tr>
				<tr><td class="_alignLeft">Segunda:&nbsp;&nbsp;&nbsp;<b>{{segunda}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{porcentajeSegunda}}%)</td></tr>
				<tr><td class="_alignLeft">Quinta:&nbsp;&nbsp;&nbsp;<b>{{quinta}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{porcentajeQuinta}}%)</td></tr>
				<tr><td class="_alignLeft">Descarte:&nbsp;&nbsp;&nbsp;<b>{{dte}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{porcentajeDte}}%)</td></tr>
			</table>

			<input type="button" class=" _danger button"  @click="clickCerrarInforme($event)" value="Cerrar">

		</fieldset>