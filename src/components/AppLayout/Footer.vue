<template>
<footer class="footer">
    <div class="container">
        <div class="content has-text-centered">
            <a href="https://vuejs.org/">
                <img src="../../assets/vue-logo.png" alt="Made with Vue.js" class="logo">
            </a>
            <a href="https://bulma.io">
                <img src="../../assets/bulma-logo.png" alt="Made with Bulma" class="logo">
            </a>
            <a href="https://buefy.github.io">
                <img src="../../assets/buefy-logo.png" alt="Made with Buefy" class="logo">
            </a>
            <a href="https://www.python.org">
                <img src="../../assets/python-logo.png" alt="Python powered" class="logo">
            </a>
            <a href="http://flask.pocoo.org">
                <img src="../../assets/flask-logo.png" alt="Made with Flask" class="logo">
            </a>
            <a href="https://www.docker.com">
                <img src="../../assets/docker-logo.png" alt="Served with Docker" class="logo">
            </a>
            <a href="https://alpinelinux.org">
                <img src="../../assets/alpine-logo.png" alt="Served with Alpine Linux" class="logo">
            </a>
            <a href="http://nginx.org">
                <img src="../../assets/nginx-logo.png" alt="Served with Nginx" class="logo">
            </a>
        </div>
    </div>
</footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
.footer {
    background-color: white;
    bottom: 0px;
    padding: 2rem 1.5rem 2rem;
}
.logo {
    height:  2rem;
    margin: 0.5rem 0.75rem;
}
</style>
