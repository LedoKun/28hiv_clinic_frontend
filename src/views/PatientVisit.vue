<template>
<section>
    <p class="title is-4">Visit</p>
    <p class="subtitle is-6">Enter patient's visit information here.</p>

    <div class="columns">
        <div class="column">
          <schema-form :schema="formSchema" v-model="formData" @submit="handleSubmit()">

            <!-- visit date -->
            <template slot="date" slot-scope="{ item: { key, value, update, schema } }">
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
            <!-- /visit date -->

          </schema-form>
        </div>
    </div>
</section>
</template>

<script>
import formSchema from '@/formSchemas/patientVisit'
import { SchemaForm } from 'vue-json-schema-form'

export default {
  name: 'PatientVisit',
  components: {
    SchemaForm
  },
  props: [
    'clinicID',
    'dateURI'
  ],
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
