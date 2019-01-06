<template>
    <div class="container">

        <!-- Patient information Section -->
        <section class="section">

            <div class="columns">
                <div class="column is-3">
                    <div class="columns">
                        <div class="column">
                            <SideInfo />
                        </div>
                    </div>
                </div>

                <div class="column">
                    <!-- patient basic info form -->
                    <div class="columns">
                        <div class="column">
                            <PatientForm />
                        </div>
                    </div>
                    <!-- / patient basic info form -->
                </div>
            </div>
    
        </section>
        <!-- / Patient information Section -->

        <!-- Visit Infoirmation Section -->
        <section
            class="section"
            v-if="isPatientSaved"
        >

            <div class="columns">
                <div class="column">
                    <PreviousVisits />
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <VisitInfo />
                </div>
            </div>

        </section>
        <!-- / Visit Infoirmation Section -->

        <!-- Investigation results -->
        <section
            class="section"
            v-if="isPatientSaved"
        >

            <div class="columns">
                <div class="column">
                    <IxTable />
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <IxForm />
                </div>
            </div>

        </section>
        <!-- / Investigation results -->

        <!-- Appointments -->
        <section
            class="section"
            v-if="isPatientSaved"
        >
            <div class="columns">
                <div class="column is-5">
                    <AppointmentTable />
                </div>
                <div class="column">
                    <AppointmentForm />
                </div>
            </div>
        </section>
        <!-- / Appointments -->

    </div>
</template>

<script>
// Patient section
import SideInfo from '../components/Patient/PatientInfo/SideInfo.vue'
import PatientForm from '../components/Patient/PatientInfo/Form.vue'

// Visit section
import PreviousVisits from '../components/Patient/Visit/Table.vue'
import VisitInfo from '../components/Patient/Visit/Form.vue'

// Ix Section
import IxTable from '../components/Patient/Investigation/Table.vue'
import IxForm from '../components/Patient/Investigation/Form.vue'

// Appointment Section
import AppointmentTable from '../components/Patient/Appointment/Table.vue'
import AppointmentForm from '../components/Patient/Appointment/Form.vue'

import { mapActions, mapState } from 'vuex'

export default {
    name: 'Patient',
    props: [
        'urlHN'
    ],
    components: {
        SideInfo,
        PatientForm,
        PreviousVisits,
        VisitInfo,
        IxTable,
        IxForm,
        AppointmentTable,
        AppointmentForm
    },
    created () {
        this.setPatientDefault()
        this.setVisitDefault()
        this.setInvestigationDefault()
        this.setAppointmentDefault()
    },
    mounted () {
        if (this.urlHN) {
            this.loadPatient(this.urlHN)
        }
    },
    watch: {
        urlHN: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                    this.setPatientDefault()
                    this.setVisitDefault()
                    this.setInvestigationDefault()
                    this.setAppointmentDefault()
                if (newValue) {
                    this.loadPatient(this.urlHN)
                }
            }
        }
    },
    computed: {
        ...mapState('Patient', {
            isPatientSaved: 'isDataInBackend'
        })
    },
    methods: {
        ...mapActions('Patient', {
            setPatientDefault: 'setDefaultAction',
            loadPatient: 'loadAction'
        }),
        ...mapActions('Visit', {
            setVisitDefault: 'setDefaultAction'
        }),
        ...mapActions('Investigation', {
            setInvestigationDefault: 'setDefaultAction'
        }),
        ...mapActions('Appointment', {
            setAppointmentDefault: 'setDefaultAction'
        })
    },
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
</style>
