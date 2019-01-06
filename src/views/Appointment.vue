<template>
<div class="container">
    <div class="columns">
        <!-- select date -->
        <div class="column is-4">
            <form>
                <b-field
                    label="เลือกวันที่"
                >
                    <b-datepicker
                        inline
                        placeholder="เลือกวัน..."
                        icon="calendar-today"
                        size="is-small"
                        v-model="dateSelected"
                        name="date"
                    >
                    </b-datepicker>
                </b-field>
            </form>
        </div>
        <!-- /select date -->

        <div class=column>
            <div class="columns">
                <!-- appointments -->
                <div class="column" v-if="isReady">
                    <b-collapse class="card">
                        <div slot="trigger" slot-scope="props" class="card-header">
                            <p class="card-header-title">
                                ผู้ป่วยนัด ({{ appointment.total }})
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                    :icon="props.open ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </a>
                        </div>

                        <div class="card-table">
                            <b-table
                                class="table"

                                :hoverable="true"
                                :mobile-cards="true"
                                :narrowed="true"
                                :striped="true"

                                :data="appointment.items"

                                paginated
                                backend-pagination
                                :total="appointment.total"
                                :per-page="appointment.per_page"
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
                                    <b-table-column field="hn" label="HN" class="smallField">
                                        <a
                                            @click="goToPatient(props.row.patient.hn)"
                                        >
                                            {{ props.row.patient.hn }}
                                        </a>
                                    </b-table-column>             

                                    <b-table-column field="cid" label="#" class="dataField">
                                        {{ props.row.patient.cid }}
                                    </b-table-column>

                                    <b-table-column field="name" label="ชื่อ" class="dataField">
                                        {{ props.row.patient.name }}
                                    </b-table-column>

                                    <b-table-column field="appointmentFor" label="สาเหตุการนัด" class="dataField">
                                        {{ props.row.patient.appointmentFor }}
                                    </b-table-column>

                                    <b-table-column field="tel" label="โทร" class="dataField">
                                        {{ msgFormat(props.row.patient.tel) }}
                                    </b-table-column>

                                    <b-table-column field="relative_tel" label="โทร (ญาติ)" class="dataField">
                                        {{ msgFormat(props.row.patient.relative_tel) }}
                                    </b-table-column>
                                </template>

                            </b-table>
                        </div>
                    </b-collapse>
                </div>
                <!-- /appointments -->
            </div>

            <div class="columns">
                <!-- examined -->
                <div class="column" v-if="isReady">
                    <b-collapse class="card">
                        <div slot="trigger" slot-scope="props" class="card-header">
                            <p class="card-header-title">
                                ผู้ป่วยที่ตรวจ ({{ examined.total }})
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                    :icon="props.open ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </a>
                        </div>

                        <div class="card-table">
                            <b-table
                                class="table"

                                :hoverable="true"
                                :mobile-cards="true"
                                :narrowed="true"
                                :striped="true"

                                :data="examined.items"

                                paginated
                                backend-pagination
                                :total="examined.total"
                                :per-page="examined.per_page"
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
                                    <b-table-column field="hn" label="HN" class="smallField">
                                        <a
                                            @click="goToPatient(props.row.patient.hn)"
                                        >
                                            {{ props.row.patient.hn }}
                                        </a>
                                    </b-table-column>             

                                    <b-table-column field="cid" label="#" class="dataField">
                                        {{ props.row.patient.cid }}
                                    </b-table-column>

                                    <b-table-column field="name" label="ชื่อ" class="dataField">
                                        {{ props.row.patient.name }}
                                    </b-table-column>

                                    <b-table-column field="impression" label="Impressions" class="dataField">
                                        {{ msgFormat(props.row.impression) }}
                                    </b-table-column>
                                </template>

                            </b-table>
                        </div>
                    </b-collapse>
                </div>
                <!-- /examined -->
            </div>
        </div>
    </div>

</div>
</template>

<script>
import instance from '@/utils/http'

export default {
    name: 'Appointment',
    components: {
    },
    watch: {
        appointmentPage: function (newValue, oldValue) {
            if (oldValue !== newValue) {
                this.fetchData()
            }
        },
        examinedPage: function (newValue, oldValue) {
            if (oldValue !== newValue) {
                this.fetchData()
            }
        },
        dateSelected: function (newValue, oldValue) {
            if (oldValue !== newValue) {
                this.fetchData()
            }
        },
    },
    mounted: function () {
        this.dateSelected = new Date()
        this.fetchData()
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
        async fetchData () {
            let self = this
            let dateParam = this.$moment(self.dateSelected)

            dateParam = dateParam.isValid() ? dateParam : this.$moment()
            self.isReady = false

            try {
                let response = await instance({
                    url: 'patient/dashboard',
                    method: 'get',
                    params: {
                        date: dateParam.format('YYYY-MM-DD'),
                        appointment_page_number: this.appointmentPage,
                        examined_page_number: this.examinedPage,
                    }
                })

                let payload = response.data

                if (Object.getOwnPropertyNames(payload).length > 0) {
                    // assign todayAppointment
                    if (payload.todayAppointment && (Object.getOwnPropertyNames(payload.todayAppointment).length > 0)) {
                        self.appointment = payload.todayAppointment
                    } else {
                        self.appointment = {}
                    }

                    // assign patientExamined
                    if (payload.patientExamined && (Object.getOwnPropertyNames(payload.patientExamined).length > 0)) {
                        self.examined = payload.patientExamined
                    } else {
                        self.examined = {}
                    }

                    this.isReady = true
                }
            } catch (error) {
                // error
                self.setDefault()
            }
        },
        setDefault () {
            this.appointment = {}
            this.examined = {}
            this.appointmentPage = 0
            this.examinedPage = 0
            this.isReady = false
        },
        msgFormat (msg) {
            if (Object.prototype.toString.call(msg) === '[object Array]') {
                return msg.join(', ')
            } else {
                return msg
            }
        },
    },
    data: function () {
        return {
            dateSelected: null,
            appointment: {},
            examined: {},
            appointmentPage: 0,
            examinedPage: 0,
            isReady: false
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
.table .smallField {
    width: 15%;
}
.table .dataField {
    width: auto;
}
</style>