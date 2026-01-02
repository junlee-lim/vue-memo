<script setup>

</script>

<template>
<div class="app">
    <!--부트스트랩은 container 클래스가 부모 역할
    py-4 = padding-top + padding-bottom이 24px
    -->
    <div class="container py-4">
        <header class="pb-4 mb-4 border-bottom">
            <router-link to="/" class="text-dark text-decoration-none">
                <b class="fs-4">memo</b>
            </router-link>
        </header>
        <main>
            <router-view />
        </main>
        <footer class="pt-4 mt-4 border-top">
            &copy; 2024. memo
        </footer>
    </div>
</div>
</template>

<style scoped>
.app.container{max-width: 576px;}
</style>