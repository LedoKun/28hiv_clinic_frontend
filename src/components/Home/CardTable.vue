<template>
<b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
            {{ header }} ({{ cardData.length }})
        </p>
        <a class="card-header-icon">
            <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
        </a>
    </div>
    <div class="card-table">
        <div class="content">
            <!-- table -->
            <table class="table is-fullwidth is-striped">
                <tbody>
                    <tr
                        v-for="(item, key) in cardData"
                        :key="key"
                    >
                        <td width="5%"><b-icon icon="account" /></td>
                        <td width="15%">
                            <a
                                @click="goToPatient(item.patient.hn)"
                            >
                                HN: {{ item.patient.hn }}
                            </a>
                        </td>
                        <td width="25%">{{ item.patient.name ? item.patient.name : '-' }}</td>
                        <td>{{ item[msgFieldName] ? msgFormat(item[msgFieldName]) : '-' }}</td>
                    </tr>
                </tbody>
            </table>
            <!-- /table -->
        </div>
    </div>
</b-collapse>
</template>

<script>
export default {
    name: 'CardTable',
    props: {
        cardData: {
            type: Array
        },
        header: {
            type: String
        },
        msgFieldName: {
            type: String
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
.card-table .table {
  margin-bottom: 0;
}
.card-table {
  max-height: 350px;
  overflow-y: auto;
}
</style>
