<template>
<div id="form" class="contenedor">
  <form>
    <fieldset>
      <legend>Contact information:</legend>
      <div class="row">
        <div class="col m6">
          <label for="Email">Enter email</label>
          <input class="_full-width" type="email" placeholder="test@mail.com" id="Email">
        </div>
        <div class="col m6">
          <label for="Input">Reason for contact</label>
          <select class="_width100" id="Input">
        <option value="Option 1">Help</option>
        <option value="Option 2">Thanks</option>
        <option value="Option 3">Support</option>
      </select>
        </div>
      </div>
      <label for="Message">Message</label>
      <div class="col m12">
        <textarea class="_width100" placeholder="Your message.." id="Message"></textarea>
      </div>
      <label for="Send">
    <input type="checkbox" id="Send">
    <span class="-label-body">Send a copy to yourself</span>
</label>
      <input class=" _primary button" type="submit" value="Submit">
      <input class="button" type="reset" value="Reset">
      <br>
    </fieldset>
  </form>

</div>
</template>
<script>
export default {
  name: "form",
  data: () => ({

  })
}
</script>
<style scoped>

</style>
