<template>
<b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
            Schedule An Appointment
        </p>
        <a class="card-header-icon">
            <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
        </a>
    </div>
    <div class="card-content">

        <!-- form area -->
        <div class="content">
            <form
                @submit.prevent="saveForm"
                id="AppointmentForm"
            >
                <div class="columns">
                    <!-- date -->
                    <div class="column">
                        <b-field
                            label="Appointment Date *"
                            custom-class="is-small"
                            :type="{'is-danger': errors.has('date')}"
                            :message="errors.first('date')"
                        >
                            <b-datepicker
                                placeholder="เลือกวัน..."
                                icon="calendar-today"
                                size="is-small"
                                v-model="data.date"
                                name="date"
                                :min-date="new Date()"
                                v-validate="'required'"
                            >
                            </b-datepicker>
                        </b-field>
                    </div>
                    <!-- / date -->

                    <!-- appointmentFor -->
                    <div class="column">
                        <b-field
                            label="For *"
                            :type="{'is-danger': errors.has('appointmentFor')}"
                            :message="errors.first('appointmentFor')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="text"
                                size="is-small"
                                v-model="data.appointmentFor"
                                name="appointmentFor"
                                v-validate="'min:2'"
                            />
                        </b-field>
                    </div>
                    <!-- / appointmentFor -->

                </div>

            </form>
        </div>
        <!-- / form area -->

    </div>
    <div class="card-footer">
        <a
            class="card-footer-item has-text-danger"
            @click="confirmReset"
        >
            Reset Form
        </a>
        <a
            class="card-footer-item"
            @click="saveForm"
        >
            Save
        </a>
    </div>
</b-collapse>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'

Vue.use(VeeValidate, {
    events: ''
})

export default {
    name: 'AppointmentForm',
    computed: {
        ...mapFields('Appointment', [
            'data'
        ])
    },
    methods: {
        ...mapActions('Appointment', [
            'setDefaultAction',
            'submitAction',
            'loadAction'
        ]),
        confirmReset () {
            this.$dialog.confirm({
                title: 'Reseting Appointment Form',
                message: 'Are you sure you want to <b>reset</b> this appointment form?',
                confirmText: 'Reset Form',
                cancelText: 'Cancel',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    document.getElementById('AppointmentForm').reset()
                    this.$toast.open('Form Reseted!')
                }
            })
        },
        async saveForm () {
            let self = this
            
            self.$validator.validateAll().then(async (result) => {
                if (result) {
                    try {
                        await self.submitAction()

                        self.$toast.open({
                            message: 'Appointment Data Saved!',
                            type: 'is-success',
                            position: 'is-bottom'
                        })

                        self.setDefaultAction()
                        self.errors.clear()
                        self.loadAction()
                    } catch (error) {
                        // error
                    }
                } else {
                    self.$toast.open({
                        message: 'กรุณาตรวจสอบข้อมูล',
                        type: 'is-danger',
                        position: 'is-bottom',
                        duration: 5000
                    })
                }
            }).catch(() => {
                // logic error
            })
        },
    },
    data: function () {
        return {
        }
    }
}
</script>

<style scoped>
.full-width-input {
    width: 100%;
}
</style>
