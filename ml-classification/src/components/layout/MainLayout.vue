<template>
 
                <Header />
                <Aside />
            <router-view></router-view>
                <Footer />
</template>

<script>
    import Header from '../common/Header.vue'
    import Aside from '../common/Aside.vue'
    import Footer from '../common/Footer.vue'

    export default {
        name: 'MainLayout',
        components: {
            Header,
            Aside,
            Footer
        }
    }
</script>

<style>
</style>