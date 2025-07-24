<template >
    <Navbar />
    <div  id="app">
        <EmploDashComp/>
    </div>
    <Footer />
</template>

<script setup>
    import Navbar from "@/components/Navbar.vue"
    import Footer from "@/components/Footer.vue"
</script>

<script>
import EmploDashComp from '@/components/EmploDashComp.vue';

export default {
    components: {
        EmploDashComp
    }
}
</script>
<style >
    
</style>