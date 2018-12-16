<template>
<b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
            ผู้ป่วยทั้งหมด ({{ total }})
        </p>
        <a class="card-header-icon">
            <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
        </a>
    </div>

    <div class="card-table">
        <!-- table -->
        <b-table
            class="table"

            :hoverable="true"
            :mobile-cards="true"
            :striped="true"

            :data="data"
            :loading="loading"

            paginated
            backend-pagination
            :total="total"
            :per-page="perPage"
            @page-change="onPageChange"
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

            <template slot-scope="props">
                <b-table-column field="hn" label="HN">
                    <a
                        @click="goToPatient(props.row.hn)"
                    >
                        {{ props.row.hn }}
                    </a>
                </b-table-column>

                <b-table-column field="cid" label="Clinic #">
                    {{ props.row.cid }}
                </b-table-column>

                <b-table-column field="name" label="ชื่อ">
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="dob" label="อายุ">
                    {{ $moment(props.row.dob).isValid() ? $moment(props.row.dob).fromNow(true) : '-' }}
                </b-table-column>

                <b-table-column field="sex" label="เพศ">
                    {{ props.row.sex }}
                </b-table-column>

                <b-table-column field="gender" label="Gender">
                    {{ props.row.gender }}
                </b-table-column>

                <b-table-column field="nationality" label="สัญชาติ">
                    {{ props.row.nationality }}
                </b-table-column>

                <b-table-column field="payer" label="สิทธิ์">
                    {{ props.row.payer }}
                </b-table-column>

            </template>
        </b-table>
        <!-- /table -->
    </div>

    <div class="card-footer">
        <a
            class="card-footer-item has-text-danger"
        >
            Export SQL
        </a>
        <a
            class="card-footer-item"
        >
            สร้างระเบียนผู้ป่วย
        </a>
    </div>
</b-collapse>
</template>

<script>
import instance from '@/utils/http'

export default {
    name: 'AllPatients',
    data() {
        return {
            data: [],
            total: 0,
            loading: false,
            page: 1,
            perPage: 20
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        goToPatient (hn) {
            this.$router.push({
                name: 'patient',
                params: {
                    urlHN: hn
                }
            })
        },
        async fetchData() {
            let self = this
            self.loading = true

            try {
                let response = await instance({
                    url: '/api/data/all_patients',
                    method: 'get',
                    params: {
                        page_number: self.page
                    }
                })

                self.data = response.data.items
                self.total = response.data.total
                self.perPage = response.data.per_page

            } catch (error) {
                // error
            } finally {
                self.loading = false
            }
        },
        onPageChange(page) {
            this.page = page
            this.fetchData()
        }
    }
}
</script>

<style scoped>
.card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
}
.card-header-title {
  color: #8F99A3;
  font-weight: 400;
}
.card .content {
  font-size: 14px;
}
.table {
    width: 98%;
    margin-left:auto; 
    margin-right:auto;
    margin-top: 2px;
}
.card-table {
  overflow-y: auto;
}
</style>
