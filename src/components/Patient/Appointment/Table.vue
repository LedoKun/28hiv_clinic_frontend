<template>
<div>
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

            <div class="table-container">
                <!-- table -->
                <b-table
                :data="previousAppointments"
                :striped="true"
                :narrowed="true"
                :hoverable="true"
                :mobile-cards="true"
                >
                    <template slot-scope="props">
                        <b-table-column
                        field="date"
                        label="Date"
                        >{{ $moment(props.row.date).isValid() ? $moment(props.row.date).format("DD/MM/YYYY") : "-" }}</b-table-column>

                        <b-table-column
                        field="appointmentFor"
                        label="Appointment For"
                        >{{ props.row.appointmentFor }}</b-table-column>

                        <b-table-column field="actions" label>
                            <div class="is-pulled-right">
                                <a
                                    class="button is-info is-small"
                                    @click="editData(props.index)"
                                >
                                    <span class="icon">
                                        <b-icon
                                            icon="pencil"
                                        />
                                    </span>
                                </a>
                                <a
                                    class="button is-danger is-small"
                                    @click="deleteData(props.row.id)"
                                >
                                    <span class="icon">
                                        <b-icon
                                            icon="delete-outline"
                                        />
                                    </span>
                                </a>
                            </div>
                        </b-table-column>

                    </template>


                    <template slot="empty">
                        <section class="section">
                        <div class="content has-text-grey has-text-centered">
                            <p>
                            <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                            </p>
                            <p>Nothing here.</p>
                        </div>
                        </section>
                    </template>
                </b-table>
                <!-- /table -->
            </div>
        </b-collapse>
         <!-- /Ix Results -->
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'AppointmentTable',
    computed: {
        ...mapState('Appointment', [
            'previousAppointments'
        ])
    },
    methods: {
        ...mapActions('Appointment', [
            'loadAction',
            'deleteAction',
            'editAction'
        ]),
        editData(key) {
            this.editAction(key)
        },
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
.b-table {
  margin: 2px auto 0px auto;
  font-size: 0.8em;
}
</style>
