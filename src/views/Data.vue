<template>
<div class="container">
    <div class="columns">
        <div class="column">
            <AllPatients />
        </div>
    </div>
</div>
</template>

<script>
import AllPatients from '../components/Data/AllPatients'

export default {
    name: 'Data',
    components: {
        AllPatients
    }
}
</script>

<style scoped>
</style>