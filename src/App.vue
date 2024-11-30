<template>
  <div class="min-h-screen bg-dark-950">
    <HeaderComponent />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CoverGenerator />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import CoverGenerator from './components/CoverGenerator.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    CoverGenerator,
    FooterComponent
  }
};
</script>