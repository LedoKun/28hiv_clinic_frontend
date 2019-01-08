<template>
<b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
            แก้ไขข้อมูลผู้ป่วย
        </p>
        <a class="card-header-icon">
            <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
        </a>
    </div>
    <!-- form -->
    <form
        @submit.prevent="saveForm"
        id="PatientInfoForm"
    >

        <div class="card-content">
            <div class="content">

                <div class="columns">
                    <!-- hn -->
                    <div class="column">
                        <b-field
                            label="HN *"
                            :type="{'is-danger': errors.has('hn')}"
                            :message="errors.first('hn')"
                            custom-class="is-small"
                        >
                            <b-input size="is-small" v-model="data.hn" name="hn" v-validate="'required|min:2'" :disabled="isDataInBackend" />
                        </b-field>
                    </div>
                    <!-- / hn -->

                    <!-- gid -->
                    <div class="column">
                        <b-field
                            label="รหัสบัตรประชาชน / พาสปอร์ต"
                            :type="{'is-danger': errors.has('gid')}"
                            :message="errors.first('gid')"
                            custom-class="is-small"
                        >
                            <b-input size="is-small" v-model="data.gid" name="gid" v-validate="'min:2'" />
                        </b-field>
                    </div>
                    <!-- / gid -->

                    <!-- cid -->
                    <div class="column">
                        <b-field
                            label="รหัสขึ้นทะเบียนคลินิก"
                            :type="{'is-danger': errors.has('cid')}"
                            :message="errors.first('cid')"
                            custom-class="is-small"
                        >
                            <b-input size="is-small" v-model="data.cid" name="cid" v-validate="'min:2'" />
                        </b-field>
                    </div>
                    <!-- / cid -->

                    <!-- nap -->
                    <div class="column">
                        <b-field
                            label="NAP"
                            :type="{'is-danger': errors.has('nap')}"
                            :message="errors.first('nap')"
                            custom-class="is-small"
                        >
                            <b-input size="is-small" v-model="data.nap" name="nap" v-validate="'min:2'" />
                        </b-field>
                    </div>
                    <!-- / nap -->
                </div>

                <div class="columns">
                    <!-- name -->
                    <div class="column">
                        <b-field
                            label="ชื่อ *"
                            :type="{'is-danger': errors.has('name')}"
                            :message="errors.first('name')"
                            custom-class="is-small"
                        >
                            <b-input size="is-small" v-model="data.name" name="name" v-validate="'required|min:2'" />
                        </b-field>
                    </div>
                    <!-- / name -->

                    <!-- dob -->
                    <div class="column">
                        <b-field
                            label="วัน / เดือน / ปี เกิด *"
                            custom-class="is-small"
                            :type="{'is-danger': errors.has('dob')}"
                            :message="errors.first('dob')"
                        >
                            <b-datepicker
                                placeholder="เลือกวัน..."
                                icon="calendar-today"
                                size="is-small"
                                v-model="data.dob"
                                name="dob"
                                :max-date="new Date()"
                                v-validate="'required'"
                                editable
                            >
                            </b-datepicker>
                        </b-field>
                    </div>
                    <!-- / dob -->

                    <!-- sex -->
                    <div class="column">
                        <b-field
                            label="เพศ *"
                            custom-class="is-small"
                            :type="{'is-danger': errors.has('sex')}"
                            :message="errors.first('sex')"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.sex"
                                size="is-small"
                                name="sex"
                                v-validate="'required'"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in selectOptions.sexes"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / sex -->

                    <!-- gender -->
                    <div class="column">
                        <b-field
                            label="Gender"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.gender"
                                size="is-small"
                                name="gender"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in selectOptions.genders"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / gender -->

                    <!-- marital -->
                    <div class="column">
                        <b-field
                            label="สถานภาพสมรส"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.marital"
                                size="is-small"
                                name="marital"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in selectOptions.marital"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / marital -->
                </div>

                <div class="columns">
                    <!-- nationality -->
                    <!-- todo: server side search -->
                    <div class="column">
                        <b-field
                            label="สัญชาติ *"
                            custom-class="is-small"
                            :type="{'is-danger': errors.has('nationality')}"
                            :message="errors.first('nationality')"
                        >
                            <!-- replace with autocomplete -->
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.nationality"
                                size="is-small"
                                name="nationality"
                                v-validate="'required'"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in selectOptions.nationalities"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / nationality -->

                    <!-- payer -->
                    <div class="column">
                        <b-field
                            label="สิทธ์การรักษา *"
                            custom-class="is-small"
                            :type="{'is-danger': errors.has('payer')}"
                            :message="errors.first('payer')"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.payer"
                                size="is-small"
                                name="payer"
                                v-validate="'required'"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in selectOptions.payer"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / payer -->

                    <!-- isRefer -->
                    <div class="column">
                        <b-field
                            label="การส่งตัวผู้ป่วย *"
                            custom-class="is-small"
                            :type="{'is-danger': errors.has('isRefer')}"
                            :message="errors.first('isRefer')"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.isRefer"
                                size="is-small"
                                name="isRefer"
                                v-validate="'required'"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in selectOptions.isRefer"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / isRefer -->

                    <!-- referFrom -->
                    <div class="column">
                        <b-field
                            label="ผู้ป่วยถูกส่งตัวจาก"
                            :type="{'is-danger': errors.has('referFrom')}"
                            :message="errors.first('referFrom')"
                            custom-class="is-small"
                        >
                            <b-input size="is-small" v-model="data.referFrom" name="referFrom" v-validate="'min:2'" />
                        </b-field>
                    </div>
                    <!-- / referFrom -->

                    <!-- education -->
                    <div class="column">
                        <b-field
                            label="ระดับการศึกษา"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.education"
                                size="is-small"
                                name="education"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in selectOptions.education"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / education -->

                </div>

                <div class="columns">
                    <!-- tel -->
                    <div class="column">
                        <b-field
                            label="โทรศัพท์"
                            custom-class="is-small"
                        >
                            <b-taginput
                                size="is-small"
                                v-model="data.tel"
                                ellipsis
                                icon="label"
                                placeholder="เพิ่มเบอร์โทร...">
                            </b-taginput>
                        </b-field>
                    </div>
                    <!-- / tel -->

                    <!-- relative_tel -->
                    <div class="column">
                        <b-field
                            label="โทรศัพท์ญาติ"
                            custom-class="is-small"
                        >
                            <b-taginput
                                size="is-small"
                                v-model="data.relative_tel"
                                ellipsis
                                icon="label"
                                placeholder="เพิ่มเบอร์โทร...">
                            </b-taginput>
                        </b-field>
                    </div>
                    <!-- / relative_tel -->

                    <!-- address -->
                    <div class="column">
                        <b-field
                            label="ที่อยู่"
                            custom-class="is-small"
                        >
                            <b-input size="is-small" rows="2" v-model="data.address" maxlength="200" type="textarea" />
                        </b-field>
                    </div>
                    <!-- / address -->
                </div>

            </div>
        </div>

    </form>
    <!-- / form -->

    <div class="card-footer">
        <a
            v-if="isDataInBackend === true"
            class="card-footer-item has-text-danger"
            @click="confirmDelete"
        >
            ลบผู้ป่วยออกจากระบบ
        </a>
        <a
            class="card-footer-item"
            @click="saveForm"
        >
            บันทึกข้อมูล
        </a>
    </div>
</b-collapse>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { mapFields } from 'vuex-map-fields'
import { getNames } from 'country-list'
import { mapActions } from 'vuex'

Vue.use(VeeValidate, {
    events: ''
})

export default {
    name: 'PatientForm',
    computed: {
        ...mapFields('Patient', [
            'data',
            'isDataInBackend'
        ])
    },
    methods: {
        ...mapActions('Patient', [
            'setDefaultAction',
            'submitAction',
            'deleteAction'
        ]),
        confirmDelete () {
            let self = this

            self.$dialog.confirm({
                title: 'ลบผู้ป่วยออกจากระบบ',
                message: 'ยืนยันการ<b>ลบ</b>ผู้ป่วยออกจากระบบ',
                confirmText: 'ลบผู้ป่วยออกจากระบบ',
                cancelText: 'ยกเลิก',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: async () => {
                    try {
                        await self.deleteAction()

                        self.$toast.open({
                            message: 'ลบผู้ป่วยออกจากระบบแล้ว',
                            type: 'is-success',
                            position: 'is-bottom'
                        })

                        self.setDefaultAction()
                        self.errors.clear()
                    } catch (error) {
                        // error
                    }
                }
            })
        },
        saveForm () {
            let self = this
            self.$validator.validateAll().then(async (result) => {
                if (result) {
                    try {
                        await self.submitAction()

                        self.$toast.open({
                            message: 'Patient Data Saved!',
                            type: 'is-success',
                            position: 'is-bottom'
                        })
                        self.isDataInBackend = true
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
                // something must have gone wrong
            })

        }
    },
    data: function () {
        return {
            selectOptions: {
                nationalities: getNames(),
                sexes: [
                    'ชาย',
                    'หญิง',
                    '-'
                ],
                genders: [
                    '',
                    'Heterosexual',
                    'Homosexual',
                    'Bisexual',
                    '-'
                ],
                marital: [
                    '',
                    'โสด',
                    'สมรส',
                    'ม่าย',
                    'หย่า',
                    '-'
                ],
                education: [
                    '',
                    'ต่ำกว่ามัธยมศึกษาตอนปลาย',
                    'มัธยมศึกษาตอนปลาย',
                    'ปวช/ปวส',
                    'ปริญญาตรี',
                    'ปริญญาโท',
                    'ปริญญาเอก',
                    '-'
                ],
                payer: [
                    'ประกันสุขภาพทั่วหน้า',
                    'ประกันสุขภาพทั่วหน้า นอกเขต',
                    'ประกันสังคม',
                    'ประกันสังคมต่าง รพ.',
                    'ข้าราชการ/จ่ายตรง',
                    'ต่างด้าว',
                    'ชำระเงิน'
                ],
                isRefer: [
                    '',
                    'ผู้ป่วยใหม่',
                    'ผู้ป่วยรับโอน (ยังไม่เริ่ม ARV)',
                    'ผู้ป่วยรับโอน (เริ่ม ARV แล้ว)'
                ]
            }
        }
    }
}
</script>

<style scoped>
</style>
