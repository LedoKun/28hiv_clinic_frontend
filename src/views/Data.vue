<template>
<div class="container">
    <div class="columns">
        <div class="column">
            <AllPatients />
        </div>
    </div>

    <div class="columns" v-if="isReady">
        <div class="column">
            <Table
                :header="'Sex-Gender-Age'"
                :data="tables.df_groupby_age"
            />
        </div>

        <div class="column">
            <Table
                :header="'Sex-Gender-Age (Thais)'"
                :data="tables.df_thais_groupby_age"
            />
        </div>

        <div class="column">
            <Table
                :header="'Sex-Gender-Age (Non-Thai)'"
                :data="tables.df_non_thai_groupby_age"
            />
        </div>
    </div>

    <div class="columns" v-if="isReady">
        <div class="column">
            <Table
                :header="'สิทธิ์การรักษา (คนไทย)'"
                :data="tables.df_thais_groupby_payer"
            />
        </div>
        
        <div class="column">
            <Table
                :header="'สิทธิ์การรักษา (คนต่างชาติ)'"
                :data="tables.df_non_thai_groupby_payer"
            />
        </div>
    </div>

    <div class="columns" v-if="isReady">
        <div class="column">
            <Table
                :header="'Referral Status'"
                :data="tables.df_isRefer"
            />
        </div>
    </div>

    <div class="columns" v-if="isReady">
        <div class="column">
            <Table
                :header="'ผู้ป่วยรายใหม่'"
                :data="tables.df_new_patient_by_months"
            />
        </div>

        <div class="column">
            <Table
                :header="'จำนวนครั้งที่ผู้ป่วยที่มาพบแพทย์ทั้งหมด'"
                :data="tables.df_all_visits_by_months"
            />
        </div>

    </div>

</div>
</template>

<script>
import AllPatients from '../components/Data/AllPatients'
import Table from '../components/Data/Table'
import instance from '@/utils/http'

export default {
    name: 'Data',
    components: {
        AllPatients,
        Table
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            let self = this

            self.isReady = false

            try {
                let response = await instance({
                    url: '/api/data/stats',
                    method: 'get'
                })

                self.tables = response.data
                self.isReady = true
            } catch (error) {
                // error
            }
        }
    },
    data: function () {
        return {
            tables: null,
            isReady: false
        }
    }
}
</script>

<style scoped>
</style>