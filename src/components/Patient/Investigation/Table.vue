<template>
  <div>
    <!-- Ix Results -->
    <b-collapse class="card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Investigation Results</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
      </div>

      <div class="table-container">
        <!-- table -->
        <b-table
          :data="investigation"
          :striped="true"
          :narrowed="true"
          :hoverable="true"
          :mobile-cards="true"
        >
          <template slot-scope="props">
            <b-table-column v-for="(column, index) in columnsTemplate"
                :key="index"
                :label="column.title"
                :visible="column.visible">
                {{ renderColumnData(column.field, props.row[column.field]) }}
            </b-table-column>

            <b-table-column field="actions" label>
              <div class="is-pulled-right">
                <a
                  class="button is-info is-small"
                  @click="editData(props.index)"
                >
                  <span class="icon">
                      <b-icon
                          icon="pencil"
                      />
                  </span>
                </a>
                <a
                  class="button is-danger is-small"
                  @click="deleteData(props.row.id)"
                >
                  <span class="icon">
                      <b-icon
                          icon="delete-outline"
                      />
                  </span>
                </a>
              </div>
            </b-table-column>
          </template>

          <template slot="empty">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                </p>
                <p>Nothing here.</p>
              </div>
            </section>
          </template>
        </b-table>

        <!-- column toggles -->
        <b-field
            grouped
            group-multiline
            class="columnsToggle"
        >
            <div
                v-for="(column, index) in columnsTemplate" 
                :key="index"
                class="control"
            >
                <b-checkbox
                    v-model="column.visible"
                    class="is-small"
                >
                    {{ column.title }}
                </b-checkbox>
            </div>
        </b-field>
        <!-- / column toggles -->

      </div>
    </b-collapse>
    <!-- /Ix Results -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "IxTable",
  computed: {
    ...mapState("Investigation", ["investigation"])
  },
  methods: {
    ...mapActions("Investigation", ["loadAction", "deleteAction", "editAction"]),
    editData(key) {
      this.editAction(key)
    },
    deleteData(id) {
      let self = this;

      self.$dialog.confirm({
        title: "Deleting Investigation Result",
        message:
          "Are you sure you want to <b>delete</b> this investigation result?",
        confirmText: "Delete",
        cancelText: "Cancel",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          try {
            await self.deleteAction(id);

            self.$toast.open({
              message: "Investigation Result Deleted!",
              type: "is-success",
              position: "is-bottom"
            });

            self.loadAction();
          } catch (error) {
            // error
          }
        }
      });
    },
    renderColumnData(fieldName, fieldData) {
        if (fieldName === 'date') {
            return (this.$moment(fieldData).isValid() ? this.$moment(fieldData).format('DD/MM/YYYY') : '-')
        } else if (fieldName === 'rpr') {
            return (fieldData ? '1:' + fieldData : '')
        } else if (fieldName === 'hivResistance' || fieldName === 'hivMutation') {
            return (fieldData && fieldData.length > 0 ? fieldData.join(', ') : '')
        } else {
            return fieldData
        }
    }
  },
  data: function () {
      return {
          columnsTemplate: [
              { title:'Date', field: 'date', visible: true },
              { title:'Anti-HIV', field: 'antiHIV', visible: true },
              { title:'CD4', field: 'cd4', visible: true },
              { title:'%CD4', field: 'pCD4', visible: true },
              { title:'VL', field: 'vl', visible: true },
              { title:'WBC', field: 'wbc', visible: false },
              { title:'HB', field: 'hb', visible: false },
              { title:'Hct', field: 'hct', visible: true },
              { title:'%N', field: 'wbcPNeu', visible: false },
              { title:'%L', field: 'wbcPLym', visible: false },
              { title:'%Eo', field: 'wbcPEos', visible: false },
              { title:'%Ba', field: 'wbcPBasos', visible: false },
              { title:'BUN', field: 'bun', visible: false },
              { title:'Cr', field: 'cr', visible: true },
              { title:'Na', field: 'na', visible: false },
              { title:'K', field: 'k', visible: true },
              { title:'Cl', field: 'cl', visible: false },
              { title:'HCO3', field: 'hco3', visible: false },
              { title:'Ca', field: 'ca', visible: true },
              { title:'Mg', field: 'mg', visible: false },
              { title:'PO4', field: 'po4', visible: true },
              { title:'FBS', field: 'fbs', visible: true },
              { title:'HbA1c', field: 'hba1c', visible: true },
              { title:'Urine Glucose (Dipstick)', field: 'urine_glucose_dipstick', visible: true },
              { title:'Urine Glucose', field: 'urine_glucose', visible: false },
              { title:'Urine Prot (Dipstick)', field: 'urine_prot_dipstick', visible: true },
              { title:'Urine Prot', field: 'urine_prot', visible: false },
              { title:'Urine Cr', field: 'urine_cr', visible: false },
              { title:'CHOL', field: 'chol', visible: true },
              { title:'TG', field: 'tg', visible: true },
              { title:'HDL', field: 'hdl', visible: false },
              { title:'LDL', field: 'ldl', visible: true },
              { title:'Total Protein', field: 'total_prot', visible: false },
              { title:'Albumin', field: 'albumin', visible: false },
              { title:'Globulin', field: 'globulin', visible: false },
              { title:'Total Bilirubin', field: 'total_bilirubin', visible: false },
              { title:'Direct Bilirubin', field: 'direct_bilirubin', visible: false },
              { title:'AST', field: 'ast', visible: true },
              { title:'ALT', field: 'alt', visible: true },
              { title:'ALP', field: 'alp', visible: false },
              { title:'TPHA', field: 'tpha', visible: false },
              { title:'VDRL', field: 'vdrl', visible: false },
              { title:'RPR', field: 'rpr', visible: true },
              { title:'HBsAg', field: 'hbsag', visible: true },
              { title:'Anti-HBs', field: 'antiHBs', visible: true },
              { title:'Anti-HCV', field: 'antiHCV', visible: true },
              { title:'Crypto-Ag (Blood)', field: 'cryptoAgBlood', visible: true },
              { title:'Crypto-Ag (CSF)', field: 'cryptoAgCSF', visible: false },
              { title:'PPD', field: 'ppd', visible: true },
              { title:'CXR', field: 'cxr', visible: false },
              { title:'Sputum AFB', field: 'afb', visible: false },
              { title:'Sputum Culture', field: 'sputumCulture', visible: false },
              { title:'DST', field: 'dst', visible: false },
              { title:'GeneXpert', field: 'geneXpert', visible: false },
              { title:'Line Probe Assay', field: 'lineProbeAssay', visible: false },
              { title:'HIV Resistance', field: 'hivResistance', visible: false },
              { title:'HIV Mutation', field: 'hivMutation', visible: false }
          ]
      }
  }
};
</script>

<style scoped>
.b-table {
  margin: 2px auto 20px auto;
  font-size: 0.7em;
}
.columnsToggle {
  margin: auto 15px auto 15px;
  padding-bottom: 10px;
}
</style>
