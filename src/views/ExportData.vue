<template>
  <section v-if="!isFetching">

    <div class="columns">
      <div class="column">
        <p class="title is-4">Export Data</p>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">TUC's Data Dict</p>

        <div>
          <hot-table :settings="settings"></hot-table>
        </div>

      </div>
    </div>

  </section>
</template>

<script>
import fetchData from '@/utils/http/fetchData.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'
import { HotTable } from '@handsontable/vue'

export default {
  name: 'ExportData',
  components: {
    HotTable
  },
  mounted: function () {
    this.getData()
  },
  created () {
    this.getData = this.$_.debounce(this.getData, this.$config['globalDebounceWait'])
  },
  methods: {
    async getData () {
      let self = this
      self.isFetching = true

      try {
        let url = self.$config['APIPath'] + '/statistics/data_dict'
        let response = await fetchData(url, 'get')
        let data = response.data

        self.settings.data = data.data
        self.settings.colHeaders = data.colHeaders
      } catch (error) {
        console.error(error)
        self.settings.data = []
        self.settings.colHeaders = false

        commonErrorToast()
      } finally {
        self.isFetching = false
      }
    }
  },
  data: () => {
    return {
      isFetching: true,

      // handsontable settings
      settings: {
        data: [],
        rowHeaders: true,
        colHeaders: false,
        licenseKey: 'non-commercial-and-evaluation',
        height: 500,
        columnSorting: {
          indicator: true
        },
        manualRowMove: true,
        manualColumnMove: true
      }
    }
  }
}
</script>

<style scoped>
.columns {
  padding-bottom: 0.5rem !important;
}

.hr {
  margin-top: 1.5rem !important;
  margin-bottom: 2.5rem !important;
}
</style>

<style src="handsontable/dist/handsontable.full.css"></style>
