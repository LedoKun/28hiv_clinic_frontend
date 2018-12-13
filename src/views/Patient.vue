<template>
    <div class="container">
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
                        <PatientInfo />
                    </div>
                </div>
                <!-- / patient basic info form -->
            </div>
        </div>

         <!-- previous visits -->
        <div
            class="columns"
            v-if="isPatientSaved"
        >
            <div class="column">
                <PreviousVisits />
            </div>
        </div>
        <!-- / previous visits -->

        <!-- patient visit form -->
        <div
            class="columns"
            v-if="isPatientSaved"
        >
            <div class="column">
                <VisitInfo />
            </div>
        </div>
        <!-- / patient visit form -->

        <div
            class="columns"
            v-if="isPatientSaved"
        >
            <div class="column">
                <IxResults />
            </div>
        </div>

        <!-- LabsInfo form -->          
        <div
            class="columns"
            v-if="isPatientSaved"
        >
            <div class="column">
                <IxInfo />
            </div>
        </div>
        <!-- / LabsInfo form -->

        <!-- Appointments -->              
        <div
            class="columns"
            v-if="isPatientSaved"
        >
            <div class="column is-5">
                <ListAppointments />
            </div>
            <div class="column">
                <AppointmentInfo />
            </div>
        </div>
        <!-- / Appointments -->

    </div>
</template>

<script>
import SideInfo from '../components/Patient/SideInfo.vue'
import PatientInfo from '../components/Patient/PatientInfo.vue'
import PreviousVisits from '../components/Patient/PreviousVisits.vue'
import VisitInfo from '../components/Patient/VisitInfo.vue'
import IxResults from '../components/Patient/IxResults.vue'
import IxInfo from '../components/Patient/IxInfo.vue'
import ListAppointments from '../components/Patient/ListAppointments.vue'
import AppointmentInfo from '../components/Patient/AppointmentInfo.vue'

import { mapActions, mapState } from 'vuex'

export default {
    name: 'Patient',
    props: [
        'urlHN'
    ],
    components: {
        SideInfo,
        PatientInfo,
        PreviousVisits,
        VisitInfo,
        IxResults,
        IxInfo,
        ListAppointments,
        AppointmentInfo
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
</style>

<style>
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
    max-height: 80%;
    overflow-y: auto;
    table-layout: auto;
}
</style>
