<template>
<aside class="is-medium">
        <!-- Ix Results -->
        <b-collapse class="card">
            <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                    Appointments
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
                                    For
                                </td>
                                <td class="row-header">
                                </td>
                            </tr>
                            <tr
                                v-for="(item, key) in previousAppointments"
                                :key=key
                            >
                                <td>{{ key + 1 }}</td>
                                <td>
                                    {{ $moment(item.date).isValid() ? $moment(item.date).format("DD/MM/YYYY") : "-" }}
                                </td>
                                <td>{{ item.appointmentFor ? item.appointmentFor : "" }}</td>
                                <td><a class="button is-danger is-small is-pulled-right" @click="deleteData(item.id)">Delete</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- /table -->
                </div>
            </div>
        </b-collapse>
         <!-- /Ix Results -->
</aside>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'ListAppointments',
    computed: {
        ...mapState('Appointment', [
            'previousAppointments'
        ])
    },
    methods: {
        ...mapActions('Appointment', [
            'loadAction',
            'deleteAction'
        ]),
        deleteData (id) {
            let self = this

            self.$dialog.confirm({
                title: 'Deleting Appointment',
                message: 'Are you sure you want to <b>delete</b> this appointment?',
                confirmText: 'Delete',
                cancelText: 'Cancel',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: async () => {
                    try {
                        await self.deleteAction(id)
                        
                        self.$toast.open({
                            message: 'Appointment Deleted!',
                            type: 'is-success',
                            position: 'is-bottom'
                        })

                        self.loadAction()
                    } catch (error) {
                        // error
                    }

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
