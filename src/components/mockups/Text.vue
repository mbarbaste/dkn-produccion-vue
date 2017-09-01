<template>
<div id="textos" class="contenedor borde">
  <h3>Headings</h3>
  <h1>Primary<small>Secondary</small></h1>
  <h2>Primary<small>Secondary</small></h2>
  <h3>Primary<small>Secondary</small></h3>
  <h4>Primary<small>Secondary</small></h4>
  <h5>Primary<small>Secondary</small></h5>
  <h6>Primary<small>Secondary</small></h6>
  <hr>
  <h3>Basic Styles</h3>
  <p>Base <strong>Bolded</strong>
    <a href="http://outboxcraft.com/beauter">Link</a>
    <small>Smaller</small>
    <del>Deleted</del>
    <em>Italicized</em>
    <a>Colored</a>
    <u>Underlined</u>
    <mark>Highlighted</mark></p>
  <code>printf("Hello, Horld!\n");</code>
  <kbd>Ctrl</kbd>
  </p>
  <hr>
  <h3>Showing Code</h3>
  <pre>
    <code>
      <p>{{ codigo}}
     <!-- "#include <stdio.h>" -->
    <!-- int main()
    {
    	printf("Hello, World!\n");
    	return 0;
    }  -->
  </p>
</code>
  </pre>
  <hr>
  <h3>BlockQuotes</h3>
  <blockquote>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi enim augue, pellentesque id nibh at, laoreet placerat mi. Sed rutrum diam auctor mollis scelerisque. Pellentesque sit amet ultricies ante. Nullam molestie euismod iaculis. Sed pellentesque
    mauris eleifend mattis tempor. Aenean id tempus urna. Donec rutrum mauris et erat accumsan porttitor.
    <footer>Someone famous in <cite title="Source Title">Source Title</cite>
    </footer>
  </blockquote>
</div>
</template>
<script>
export default {
  name: "textos",
  data() {
    return {
      codigo: '#include <stdio.h>\n\tint main()\n\tprintf("Hello, World!");\nreturn 0;'
    }
  }
}
</script>
<style scoped>
</style>
