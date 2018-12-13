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
        fetchData() {
            if(!this.keyword.length) {
                this.data = []
                return
            }

            let self = this
            self.isFetching = true

            instance({
                url: 'search/patient',
                method: 'get',
                params: {
                    keyword: self.keyword
                }
            })
                .then(({ data }) => {
                    self.data = data
                })
                .catch((error) => {
                    self.data = []
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
                .finally(() => {
                    self.isFetching = false
                })
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
