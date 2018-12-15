<template>
<aside class="is-medium">
        <!-- Ix Results -->
        <b-collapse class="card">
            <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                    Investigation Results
                </p>
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <div class="card-table overflow-table">
                <div class="content">
                    <!-- table -->
                    <table class="table is-fullwidth is-striped">
                        <tbody>
                            <tr>
                                <td class="row-header">
                                    #
                                </td>
                                <td class="row-header">
                                    Date
                                </td>
                                <td class="row-header">
                                    Anti-HIV
                                </td>
                                <td class="row-header">
                                    CD4
                                </td>
                                <td class="row-header">
                                    %CD4
                                </td>
                                <td class="row-header">
                                    VL
                                </td>
                                <td class="row-header">
                                    VDRL
                                </td>
                                <td class="row-header">
                                    RPR
                                </td>
                                <td class="row-header">
                                    HBsAg
                                </td>
                                <td class="row-header">
                                    Anti-HBs
                                </td>
                                <td class="row-header">
                                    Anti-HCV
                                </td>
                                <td class="row-header">
                                    PPD (mm)
                                </td>
                                <td class="row-header">
                                    CXR
                                </td>
                                <td class="row-header">
                                    TB Results
                                </td>
                                <td class="row-header">
                                    HIV Resistence
                                </td>
                                <td class="row-header">
                                </td>
                            </tr>
                            <tr
                                v-for="(item, key) in investigation"
                                :key=key
                            >
                                <td>{{ key + 1 }}</td>
                                <td>
                                    {{ $moment(item.date).isValid() ? $moment(item.date).format("DD/MM/YYYY") : "-" }}
                                </td>
                                <td>{{ item.antiHIV }}</td>
                                <td>{{ item.cd4 }}</td>
                                <td>{{ item.pCD4 }}</td>
                                <td>{{ item.vl }}</td>
                                <td>{{ item.vdrl }}</td>
                                <td>{{ item.rpr }}</td>
                                <td>{{ item.hbsag }}</td>
                                <td>{{ item.antiHBs  }}</td>
                                <td>{{ item.antiHCV }}</td>
                                <td>{{ item.ppd }}</td>
                                <td>{{ item.cxr }}</td>
                                <td>{{ item.tb }}</td>
                                <td>{{ item.hivResistence }}</td>
                                <td><a class="button is-danger is-small is-pulled-right" @click="deleteKey(item.id)">Delete</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- /table -->
                </div>
            </div>
        </b-collapse>
         <!-- /Ix Results -->
</aside>
</template>

<script>
import {mapActions, mapState } from 'vuex'

export default {
    name: 'IxResults',
    computed: {
        ...mapState('Investigation', [
            'investigation'
        ])
    },
    methods: {
        ...mapActions('Investigation', [
            'loadAction',
            'deleteAction'
        ]),
        deleteKey (id) {
            let self = this

            self.$dialog.confirm({
                title: 'Deleting Investigation Result',
                message: 'Are you sure you want to <b>delete</b> this investigation result?',
                confirmText: 'Delete',
                cancelText: 'Cancel',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: async () => {
                    try {
                        await self.deleteAction(id)

                        self.$toast.open({
                            message: 'Investigation Result Deleted!',
                            type: 'is-success',
                            position: 'is-bottom'
                        })

                        self.loadAction()
                    } catch (error) {
                        // error
                    }
                }

            })
        }
    }
}
</script>

<style scoped>
.row-header {
    font-weight: bold;
}
.overflow-table {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
}
</style>
