<template>
<section v-if="isReady">
    <p class="title is-4">Patient Dermographic</p>
    <p class="subtitle is-6">Edit patient's information here.</p>

    <div class="level">
      <div class="level-left">
        <div class="buttons">
          <b-button
            type="is-link"
            @click="goBack()">
            Go Back
          </b-button>
        </div>
      </div>

      <div class="level-right">
        <div class="buttons level-item">
          <b-button type="is-danger">Delete This Patient</b-button>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <form v-on:submit.prevent="formValidate">

          <b-field label="Clinic ID"
            :type="{'is-danger': errors.has('clinicID')}"
            :message="errors.first('clinicID')">
            <b-input v-model="formData.clinicID" name="clinicID" data-vv-as="Clinic ID" />
          </b-field>

          <b-field label="HN"
            :type="{'is-danger': errors.has('hn')}"
            :message="errors.first('hn')">
            <b-input v-model="formData.hn" name="hn" v-validate="'required'" data-vv-as="HN" />
          </b-field>

          <b-field label="Government ID"
            :type="{'is-danger': errors.has('governmentID')}"
            :message="errors.first('governmentID')">
            <b-input v-model="formData.governmentID" name="governmentID" data-vv-as="Government ID" />
          </b-field>

          <b-field label="NAP ID"
            :type="{'is-danger': errors.has('napID')}"
            :message="errors.first('napID')">
            <b-input v-model="formData.napID" name="napID" data-vv-as="NAP ID" />
          </b-field>

          <b-field label="Patient's Name"
            :type="{'is-danger': errors.has('name')}"
            :message="errors.first('name')">
            <b-input v-model="formData.name" name="name" v-validate="'required'" data-vv-as="patient's name" />
          </b-field>

          <b-field label="Date Of Birth"
            :type="{'is-danger': errors.has('dateOfBirth')}"
            :message="errors.first('dateOfBirth')">
            <b-datepicker
              v-model="formData.dateOfBirth"
              name="dateOfBirth"
              v-validate="'required|date_format:dd/MM/yyyy'"
              data-vv-as="date of birth"
              editable />
          </b-field>

          <b-field label="Sex"
            :type="{'is-danger': errors.has('sex')}"
            :message="errors.first('sex')">
            <b-select v-model="formData.sex" name="sex" placeholder="Select an option" v-validate="'required'" data-vv-as="sex" >
                <option value="">Select an option</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="หญิง">อื่นๆ</option>
            </b-select>
          </b-field>

          <b-field label="Gender"
            :type="{'is-danger': errors.has('gender')}"
            :message="errors.first('gender')">
            <b-select v-model="formData.gender" name="gender" placeholder="Select an option" data-vv-as="gender" >
                <option value="">Select an option</option>
                <option value="Homosexual">Homosexual</option>
                <option value="Heterosexual">Heterosexual</option>
                <option value="Bisexual">Bisexual</option>
                <option value="Transgender">Transgender</option>
                <option value="Undisclosed">Undisclosed</option>
            </b-select>
          </b-field>

          <b-field label="Marital Status"
            :type="{'is-danger': errors.has('maritalStatus')}"
            :message="errors.first('maritalStatus')">
            <b-select v-model="formData.maritalStatus" name="maritalStatus" placeholder="Select an option" data-vv-as="marital status" >
                <option value="">Select an option</option>
                <option value="โสด">โสด</option>
                <option value="คู่">คู่</option>
                <option value="หม้าย">หม้าย</option>
                <option value="หย่า">หย่า</option>
                <option value="แยก">แยก</option>
                <option value="สมณะ">สมณะ</option>
                <option value="ไม่ทราบ">ไม่ทราบ</option>
            </b-select>
          </b-field>

          <b-field label="Nationality"
            :type="{'is-danger': errors.has('nationality')}"
            :message="errors.first('nationality')">
            <b-select v-model="formData.nationality" name="nationality" placeholder="Select an option" v-validate="'required'" data-vv-as="nationality" >
              <option value="">Select an option</option>
              <option value="ไม่ระบุ">ไม่ระบุ</option>
              <option value="ไร้สัญชาติ">ไร้สัญชาติ</option>
              <option value="ชาวเขาที่ไม่ได้สัญชาติไทย">ชาวเขาที่ไม่ได้สัญชาติไทย</option>
              <option value="ไม่ได้สัญชาตไทย ตาม ปว.337">ไม่ได้สัญชาตไทย ตาม ปว.337</option>
              <option value="กัมพูชา">กัมพูชา</option>
              <option value="พม่า">พม่า</option>
              <option value="ลาว">ลาว</option>
              <option value="เวียดนาม">เวียดนาม</option>
              <option value="ไทย">ไทย</option>
              <option value="ไทยลื้อ">ไทยลื้อ</option>
              <option value="ไทยใหญ่">ไทยใหญ่</option>
              <option value="กรีก">กรีก</option>
              <option value="กะเหรี่ยง">กะเหรี่ยง</option>
              <option value="คานาดา">คานาดา</option>
              <option value="คิวบา">คิวบา</option>
              <option value="คูเวต">คูเวต</option>
              <option value="จีน">จีน</option>
              <option value="จีน(ฮ่องกง)">จีน(ฮ่องกง)</option>
              <option value="จีน(ไต้หวัน)">จีน(ไต้หวัน)</option>
              <option value="จีนฮ่อ">จีนฮ่อ</option>
              <option value="ชิลี">ชิลี</option>
              <option value="ซาอุดิอารเบีย">ซาอุดิอารเบีย</option>
              <option value="ซีเรีย">ซีเรีย</option>
              <option value="ญี่ปุ่น">ญี่ปุ่น</option>
              <option value="ดัตช์">ดัตช์</option>
              <option value="ดูไบ">ดูไบ</option>
              <option value="ตุรกี">ตุรกี</option>
              <option value="ตูนีเซีย">ตูนีเซีย</option>
              <option value="ทาจิก">ทาจิก</option>
              <option value="นอร์เวย์">นอร์เวย์</option>
              <option value="นิวซีแลนด์">นิวซีแลนด์</option>
              <option value="บราซิล">บราซิล</option>
              <option value="บริติช">บริติช</option>
              <option value="บรูไน">บรูไน</option>
              <option value="บังกาเรีย">บังกาเรีย</option>
              <option value="บังคลาเทศ">บังคลาเทศ</option>
              <option value="บาร์บาดอส">บาร์บาดอส</option>
              <option value="ปอร์ตุเกส">ปอร์ตุเกส</option>
              <option value="ปากีสถาน">ปากีสถาน</option>
              <option value="ปานามา">ปานามา</option>
              <option value="ฝรั่งเศส">ฝรั่งเศส</option>
              <option value="ฟินแลนด์">ฟินแลนด์</option>
              <option value="ฟิลิปปินส์">ฟิลิปปินส์</option>
              <option value="มอญ">มอญ</option>
              <option value="มอลต้า">มอลต้า</option>
              <option value="มาเลเซีย">มาเลเซีย</option>
              <option value="ยูดาน">ยูดาน</option>
              <option value="ยูโกสลาเวีย">ยูโกสลาเวีย</option>
              <option value="รัสเซีย">รัสเซีย</option>
              <option value="รูเมเนีย">รูเมเนีย</option>
              <option value="ลักเซมเบอร์ก">ลักเซมเบอร์ก</option>
              <option value="ลั๊ว">ลั๊ว</option>
              <option value="วาติกัน">วาติกัน</option>
              <option value="ศรีลังกา">ศรีลังกา</option>
              <option value="สวีสเซอร์แลนด์">สวีสเซอร์แลนด์</option>
              <option value="สวีเดน">สวีเดน</option>
              <option value="สิงคโปร์">สิงคโปร์</option>
              <option value="สเปน">สเปน</option>
              <option value="ออสเตรีย">ออสเตรีย</option>
              <option value="ออสเตรเลีย">ออสเตรเลีย</option>
              <option value="อังกฤษ">อังกฤษ</option>
              <option value="อัลบาเนีย">อัลบาเนีย</option>
              <option value="อาฟริกาใต้">อาฟริกาใต้</option>
              <option value="อาร์เจนตินา">อาร์เจนตินา</option>
              <option value="อาหรับ">อาหรับ</option>
              <option value="อิตาลี">อิตาลี</option>
              <option value="อินเดีย">อินเดีย</option>
              <option value="อินโดนีเซีย">อินโดนีเซีย</option>
              <option value="อิรัค">อิรัค</option>
              <option value="อิสราเอล">อิสราเอล</option>
              <option value="อิหร่าน (เปอร์เซีย)">อิหร่าน (เปอร์เซีย)</option>
              <option value="อีคัวดอร์">อีคัวดอร์</option>
              <option value="อียิปต์">อียิปต์</option>
              <option value="อุรุกวัย">อุรุกวัย</option>
              <option value="อเมริกา">อเมริกา</option>
              <option value="ฮังการี">ฮังการี</option>
              <option value="เกาหลี">เกาหลี</option>
              <option value="เกาหลีเหนือ">เกาหลีเหนือ</option>
              <option value="เกาหลีใต้">เกาหลีใต้</option>
              <option value="เคนยา">เคนยา</option>
              <option value="เชคโกสโลวาเกีย">เชคโกสโลวาเกีย</option>
              <option value="เซนต์วินเซนต์และเกรนาดีนส์">เซนต์วินเซนต์และเกรนาดีนส์</option>
              <option value="เดนมาร์ก">เดนมาร์ก</option>
              <option value="ตุรกี">ตุรกี</option>
              <option value="เนปาล">เนปาล</option>
              <option value="เนเธอร์แลนด์">เนเธอร์แลนด์</option>
              <option value="เบลเยี่ยม">เบลเยี่ยม</option>
              <option value="เปรู">เปรู</option>
              <option value="เปอร์โตริโก้">เปอร์โตริโก้</option>
              <option value="เม็กซิโก">เม็กซิโก</option>
              <option value="เยอรมัน">เยอรมัน</option>
              <option value="เลบานอน">เลบานอน</option>
              <option value="เวเนสุเอล่า">เวเนสุเอล่า</option>
              <option value="เอธิโอเปีย">เอธิโอเปีย</option>
              <option value="แทนซาเนีย">แทนซาเนีย</option>
              <option value="โคลัมเบีย">โคลัมเบีย</option>
              <option value="โดมินิกัน">โดมินิกัน</option>
              <option value="โตโก">โตโก</option>
              <option value="โปแลนด์">โปแลนด์</option>
              <option value="ไซปรัส">ไซปรัส</option>
              <option value="ไต้หวัน">ไต้หวัน</option>
              <option value="ไนจีเรีย">ไนจีเรีย</option>
              <option value="ไลบีเรีย">ไลบีเรีย</option>
              <option value="ไอร์แลนด์">ไอร์แลนด์</option>
              <option value="อื่น ๆ">อื่น ๆ</option>
            </b-select>
          </b-field>

          <b-field label="Occupation"
            :type="{'is-danger': errors.has('occupation')}"
            :message="errors.first('occupation')">
            <b-select v-model="formData.occupation" name="occupation" placeholder="Select an option" data-vv-as="occupation" >
                <option value="">Select an option</option>
                <option value="Farmer">Farmer</option>
                <option value="Civil servant">Civil servant</option>
                <option value="Commercial sex worker">Commercial sex worker</option>
                <option value="Student">Student</option>
                <option value="Fisherman">Fisherman</option>
                <option value="Factory worker">Factory worker</option>
                <option value="State enterprise employee">State enterprise employee</option>
                <option value="Company employee">Company employee</option>
                <option value="Monk">Monk</option>
                <option value="Government employee">Government employee</option>
                <option value="Healthcare Provider">Healthcare Provider</option>
                <option value="Laborer">Laborer</option>
                <option value="Full-time worker/part-time worker">Full-time worker/part-time worker</option>
                <option value="Unemployed">Unemployed</option>
                <option value="ไม่ทราบ">ไม่ทราบ</option>
            </b-select>
          </b-field>

          <b-field label="Education"
            :type="{'is-danger': errors.has('education')}"
            :message="errors.first('education')">
            <b-select v-model="formData.education" name="education" placeholder="Select an option" data-vv-as="education" >
                <option value="">Select an option</option>
                <option value="Illiterate">Illiterate</option>
                <option value="Primary school">Primary school</option>
                <option value="Lower secondary school">Lower secondary school</option>
                <option value="Upper secondary school/vocational school">Upper secondary school/vocational school</option>
                <option value="Bachelor degree">Bachelor degree</option>
                <option value="Graduate school">Graduate school</option>
                <option value="ไม่ทราบ">ไม่ทราบ</option>
            </b-select>
          </b-field>

          <b-field label="Healthcare Scheme"
            :type="{'is-danger': errors.has('healthInsurance')}"
            :message="errors.first('healthInsurance')">
            <b-select v-model="formData.healthInsurance" name="healthInsurance" placeholder="Select an option" v-validate="'required'" data-vv-as="healthcare scheme" >
                <option value="">Select an option</option>
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

          <b-field label="Phone Numbers"
            :type="{'is-danger': errors.has('phoneNumbers')}"
            :message="errors.first('phoneNumbers')">
              <b-taginput
                v-model="formData.phoneNumbers"
                icon="label"
                placeholder="Add a phone number"
                name="phoneNumbers"
                data-vv-as="phone numbers" />
          </b-field>

          <b-field label="Relative Phone Numbers"
            :type="{'is-danger': errors.has('relativePhoneNumbers')}"
            :message="errors.first('relativePhoneNumbers')">
              <b-taginput
                v-model="formData.relativePhoneNumbers"
                icon="label"
                placeholder="Add a phone number"
                name="relativePhoneNumbers"
                data-vv-as="relative phone numbers" />
          </b-field>

          <b-field label="Referral Status"
            :type="{'is-danger': errors.has('referralStatus')}"
            :message="errors.first('referralStatus')">
            <b-select v-model="formData.referralStatus" name="referralStatus" placeholder="Select an option" v-validate="'required'" data-vv-as="referral status" >
                <option value="">Select an option</option>
                <option value="Referred, ART-naïve">Referred, ART-naïve</option>
                <option value="Referred, currently on ART">Referred, currently on ART</option>
                <option value="Referred, previously on ART but discontinued">Referred, previously on ART but discontinued</option>
                <option value="New, ART-naïve">New, ART-naïve</option>
                <option value="New, previously on PrEP">New, previously on PrEP</option>
                <option value="ไม่ทราบ">ไม่ทราบ</option>
            </b-select>
          </b-field>

          <b-field label="Referred From"
            :type="{'is-danger': errors.has('referredFrom')}"
            :message="errors.first('referredFrom')">

            <b-autocomplete
                v-model="formData.referredFrom"
                ref="referredFrom"
                :data="referredFromData"

                field="referredFrom"
                :loading="isFetching"
                @keyup.native="getSearchHits ('referredFrom')"
                :clear-on-select="false"
                id="referredFromSearchBox"
                expanded
                :keep-first="true"
            />
          </b-field>

          <b-field label="Patient Status"
            :type="{'is-danger': errors.has('patientStatus')}"
            :message="errors.first('patientStatus')">
            <b-select v-model="formData.patientStatus" name="patientStatus" placeholder="Select an option" v-validate="'required'" data-vv-as="patient status" >
                <option value="">Select an option</option>
                <option value="เข้ารับการรักษาและรับยาต่อเนื่อง">เข้ารับการรักษาและรับยาต่อเนื่อง</option>
                <option value="รับยาเท่านั้น">รับยาเท่านั้น</option>
                <option value="หยุดยา ARV">หยุดยา ARV</option>
                <option value="ขาดการติดต่อ">ขาดการติดต่อ</option>
                <option value="ถูกส่งกลับประเทศ">ถูกส่งกลับประเทศ</option>
                <option value="ส่งต่อไปรับยาที่สถานพยาบาลในต่างประเทศ">ส่งต่อไปรับยาที่สถานพยาบาลในต่างประเทศ</option>
                <option value="ส่งต่อไปรับยาที่สถานพยาบาลในประเทศ">ส่งต่อไปรับยาที่สถานพยาบาลในประเทศ</option>
                <option value="เสียชีวิต">เสียชีวิต</option>
                <option value="ไม่ทราบ">ไม่ทราบ</option>
            </b-select>
          </b-field>

          <b-field label="Referred Out To"
            :type="{'is-danger': errors.has('referredOutTo')}"
            :message="errors.first('referredOutTo')">

            <b-autocomplete
                v-model="formData.referredOutTo"
                ref="referredOutTo"
                :data="referredOutToData"

                field="referredOutTo"
                :loading="isFetching"
                @keyup.native="getSearchHits ('referredOutTo')"
                :clear-on-select="false"
                id="referredOutToSearchBox"
                expanded
                :keep-first="true"
            />

            <!-- <b-input v-model="formData.referredOutTo" name="referredOutTo" data-vv-as="referred out to" /> -->
          </b-field>

          <div class="field">
            <b-field label="HIV Transmission Risk Behaviors"
              :type="{'is-danger': errors.has('riskBehaviors')}"
              :message="errors.first('riskBehaviors')">
            </b-field>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Blood Transfusion">
                  Blood Transfusion
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Needle-Sharing During Injection Drug Use">
                  Needle-Sharing During Injection Drug Use
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Percutaneous (Needle-Stick)">
                  Percutaneous (Needle-Stick)
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Receptive Anal Intercourse">
                  Receptive Anal Intercourse
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Insertive Anal Intercourse">
                  Insertive Anal Intercourse
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Receptive Penile-Vaginal Intercourse">
                  Receptive Penile-Vaginal Intercourse
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Insertive Penile-Vaginal Intercourse">
                  Insertive Penile-Vaginal Intercourse
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Receptive Oral Intercourse">
                  Receptive Oral Intercourse
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Insertive Oral Intercourse">
                  Insertive Oral Intercourse
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Biting">
                  Biting
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Spitting">
                  Spitting
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Throwing Body Fluids (Including Semen or Saliva)">
                  Throwing Body Fluids (Including Semen or Saliva)
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Multiple Parters / Polygamy">
                  Multiple Parters / Polygamy
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Sex Worker">
                  Sex Worker
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.riskBehaviors"
                  native-value="Mother-to-Child Transmission / Breastfeeding">
                  Mother-to-Child Transmission / Breastfeeding
              </b-checkbox>
            </div>
          </div>

          <div class="buttons is-pulled-right">
            <button
              type="submit"
              class="button is-primary"
            >Save</button>

          </div>
        </form>
      </div>
    </div>
</section>
</template>

<script>
import fetchData from '@/utils/http/fetchData.js'
import http from '@/utils/http/http.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'

export default {
  name: 'PatientDermographic',
  components: {},
  created () {
    this.setDefault()
    this.getData()

    this.getSearchHits = this.$_.debounce(this.getSearchHits, this.$config['globalDebounceWait'])
  },
  methods: {
    setDefault () {
      this.formData = {
        clinicID: null,
        hn: null,
        governmentID: null,
        napID: null,
        name: null,
        dateOfBirth: null,
        sex: null,
        gender: null,
        maritalStatus: null,
        nationality: null,
        healthInsurance: null,
        phoneNumbers: [],
        relativePhoneNumbers: [],
        referralStatus: null,
        referredFrom: null,
        patientStatus: null,
        referredOutTo: null,
        riskBehaviors: []
      }

      this.$validator.errors.clear()

      this.referredFromData = []
      this.referredOutToData = []
    },
    goBack () {
      this.$router.push({
        name: 'PatientSummary',
        params: {
          id: this.$route.params.id
        }
      })
    },
    async getSearchHits (fieldName) {
      let keyword = null

      if (fieldName === 'referredFrom') {
        keyword = this.formData.referredFrom
        this.referredFromData = []
      } else {
        keyword = this.formData.referredOutTo
        this.referredOutToData = []
      }

      if (!keyword || !this.isReady) {
        return
      }

      this.isFetching = true

      try {
        let url = this.$config['APIPath'] + '/patient/search'
        let params = {
          fieldName: fieldName,
          keyword: keyword
        }
        let response = await fetchData(url, 'get', params)

        if (fieldName === 'referredFrom') {
          this.referredFromData = response.data
        } else {
          this.referredOutToData = response.data
        }
      } catch {
        if (fieldName === 'referredFrom') {
          this.referredFromData = []
        } else {
          this.referredOutToData = []
        }

        commonErrorToast()
      } finally {
        this.isFetching = false
      }
    },
    async getData () {
      let self = this
      self.formData = {}

      self.isReady = false

      try {
        let url = self.$config['APIPath'] + '/patient/' + self.$route.params.id
        let params = {
          only_dermographic: true
        }
        let response = await fetchData(url, 'get', params)
        let data = response.data

        if (self.$moment(data.dateOfBirth).isValid()) {
          data.dateOfBirth = self.$moment(data.dateOfBirth).toDate()
        } else {
          data.dateOfBirth = null
        }

        if (!Array.isArray(data.phoneNumbers)) {
          data.phoneNumbers = []
        }

        if (!Array.isArray(data.relativePhoneNumbers)) {
          data.relativePhoneNumbers = []
        }

        if (!Array.isArray(data.riskBehaviors)) {
          data.riskBehaviors = []
        }

        self.formData = data
      } catch (error) {
        console.error(error)
        self.setDefault()

        commonErrorToast()
      } finally {
        self.isReady = true
      }
    },
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
      let url = this.$config['APIPath'] + '/patient/' + this.formData.id

      http({
        url: url,
        data: self.formData,
        method: 'patch'
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
    }
  },
  data: () => {
    return {
      isReady: false,
      formData: {},

      isFetching: false,
      referredFromData: [],
      referredOutToData: []
    }
  }
}
</script>

<style scoped>
.buttons {
  margin-top: 1.25rem;
}
</style>
