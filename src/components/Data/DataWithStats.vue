<template>
<div class="columns">
    <div class="column">
        <Table
            :header="data.header"
            :data="data.df_data"
        />
    </div>

    <div class="column is-4">
        <Table
            :header="data.header + ' Statistics'"
            :data="data.df_describe"
        />
    </div>
</div>
</template>

<script>
import Table from './Table.vue'

export default {
    name: 'DataWithStats',
    components: {
        Table
    },
    props: {
        data: {
            default: null,
            type: Object
        }
    }
}
</script>

<style scoped>
</style>
