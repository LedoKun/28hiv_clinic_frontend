<template>
<aside class="is-medium">
        <!-- Previous Visits -->
        <b-collapse class="card">
            <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                    Previous Visits
                </p>
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <div class="card-table overflow-table">
                <div class="content">
                    <!-- table -->
                    <table class="table is-fullwidth is-striped">
                        <tbody>
                            <tr>
                                <td class="row-header">
                                    #
                                </td>
                                <td class="row-header">
                                    Date
                                </td>
                                <td class="row-header">
                                    BW
                                </td>
                                <td class="row-header">
                                    Hx Contact TB
                                </td>
                                <td class="row-header">
                                    ARV Adherence Scale (%)
                                </td>
                                <td class="row-header">
                                    ARV Adherence Problems
                                </td>
                                <td class="row-header">
                                    Dosing Delaed By (min)
                                </td>
                                <td class="row-header">
                                    Dx
                                </td>
                                <td class="row-header">
                                    ARV
                                </td>
                                <td class="row-header">
                                    OI Meds
                                </td>
                                <td class="row-header">
                                    TB Meds
                                </td>
                                <td class="row-header">
                                    Vaccine
                                </td>
                                <td class="row-header">
                                </td>
                            </tr>
                            <tr
                                v-for="(item, key) in previousVisits"
                                :key=key
                            >
                                <td>{{ key + 1 }}</td>
                                <td>
                                    {{ $moment(item.date).isValid() ? $moment(item.date).format("DD/MM/YYYY") : "-" }}
                                </td>
                                <td>{{ item.bw ? item.bw : "" }}</td>
                                <td>{{ item.contactTB ? item.contactTB : "" }}</td>
                                <td>{{ item.adherenceScale ? item.adherenceScale : "" }}</td>
                                <td>{{ item.adherenceProblem ? item.adherenceProblem : "" }}</td>
                                <td>{{ item.delayedDosing ? item.delayedDosing : "" }}</td>
                                <td>{{ item.impression && item.impression.length > 0 ? item.impression.join(", ") : "" }}</td>
                                <td>{{ item.arv && item.arv.length > 0 ? item.arv.join(", ") : "" }}</td>
                                <td>{{ item.oiProphylaxis && item.oiProphylaxis.length > 0 ? item.oiProphylaxis.join(", ") : "" }}</td>
                                <td>{{ item.antiTB && item.antiTB.length > 0 ? item.antiTB.join(", ") : "" }}</td>
                                <td>{{ item.vaccination && item.vaccination.length > 0 ? item.vaccination.join(", ") : "" }}</td>   
                                <td><a class="button is-danger is-small is-pulled-right" @click="deleteData(item.id)">Delete</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- /table -->
                </div>
            </div>
        </b-collapse>
         <!-- /Previous Visits -->
</aside>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'PreviousVisits',
    computed: {
        ...mapState('Visit', [
            'previousVisits'
        ])
    },
    methods: {
        ...mapActions('Visit', [
            'loadAction',
            'deleteAction'
        ]),
        deleteData (id) {
            let self = this

            self.$dialog.confirm({
                title: 'Deleting Visit',
                message: 'Are you sure you want to <b>delete</b> this visit?',
                confirmText: 'Delete',
                cancelText: 'Cancel',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {

                    self.deleteAction(id)
                        .then(() => {
                            self.$toast.open({
                                message: 'Visit Deleted!',
                                type: 'is-success',
                                position: 'is-bottom'
                            })

                            self.loadAction()
                        })
                        .catch((error) => {
                            let message = error.response.data.name ? (
                                error.response.data.name
                                + ' (' + error.response.data.statusCode + ') : '
                                + error.response.data.description
                            ) : 'Unexpected Error!'

                            self.$toast.open({
                                message: message,
                                type: 'is-danger',
                                position: 'is-bottom',
                                duration: 5000
                            })
                        })

                }
            })
        }
    }
}
</script>

<style scoped>
.row-header {
    font-weight: bold;
}
.overflow-table {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
}
</style>
