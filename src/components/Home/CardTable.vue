<template>
<b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
            {{ header }} ({{ cardData.total }})
        </p>
        <a class="card-header-icon">
            <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
        </a>
    </div>
    <div class="card-table">
        <!-- table -->
        <b-table
            class="table"

            :hoverable="true"
            :mobile-cards="true"
            :narrowed="true"
            :striped="true"

            :data="cardData.items"

            paginated
            backend-pagination
            :total="cardData.total"
            :per-page="cardData.per_page"
            @page-change="onPageChange"
        >
            <!-- empty -->
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
            <!-- /empty -->

            <template slot-scope="props">
                <b-table-column field="hn" label="HN" class="hnField">
                    <a
                        @click="goToPatient(props.row.patient.hn)"
                    >
                        {{ props.row.patient.hn }}
                    </a>
                </b-table-column>             

                <b-table-column field="name" label="ชื่อ" class="nameField">
                    {{ props.row.patient.name }}
                </b-table-column>

                <b-table-column field="data" class="dataField">
                    {{ msgFormat(props.row[msgFieldName]) }}
                </b-table-column>
            </template>

        </b-table>
        <!-- /table -->
    </div>
</b-collapse>
</template>

<script>
export default {
    name: 'CardTable',
    props: {
        cardData: {
            type: [Object, Array]
        },
        header: {
            type: String
        },
        msgFieldName: {
            type: String
        },
        input: {
            type: Number
        }
    },
    methods: {
        goToPatient (hn) {
            this.$router.push({
                name: 'patient',
                params: {
                    urlHN: hn
                }
            })
        },
        msgFormat (msg) {
            if (Object.prototype.toString.call(msg) === '[object Array]') {
                return msg.join(', ')
            } else {
                return msg
            }
        },
        onPageChange (page) {
            this.$emit('input', page)
        }
    }
}
</script>

<style scoped>
.card {
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
  max-height: 350px;
  overflow-y: auto;
}
.table .hnField {
    width: 20%;
}
.table .nameField {
    width: 30%;
}
.table .dataField {
    width: auto;
}
</style>
