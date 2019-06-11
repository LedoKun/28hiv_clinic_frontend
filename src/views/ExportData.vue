<template>
  <section>

    <div class="columns">
      <div class="column">
        <p class="title is-4">Export Data</p>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">TUC's Data Dict</p>

        <div class="table-div">
          <b-table
            class="table"

            :hoverable="true"
            :mobile-cards="true"
            :striped="true"

            :data="tableData"
            :columns="tableColumns"

            :loading="isFetching"

            paginated
            :total="tableData ? tableData.length : 0"
            :per-page="20"
            pagination-size="is-small"
            :pagination-simple="true"
          >
            <!-- empty -->
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
            <!-- /empty -->
          </b-table>
        </div>
  
      </div>
    </div>

  </section>
</template>

<script>
import fetchData from '@/utils/http/fetchData.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'

export default {
  name: 'ExportData',
  components: {},
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

        self.tableData = data['tableData']
        self.tableColumns = data['tableColumns']
      } catch (error) {
        console.error(error)
        self.tableData = []
        self.tableColumns = []

        commonErrorToast()
      } finally {
        self.isFetching = false
      }
    }
  },
  data: () => {
    return {
      tableData: [],
      tableColumns: [],

      isFetching: true
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

.table {
  font-size: small !important;
  padding: 0.1rem !important;
}

.table-div {
  overflow-x: auto !important;
  white-space: nowrap;
}

.b-table .level {
  width: 100%;
}
</style>
