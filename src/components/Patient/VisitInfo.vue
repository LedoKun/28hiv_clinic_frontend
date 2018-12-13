<template>
<b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
            Visit Information
        </p>
        <a class="card-header-icon">
            <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
        </a>
    </div>
    <div class="card-content">
        <div class="content">
            <!-- form -->
            <form
                @submit.prevent="validateData"
                id="VisitInfoForm"
            >
                <div class="columns">
                    <!-- date -->
                    <div class="column">
                        <b-field
                            label="Visit Date *"
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
                                :max-date="new Date()"
                                v-validate="'required'"
                            >
                            </b-datepicker>
                        </b-field>
                    </div>
                    <!-- / date -->

                    <!-- bw -->
                    <div class="column">
                        <b-field
                            label="Weight (kg)"
                            :type="{'is-danger': errors.has('bw')}"
                            :message="errors.first('bw')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.01"
                                size="is-small"
                                v-model="data.bw"
                                name="bw"
                                v-validate="'decimal|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / bw -->

                </div>

                <div class="columns">
                    <!-- contactTB -->
                    <div class="column">
                        <b-field
                            label="History of Contact With Tuberculosis"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.contactTB"
                                size="is-small"
                                name="contactTB"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in visitOption.contactTB"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / contactTB -->

                    <!-- adherenceScale -->
                    <div class="column">
                        <b-field
                            label="ARV Adherence Scale (Percentage)"
                            :type="{'is-danger': errors.has('adherenceScale')}"
                            :message="errors.first('adherenceScale')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                icon="percent"
                                placeholder="0"
                                step="1"
                                size="is-small"
                                min="0"
                                max="100"
                                v-model="data.adherenceScale"
                                name="adherenceScale"
                                v-validate="'numeric|min_value:0|max_value:100'"
                            />
                        </b-field>
                    </div>
                    <!-- / adherenceScale -->

                    <!-- delayedDosing -->
                    <div class="column">
                        <b-field
                            label="ARV Delayed Dosing (minutes) "
                            :type="{'is-danger': errors.has('delayedDosing')}"
                            :message="errors.first('delayedDosing')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                icon="clock-outline"
                                placeholder="0"
                                step="1"
                                size="is-small"
                                min="0"
                                v-model="data.delayedDosing"
                                name="delayedDosing"
                                v-validate="'numeric|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / delayedDosing -->
                </div>

                <div class="columns">
                    <!-- impression -->
                    <!-- todo: server side tag search -->
                    <div class="column">
                        <b-field
                            custom-class="is-small"
                            label="Impressions *"
                        >
                            <b-taginput
                                size="is-small"
                                v-model="data.impression"
                                :data="filteredICD10"
                                autocomplete
                                :allow-new="false"
                                field="icd10.icd10WithDescription"
                                icon="label"
                                placeholder="Add an impression..."
                                @typing="debouncedICD10Filter"
                            />
                        </b-field>
                    </div>
                    <!-- / impression -->

                    <!-- ARV -->
                    <div class="column">
                        <b-field
                            custom-class="is-small"
                            label="ARV"
                        >
                            <b-taginput
                                size="is-small"
                                v-model="data.arv"
                                :data="filteredARV"
                                autocomplete
                                :allow-new="true"
                                icon="label"
                                placeholder="Add an ARV medication..."
                                @typing="getFilterARV"
                            />
                        </b-field>
                    </div>
                    <!-- / ARV -->

                    <!-- oiProphylaxis -->
                    <div class="column">
                        <b-field
                            custom-class="is-small"
                            label="OI Prophylaxis"
                        >
                            <b-taginput
                                size="is-small"
                                v-model="data.oiProphylaxis"
                                :data="filteredOI"
                                autocomplete
                                :allow-new="true"
                                icon="label"
                                placeholder="Add a medication..."
                                @typing="getFilterIO"
                            />
                        </b-field>
                    </div>
                    <!-- / oiProphylaxis -->

                    <!-- antiTB -->
                    <div class="column">
                        <b-field
                            custom-class="is-small"
                            label="Anti-TB Medications"
                        >
                            <b-taginput
                                size="is-small"
                                v-model="data.antiTB"
                                :data="filteredAntiTB"
                                autocomplete
                                :allow-new="true"
                                icon="label"
                                placeholder="Add a medication..."
                                @typing="getFilteredAntiTB"
                            />
                        </b-field>
                    </div>
                    <!-- / antiTB -->

                    <!-- vaccination -->
                    <div class="column">
                        <b-field
                            custom-class="is-small"
                            label="Vaccine"
                        >
                            <b-taginput
                                size="is-small"
                                v-model="data.vaccination"
                                :data="filteredVaccine"
                                autocomplete
                                :allow-new="true"
                                icon="label"
                                placeholder="Add a medication..."
                                @typing="getFilteredVaccine"
                            />
                        </b-field>
                    </div>
                    <!-- / vaccination -->

                </div>
            </form>
        </div>
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
            @click="validateData"
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
import instance from '@/utils/http'


Vue.use(VeeValidate, {
    events: ''
})

export default {
    name: 'VisitInfo',
    computed: {
        ...mapFields('Visit', [
            'data'
        ])
    },
    methods: {
        ...mapActions('Visit', [
            'setDefaultAction',
            'submitAction',
            'loadAction'
        ]),
        confirmReset () {
            this.$dialog.confirm({
                title: 'Reseting Visit Form',
                message: 'Are you sure you want to <b>reset</b> this visit form?',
                confirmText: 'Reset Form',
                cancelText: 'Cancel',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    document.getElementById('VisitInfoForm').reset()
                    this.$toast.open('Form Reseted!')
                }
            })
        },
        validateData () {
            let self = this

            this.$validator.validateAll().then((result) => {
                if (result) {
                    self.submitAction()
                        .then(() => {
                            self.$toast.open({
                                message: 'Visit Data Saved!',
                                type: 'is-success',
                                position: 'is-bottom'
                            })

                            self.setDefaultAction()
                            self.errors.clear()
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

                    return
                }
                
                self.$toast.open({
                    message: 'กรุณาตรวจสอบข้อมูล',
                    type: 'is-danger',
                    position: 'is-bottom',
                    duration: 5000
                })
            })
        },
        getFilterICD10 (keyword) {
            if (String(keyword).length <= 0) {
                return
            }

            let self = this

            instance({
                url: 'search/icd10',
                method: 'get',
                params: {
                    keyword: keyword
                }
            })
                .then((response) => {
                    self.filteredICD10 = response.data
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
        },
        getFilterARV (text) {
            this.filteredARV = this.visitOption.arv.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            })
        },
        getFilterIO (text) {
            this.filteredOI = this.visitOption.oiProphylaxis.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            })
        },
        getFilteredAntiTB (text) {
            this.filteredAntiTB = this.visitOption.antiTB.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            })
        },
        getFilteredVaccine (text) {
            this.filteredVaccine = this.visitOption.vaccination.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            })
        }
    },
    data: function () {
        return {
            filteredICD10: [],
            filteredARV: [],
            filteredOI: [],
            filteredAntiTB: [],
            filteredVaccine: [],
            debouncedICD10Filter: this.$_.debounce(this.getFilterICD10, 500),

            visitOption: {
                contactTB: [
                    'Contacted with TB',
                    'Not Contacted with TB'
                ],
                arv: [
                    '3TC',
                    'ABC',
                    'APV',
                    'ATV',
                    'BIC',
                    'COBI',
                    'd4T',
                    'ddI',
                    'DLV',
                    'DOR',
                    'DRV',
                    'DTG',
                    'EFV',
                    'ETR',
                    'EVG',
                    'FPV',
                    'FTC',
                    'IBA',
                    'IDV',
                    'LPV',
                    'MVC',
                    'NFV',
                    'NVP',
                    'RAL',
                    'RPV',
                    'RTV',
                    'SQV',
                    'T20',
                    'TAF',
                    'TDF',
                    'TPV',
                    'ZDV'
                ],
                oiProphylaxis: [
                    'Azithromycin',
                    'Bactrim',
                    'Fluconazole',
                    'Itraconazole'
                ],
                antiTB: [
                    'Ethambutol',
                    'Isoniazid',
                    'Pyrazinamide',
                    'Rifampicin',
                    'Streptomycin'
                ],
                vaccination: [
                    'Hepatitis B Vaccine',
                    'Influenza Vaccine'
                ]
            }
        }
    }
}
</script>

<style scoped>
</style>
