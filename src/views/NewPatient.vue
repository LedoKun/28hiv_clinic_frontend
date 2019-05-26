<template>
  <section>
    <p class="title is-4">New Patient</p>
    <p class="subtitle is-6">Add a new patient or select an exisiting one.</p>

    <div class="columns">
      <div class="column">
        <form @submit.prevent="formValidate">

          <b-field label="HN"
            :type="{'is-danger': errors.has('hn')}"
            :message="errors.first('hn')">
            <b-input v-model="formData.hn" name="hn" v-validate="'required'" data-vv-as="HN" />
          </b-field>

          <b-field label="Patient's Name"
            :type="{'is-danger': errors.has('name')}"
            :message="errors.first('name')">
            <b-input v-model="formData.name" name="name" v-validate="'required'" data-vv-as="patient's name" />
          </b-field>

          <b-field label="Sex"
            :type="{'is-danger': errors.has('sex')}"
            :message="errors.first('sex')">
            <b-select v-model="formData.sex" name="sex" placeholder="Select an option" v-validate="'required'" data-vv-as="sex" >
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
            </b-select>
          </b-field>

          <b-field label="Healthcare Scheme"
            :type="{'is-danger': errors.has('healthInsurance')}"
            :message="errors.first('healthInsurance')">
            <b-select v-model="formData.healthInsurance" name="healthInsurance" placeholder="Select an option" v-validate="'required'" data-vv-as="healthcare scheme" >
                <option value="ชำระเงินเอง">ชำระเงินเอง</option>
                <option value="ช่วงอายุ 12-59 ปี">ช่วงอายุ 12-59 ปี</option>
                <option value="ตรวจสุขภาพ">ตรวจสุขภาพ</option>
                <option value="ทหารผ่นศึกชั้น 4 ที่มีบัตรทหารผ่านศึก รวมถึงผู้ได้รับพระราชทานเหรียญชัยสมรภูมิ">ทหารผ่นศึกชั้น 4 ที่มีบัตรทหารผ่านศึก รวมถึงผู้ได้รับพระราชทานเหรียญชัยสมรภูมิ</option>
                <option value="ทหารผ่านศึกชั้น 1-3 ที่มีบัตรทหารผ่านศึก รวมถึงผู้ได้รับพระราชทาน">ทหารผ่านศึกชั้น 1-3 ที่มีบัตรทหารผ่านศึก รวมถึงผู้ได้รับพระราชทาน</option>
                <option value="ทหารเกณฑ์">ทหารเกณฑ์</option>
                <option value="นักเรียนมัธยมศึกษาตอนต้น">นักเรียนมัธยมศึกษาตอนต้น</option>
                <option value="บัตรทอง นอกเขต">บัตรทอง นอกเขต</option>
                <option value="บำบัดฟื้นฟูผู้ติดยาและสารเสพติด">บำบัดฟื้นฟูผู้ติดยาและสารเสพติด</option>
                <option value="บุคคลผู้พิการ">บุคคลผู้พิการ</option>
                <option value="บุคคลในครอบครัวของอาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.) อาสาสมัครสาธารณสุข">บุคคลในครอบครัวของอาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.) อาสาสมัครสาธารณสุข</option>
                <option value="บุคคลในครอบครัวทหารผ่านศึกชั้น 1 รวมถึงผู้ได้รับพระราชทานเหรียญสมรภูมิ">บุคคลในครอบครัวทหารผ่านศึกชั้น 1 รวมถึงผู้ได้รับพระราชทานเหรียญสมรภูมิ</option>
                <option value="บุคคลในครอบครัวทหารผ่านศึกชั้น 4 รวมถึงผู้ได้รับพระราชทานเหรียญสมรภูมิ">บุคคลในครอบครัวทหารผ่านศึกชั้น 4 รวมถึงผู้ได้รับพระราชทานเหรียญสมรภูมิ</option>
                <option value="ผู้ที่พำนักในสถานที่ภายใต้การดูแลของส่วนราชการ (สถานพินิจและสถานสงเคราะห์)">ผู้ที่พำนักในสถานที่ภายใต้การดูแลของส่วนราชการ (สถานพินิจและสถานสงเคราะห์)</option>
                <option value="ผู้ที่พำนักในสถานที่ภายใต้การดูแลของส่วนราชการ(ราชทัณฑ์)">ผู้ที่พำนักในสถานที่ภายใต้การดูแลของส่วนราชการ(ราชทัณฑ์)</option>
                <option value="ผู้มีรายได้น้อย">ผู้มีรายได้น้อย</option>
                <option value="ผู้มีอายุเกิน 60 ปีบริบูรณ์">ผู้มีอายุเกิน 60 ปีบริบูรณ์</option>
                <option value="ผู้ได้รับพระราชทานเหรียญราชการชายแดน">ผู้ได้รับพระราชทานเหรียญราชการชายแดน</option>
                <option value="พระภิกษุ สามเณร และแม่ชีในพระพุทธศาสนาซึ่งหนังสือสุทธิรับรอง">พระภิกษุ สามเณร และแม่ชีในพระพุทธศาสนาซึ่งหนังสือสุทธิรับรอง</option>
                <option value="สถานะคนต่างด้าว">สถานะคนต่างด้าว</option>
                <option value="สิทธิข้าราชการ/รัฐวิสาหกิจ (เบิกจ่ายตรง)">สิทธิข้าราชการ/รัฐวิสาหกิจ (เบิกจ่ายตรง)</option>
                <option value="สิทธิข้าราชการ/สิทธิรัฐวิสาหกิจ (ชำระเงินเอง)">สิทธิข้าราชการ/สิทธิรัฐวิสาหกิจ (ชำระเงินเอง)</option>
                <option value="สิทธิข้าราชการ/สิทธิรัฐวิสาหกิจ (ต้นสังกัด)">สิทธิข้าราชการ/สิทธิรัฐวิสาหกิจ (ต้นสังกัด)</option>
                <option value="สิทธิข้าราชการการเมือง/นักการเมือง">สิทธิข้าราชการการเมือง/นักการเมือง</option>
                <option value="สิทธิครูเอกชน">สิทธิครูเอกชน</option>
                <option value="สิทธิประกันสังคม (ชำระเงินเอง)">สิทธิประกันสังคม (ชำระเงินเอง)</option>
                <option value="สิทธิประกันสังคม (สำนักการแพทย์)">สิทธิประกันสังคม (สำนักการแพทย์)</option>
                <option value="สิทธิประกันสังคมกรณีทุพพลภาพ">สิทธิประกันสังคมกรณีทุพพลภาพ</option>
                <option value="สิทธิประกันสังคมและสิทธิข้าราชการ/สิทธิรัฐวิสาหกิจ">สิทธิประกันสังคมและสิทธิข้าราชการ/สิทธิรัฐวิสาหกิจ</option>
                <option value="สิทธิว่าง">สิทธิว่าง</option>
                <option value="สิทธิหลักประกันสุขภาพแห่งชาติ (ผู้ประกันตนคนพิการ)">สิทธิหลักประกันสุขภาพแห่งชาติ (ผู้ประกันตนคนพิการ)</option>
                <option value="สิทธิเบิกกรมบัญชีกลาง(ข้าราชการ กทม.)">สิทธิเบิกกรมบัญชีกลาง(ข้าราชการ กทม.)</option>
                <option value="สิทธิเบิกกรมบัญชีกลาง(บุคคลในครอบครัว)">สิทธิเบิกกรมบัญชีกลาง(บุคคลในครอบครัว)</option>
                <option value="สิทธิเบิกกรมบัญชีกลาง(บุคคลในครอบครัวผู้รับเบี้ยหวัดบำนาญ)">สิทธิเบิกกรมบัญชีกลาง(บุคคลในครอบครัวผู้รับเบี้ยหวัดบำนาญ)</option>
                <option value="สิทธิเบิกกรมบัญชีกลาง(ผู้รับเบี้ยหวัดบำนาญ)">สิทธิเบิกกรมบัญชีกลาง(ผู้รับเบี้ยหวัดบำนาญ)</option>
                <option value="สิทธิเบิกกรมบัญชีกลาง(ลูกจ้างประจำ)">สิทธิเบิกกรมบัญชีกลาง(ลูกจ้างประจำ)</option>
                <option value="สิทธิ์เบิกข้าราชการกรุงเทพมหานคร(ผู้รับเบี้ยหวัดบำนาญ)">สิทธิ์เบิกข้าราชการกรุงเทพมหานคร(ผู้รับเบี้ยหวัดบำนาญ)</option>
                <option value="ส่งเสริมสุขภาพ">ส่งเสริมสุขภาพ</option>
                <option value="อนุเคราะห์โดยสิทธิ์">อนุเคราะห์โดยสิทธิ์</option>
                <option value="อาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.) อาสาสมัครสาธารณสุข">อาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.) อาสาสมัครสาธารณสุข</option>
                <option value="เด็กอายุไม่เกิน 12 ปีบริบูรณ์">เด็กอายุไม่เกิน 12 ปีบริบูรณ์</option>
            </b-select>
          </b-field>

          <div class="buttons is-pulled-right">
            <button
              type="submit"
              class="button is-primary"
            >Add New Patient</button>
          </div>
        </form>

      </div>
    </div>
  </section>
</template>

<script>
import http from '@/utils/http/http.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'

export default {
  name: 'NewPatient',
  components: {},
  mounted: function () {
    // set defaults values for the form
    this.setDefault()
  },
  methods: {
    formValidate () {
      let self = this

      this.$validator.validateAll().then((result) => {
        if (result) {
          self.handleSubmit()
        } else {
          commonErrorToast('Form is not valid! Please check the fields.')
        }
      })
    },
    handleSubmit () {
      let self = this
      let url = this.$config['APIPath'] + '/patient/'

      self.backendFormErrors = []

      http({
        url: url,
        data: self.formData,
        method: 'post'
      })
        .then(function (response) {
          self.$router.push({
            name: 'PatientSummary',
            params: {
              id: response.data.id
            }
          })
        })
        .catch(function (error) {
          if (error.response.status === 422) {
            let backendErrors = error.response.data.message

            self.$_.forEach(backendErrors, function (value, key) {
              self.$validator.errors.add({
                field: key,
                msg: value,
                rule: 'backend'
              })
            })

            commonErrorToast('Form is not valid! Please check the fields.')
          } else {
            commonErrorToast()
          }
        })
    },
    setDefault () {
      this.formData = {
        hn: null,
        name: null,
        sex: null,
        healthInsurance: null
      }

      this.$validator.errors.clear()
    }
  },
  data: () => {
    return {
      formData: {}
    }
  }
}
</script>

<style scoped>
.buttons {
  margin-top: 1.25rem;
}
</style>
