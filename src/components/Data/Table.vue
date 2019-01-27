<template>
<b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
            {{ header }}
        </p>
        <a class="card-header-icon">
            <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
        </a>
    </div>

    <div class="card-table">
        <div class="table-wrapper" v-html="data">
        </div>
    </div>

</b-collapse>
</template>

<script>
export default {
    name: 'Table',
    props: {
        data: {
            default: null
        },
        header: {
            type: String
        }
    }
}
</script>

<style scoped>
</style>
