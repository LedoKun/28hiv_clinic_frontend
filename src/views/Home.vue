<template>
<div class="container">

    <div class="columns">
        <!-- hero -->
        <div class="column is-12">
            <Hero
                :dashboardInfo="dashboardInfo"
            />
        </div>
        <!-- /hero -->
    </div>

    <!-- cards -->
    <div class="columns">
        <!-- today appointments -->
        <div class="column is-6">
            <CardTable
                :cardData="todayAppointment"
                :header="'Appointments'"
                :msgFieldName="'appointmentFor'"
                v-model="appointmentPage"
            />
        </div>
        <!-- /today appointments -->

        <!-- patients examined -->
        <div class="column is-6">
            <CardTable
                :cardData=" patientExamined"
                :header="'Examined Patients'"
                :msgFieldName="'impression'"
                v-model="examinedPage"
            />
        </div>
        <!-- /patients examined -->
    </div>
    <!-- /cards -->

</div>
</template>

<script>
import Hero from '../components/Home/Hero.vue'
import CardTable from '../components/Home/CardTable.vue'
import instance from '@/utils/http'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Hero,
    CardTable
  },
  created() {
  },
  watch: {
    isLoggedin: function (newValue) {
        if (newValue) {
            this.fetchData()
        } else {
            this.setDefault()
        }
    },
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
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    setDefault() {
        this.todayAppointment = []
        this.patientExamined = []
        this.countPatient = '-'
    },
    async fetchData () {
        let self = this
        let today = self.$moment().format('YYYY-MM-DD')

        if (!this.isLoggedin) {
            return
        }

        try {
            let response = await instance({
                url: 'patient/dashboard',
                method: 'get',
                params: {
                    date: today,
                    appointment_page_number: this.appointmentPage,
                    examined_page_number: this.examinedPage,
                }
            })

            let payload = response.data

            if (Object.getOwnPropertyNames(payload).length > 0) {
                // assign todayAppointment
                if (payload.todayAppointment && (Object.getOwnPropertyNames(payload.todayAppointment).length > 0)) {
                    self.todayAppointment = payload.todayAppointment
                } else {
                    self.todayAppointment = {}
                }

                // assign patientExamined
                if (payload.patientExamined && (Object.getOwnPropertyNames(payload.patientExamined).length > 0)) {
                    self.patientExamined = payload.patientExamined
                } else {
                    self.patientExamined = {}
                }

                if (payload.countPatient) {
                    self.countPatient = payload.countPatient
                } else {
                    self.countPatient = '-'
                }

            }
        } catch (error) {
            // error
            self.setDefault()
        }
    },
    countItem(items) {
        if (!items) {
            return 0
        } else {
            return Object.keys(items).length
        }
    }
  },
  computed: {
    ...mapState('Auth', [
        'isLoggedin'
    ]),
    dashboardInfo: function () {
        return {
            countTodayAppointment: this.countItem(this.todayAppointment.items),
            countPatientExamined: this.countItem(this.patientExamined.items),
            countPatient: this.countPatient
        }
    }
  },
  data: function () {
    return {
        todayAppointment: {},
        patientExamined: {},
        appointmentPage: 0,
        examinedPage: 0,
        countPatient: '-'
    }
  }
}
</script>

<style scoped>
</style>
