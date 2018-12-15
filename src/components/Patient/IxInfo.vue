<template>
<b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
            Add Investigation Results
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
                @submit.prevent="validateData"
                id="LabInfoForm"
            >
                <div class="columns">
                    <!-- date -->
                    <div class="column">
                        <b-field
                            label="Investigation Date *"
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

                    <!-- antiHIV -->
                    <div class="column">
                        <b-field
                            label="Anti-HIV"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.antiHIV"
                                size="is-small"
                                name="antiHIV"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / antiHIV -->

                    <!-- cd4 -->
                    <div class="column">
                        <b-field
                            label="CD4"
                            :type="{'is-danger': errors.has('cd4')}"
                            :message="errors.first('cd4')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                step="1"
                                size="is-small"
                                min="0"
                                v-model="data.cd4"
                                name="cd4"
                                v-validate="'numeric|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / cd4 -->

                    <!-- pCD4 -->
                    <div class="column">
                        <b-field
                            label="%CD4"
                            :type="{'is-danger': errors.has('pCD4')}"
                            :message="errors.first('pCD4')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                icon="percent"
                                step="0.01"
                                size="is-small"
                                min="0.0"
                                v-model="data.pCD4"
                                name="pCD4"
                                v-validate="'decimal|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / pCD4 -->

                    <!-- vl -->
                    <div class="column">
                        <b-field
                            label="VL (0, if undetectable)"
                            :type="{'is-danger': errors.has('vl')}"
                            :message="errors.first('vl')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.01"
                                size="is-small"
                                min="0.0"
                                v-model="data.vl"
                                name="vl"
                                v-validate="'numeric|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / vl -->

                </div>

                <div class="columns">

                    <!-- vdrl -->
                    <div class="column">
                        <b-field
                            label="VDRL"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.vdrl"
                                size="is-small"
                                name="vdrl"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / vdrl -->

                    <!-- rpr -->
                    <div class="column">
                        <b-field
                            label="RPR"
                            :type="{'is-danger': errors.has('rpr')}"
                            :message="errors.first('rpr')"
                            custom-class="is-small"
                        >
                            <div class="field has-addons">
                                <p class="control">
                                    <a class="button is-static is-small">
                                        1 :
                                    </a>
                                </p>
                                <p class="control full-width-input">
                                    <b-input
                                        type="number"
                                        placeholder="0"
                                        step="1"
                                        size="is-small"
                                        min="0"
                                        v-model="data.rpr"
                                        name="rpr"
                                        v-validate="'numeric|min_value:0'"
                                    />
                                </p>
                            </div>
                        </b-field>
                    </div>
                    <!-- / rpr -->

                    <!-- HBsAg -->
                    <div class="column">
                        <b-field
                            label="HBsAg"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.hbsag"
                                size="is-small"
                                name="hbsag"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / HBsAg -->

                    <!-- antiHBs -->
                    <div class="column">
                        <b-field
                            label="Anti-HBs"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.antiHBs"
                                size="is-small"
                                name="antiHBs"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / antiHBs -->

                    <!-- antiHCV -->
                    <div class="column">
                        <b-field
                            label="Anti-HCV"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.antiHCV"
                                size="is-small"
                                name="antiHCV"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / antiHCV -->

                </div>

                <div class="columns">

                    <!-- ppd -->
                    <div class="column is-2">
                        <b-field
                            label="PPD (mm)"
                            :type="{'is-danger': errors.has('ppd')}"
                            :message="errors.first('ppd')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                step="1"
                                size="is-small"
                                min="0"
                                v-model="data.ppd"
                                name="ppd"
                                v-validate="'numeric|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / ppd -->

                    <!-- cxr -->
                    <div class="column is-4">
                        <b-field
                            label="CXR"
                            :type="{'is-danger': errors.has('cxr')}"
                            :message="errors.first('cxr')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="text"
                                size="is-small"
                                v-model="data.cxr"
                                name="cxr"
                                v-validate="'min:2'"
                            />
                        </b-field>
                    </div>
                    <!-- / cxr -->

                    <!-- tb -->
                    <div class="column">
                        <b-field
                            label="Tuberculosis Laboratory Results"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.tb"
                                size="is-small"
                                name="tb"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.tbResult"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / tb -->

                    <!-- hivResistence -->
                    <div class="column is-4">
                        <b-field
                            label="HIV Resistence Rreport"
                            :type="{'is-danger': errors.has('hivResistence')}"
                            :message="errors.first('hivResistence')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="text"
                                size="is-small"
                                v-model="data.hivResistence"
                                name="hivResistence"
                                v-validate="'min:2'"
                            />
                        </b-field>
                    </div>
                    <!-- / hivResistence -->

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
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

Vue.use(VeeValidate, {
    events: ''
})

export default {
    name: 'IxInfo',
    computed: {
        ...mapFields('Investigation', [
            'data'
        ])
    },
    methods: {
        ...mapActions('Investigation', [
            'setDefaultAction',
            'submitAction',
            'loadAction'
        ]),
        confirmReset () {
            this.$dialog.confirm({
                title: 'Reseting Investigation Result Form',
                message: 'Are you sure you want to <b>reset</b> this investigation result form?',
                confirmText: 'Reset Form',
                cancelText: 'Cancel',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    document.getElementById('LabInfoForm').reset()
                    this.$toast.open('Form Reseted!')
                }
            })
        },
        validateData () {
            let self = this
            self.$validator.validateAll().then(async (result) => {
                if (result) {
                    try {
                        await self.submitAction()

                        self.$toast.open({
                            message: 'Investigation Result Saved!',
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
            IxOptions: {
                positiveAndNegative: [
                    '+ ve',
                    '- ve',
                    '?'
                ],
                tbResult: [
                    'AFB +',
                    'Culture + for MTB',
                    'GeneXpert + for MTB',
                    'GeneXpert + for Rifampicin Resistance MTB',
                    'Negative'
                ]
            }
        }
    }
}
</script>

<style scoped>
.full-width-input {
    width: 100%;
}
</style>
