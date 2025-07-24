<template>
  <div class="page-wrapper">
    <div
      v-if="showBackground"
      :class="['background-layer', computedClass]"
    ></div>

    <aside>
      <router-view />
    </aside>
  </div>
</template>

<script>
export default {
  computed: {
    computedClass() {
      if (this.$route.path === '/employment') {
        return 'employment-view-bg';
      } else if (this.$route.path === '/attendance') {
        return 'attendance-bg';
      } else {
        return '';
      }
    },
    showBackground() {
      return ['/employment', '/attendance'].includes(this.$route.path);
    }
  }
};
</script>

<style>
  body {
    background: none !important;
    min-height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  
.page-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}
.employment-view-bg {
  background-color: #219aea0f;
}

.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  z-index: -1;
}

.attendance-bg {
  background-color: #219aea0f;
}

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
aside {
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
}


/* Responsive font and padding for smaller screens */
@media (max-width: 1300px) {
  #app {
    font-size: 15px;
    padding: 0 2vw;
  }
  aside {
    padding: 0;
  }
  nav {
    padding: 15px;
  }
}

</style>
