<template>
<div class="container">

    <div class="columns">
        <div class="column">
            <AllPatients />
        </div>
    </div>

    <div v-if="isReady">
        <div class="columns">
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

        <div class="columns">
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

        <div class="columns">
            <div class="column">
                <Table
                    :header="'Referral Status'"
                    :data="tables.df_isRefer"
                />
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <Table
                    :header="'Patient Status'"
                    :data="tables.df_count_patient_status"
                />
            </div>
        </div>

        <div class="columns">
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

        <div class="columns">
            <div class="column">
                <Table
                    :header="'การวินิจฉัยโรค'"
                    :data="tables.df_impression"
                />
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <Table
                    :header="'ARV Regimens'"
                    :data="tables.df_arv"
                />
            </div>

            <div class="column">
                <Table
                    :header="'# of Patients On OI Medications'"
                    :data="tables.df_oiProphylaxis"
                />
            </div>

            <div class="column">
                <Table
                    :header="'Vaccinations'"
                    :data="tables.df_vaccination"
                />
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <Table
                    :header="'Anti-TB Medication Regimens'"
                    :data="tables.df_antiTB"
                />
            </div>
        </div>

        <div
            v-for="(year, key) in tables.days_start_arv_yearly"
            :key="key"
        >
            <DataWithStats
                :data="year"
            />
        </div>

        <DataWithStats
            :data="tables.init_cd4"
        />

        <DataWithStats
            :data="tables.cd4"
        />

    </div>
</div>
</template>

<script>
import AllPatients from '../components/Data/AllPatients'
import DataWithStats from '../components/Data/DataWithStats.vue'
import Table from '../components/Data/Table'
import instance from '@/utils/http'

export default {
    name: 'Data',
    components: {
        AllPatients,
        DataWithStats,
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
                    url: 'data/stats',
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

<style>
.card-table {
  margin: 2px auto 20px auto;
  font-size: 0.8em;
}
.columnsToggle {
  margin: auto 15px auto 15px;
  padding-bottom: 10px;
}
.card {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
    margin-bottom: 2rem;
}
.card-header-title {
    color: #8F99A3;
    font-weight: 400;
}
</style>