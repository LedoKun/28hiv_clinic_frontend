<template>
<aside class="is-medium">
        <!-- patient summary -->
        <b-collapse class="card">
            <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                    ข้อมูลผู้ป่วย
                </p>
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <div class="card-table">
                <div class="content">
                    <!-- table -->
                    <table class="table is-fullwidth is-striped">
                        <tbody>
                            <tr>
                                <td class="row-header">HN</td>
                                <td>{{ data.hn ? data.hn : '-' }}</td>
                            </tr>
                            <tr>
                                <td class="row-header">ชื่อ</td>
                                <td>{{ (data.name ? data.name : '-') }}</td>
                            </tr>
                            <tr>
                                <td class="row-header">อายุ</td>
                                <td>{{ (calculatedAge ? calculatedAge : '-') }}</td>
                            </tr>
                            <tr>
                                <td class="row-header">เพศ</td>
                                <td>{{ (data.sex ? data.sex : '-') }}</td>
                            </tr>
                            <tr>
                                <td class="row-header">Gender</td>
                                <td>{{ (data.gender ? data.gender : '-') }}</td>
                            </tr>
                            <tr>
                                <td class="row-header">สัญชาติ</td>
                                <td>{{ (data.nationality ? data.nationality : '-') }}</td>
                            </tr>
                            <tr>
                                <td class="row-header">สิทธิ์</td>
                                <td>{{ (data.payer ? data.payer : '-') }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- /table -->
                </div>
            </div>
        </b-collapse>
         <!-- /patient summary -->
</aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SideInfo',
    data: function () {
        return {
        }
    },
    computed: {
        ...mapState('Patient', [
            'data'
        ]),

        // calculate patient age
        calculatedAge: function () {
            let dob = this.$moment(this.data.dob)

            if (!this.data.dob && !dob.isValid()) {
                return '-'
            }

            let today = this.$moment()

            let years = today.diff(dob, 'year')
            dob.add(years, 'years')

            let months = today.diff(dob, 'months')
            dob.add(months, 'months')

            let days = today.diff(dob, 'days')
            dob.add(days, 'days')

            return (
                (years > 0 ? years + ' ปี ' : '') +
                (months > 0 ? months + ' เดือน ' : '') + 
                (days > 0 ? days + ' วัน' : '')
            )
        }
    }
}
</script>

<style scoped>
.row-header {
    font-weight: bold;
    width: 20%;
}
.last-dx, .previous-visit {
    display: block;
}
</style>
