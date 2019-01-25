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
/* .card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
}
.card-header-title {
  color: #8F99A3;
  font-weight: 400;
}
.card .content {
  font-size: 14px;
}
.table {
    width: 98%;
    margin-left:auto; 
    margin-right:auto;
    margin-top: 2px;
}
.card-table {
  overflow-y: auto;
} */

.card {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
    margin-bottom: 2rem;
}
.card-header-title {
    color: #8F99A3;
    font-weight: 400;
}
.card .content .table  {
    font-size: 14px;
}
</style>
