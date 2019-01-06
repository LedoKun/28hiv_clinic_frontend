<template>
    <b-autocomplete
        v-model="keyword"
        :data="data"
        placeholder="ค้นหาผู้ป่วย..."
        field="name"
        :loading="isFetching"
        @keyup.native="getAsyncData"
        @select="option => {
            if(option && option.hn) {
                selected(option.hn)
            }
        }"
        :clear-on-select="true"
        autofocus
        id="patientSearchBox"
        expanded
        :keep-first="true"
        size="is-small"
    >

        <template slot-scope="props">
            <div class="media">
                <div class="media-content">
                    #{{ props.option.hn }} - {{ props.option.name }}
                    <br>
                    <small>
                        from {{ props.option.nationality }}
                    </small>
                </div>
            </div>
        </template>

    </b-autocomplete>
</template>

<script>
import instance from '@/utils/http'

export default {
    name: 'SearchBox',
    mounted() {
        // add custom class(es) to the input field
        // let patientSearchBox = document.getElementById('patientSearchBox')
        // patientSearchBox.classList.add('is-small')
    },
    methods: {
        async fetchData() {
            let self = this
            if(!self.keyword.length) {
                self.data = []
                return
            }
            
            self.isFetching = true

            try {
                let response = await instance({
                    url: 'search/patient',
                    method: 'get',
                    params: {
                        keyword: String(self.keyword).replace(/\//g, "_")
                    }
                })

                self.data = response.data
            } catch {
                self.data = []
            } finally {
                self.isFetching = false
            }
        },
        selected(hn) {
            this.$router.push({ name: 'patient', params: { urlHN: hn }})
            this.data = []
        }
    },
    data: function () {
        return {
            keyword: '',
            data: [],
            isFetching: false,
            getAsyncData: this.$_.debounce(this.fetchData, 500)
        }
    }
}
</script>
