<template>
<section>
    <p class="title is-4">Patient Dermographic</p>
    <p class="subtitle is-6">Enter patient's information here.</p>

    <div class="columns">
        <div class="column">
          <schema-form :schema="formSchema" v-model="formData" @submit="handleSubmit()">

            <!-- date of birth -->
            <template slot="dateOfBirth" slot-scope="{ item: { key, value, update, schema } }">
              <div class="field">
                <label class="label">
                  {{ schema.title }}
                </label>

                <div class="control">
                  <b-datepicker
                      placeholder="Type or select a date..."
                      icon="calendar-today"
                      v-bind:value="value"
                      editable
                    >
                  </b-datepicker>
                </div>
              </div>
            </template>
            <!-- /date of birth -->

          </schema-form>
        </div>
    </div>
</section>
</template>

<script>
import formSchema from '@/formSchemas/patientDermographic'
import { SchemaForm } from 'vue-json-schema-form'

export default {
  name: 'PatientDermographic',
  components: {
    SchemaForm
  },
  props: ['clinicID'],
  methods: {
    handleSubmit () {

    }
  },
  data: () => {
    return {
      formSchema,
      formData: {}
    }
  }
}
</script>

<style scoped>
</style>
