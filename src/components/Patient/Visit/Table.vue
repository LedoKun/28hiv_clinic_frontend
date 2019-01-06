<template>
  <div>
    <!-- Previous Visits -->
    <b-collapse class="card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Previous Visits</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
      </div>
      <div class="table-container">
        <!-- table -->
        <b-table
          :data="previousVisits"
          :striped="true"
          :narrowed="true"
          :hoverable="true"
          :mobile-cards="true"
        >
          <template slot-scope="props">
            <b-table-column
              field="date"
              label="Date"
            >{{ $moment(props.row.date).isValid() ? $moment(props.row.date).format("DD/MM/YYYY") : "-" }}</b-table-column>

            <b-table-column field="bw" label="BW">{{ props.row.bw }}</b-table-column>

            <b-table-column field="contactTB" label="Contact TB?">{{ props.row.contactTB }}</b-table-column>

            <b-table-column
              field="adherenceScale"
              label="ARV Adherence Scale (%)"
            >{{ props.row.adherenceScale }}</b-table-column>

            <b-table-column
              field="delayedDosing"
              label="Dosing Delaed By (min)"
            >{{ props.row.delayedDosing }}</b-table-column>

            <b-table-column
              field="impression"
              label="Dx"
            >{{ props.row.impression && props.row.impression.length > 0 ? props.row.impression.join(", ") : "" }}</b-table-column>

            <b-table-column
              field="arv"
              label="ARV"
            >{{ props.row.arv && props.row.arv.length > 0 ? props.row.arv.join(", ") : "" }}</b-table-column>

            <b-table-column field="whySwitch" label="Why Switched?">{{ props.row.whySwitch }}</b-table-column>

            <b-table-column
              field="oiProphylaxis"
              label="OI Meds"
            >{{ props.row.oiProphylaxis && props.row.oiProphylaxis.length > 0 ? props.row.oiProphylaxis.join(", ") : "" }}</b-table-column>

            <b-table-column
              field="antiTB"
              label="TB Meds"
            >{{ props.row.antiTB && props.row.antiTB.length > 0 ? props.row.antiTB.join(", ") : "" }}</b-table-column>

            <b-table-column
              field="vaccination"
              label="Vaccine"
            >{{ props.row.vaccination && props.row.vaccination.length > 0 ? props.row.vaccination.join(", ") : "" }}</b-table-column>

            <b-table-column field="actions" label>
              <a
                class="button is-danger is-small is-pulled-right"
                @click="deleteData(props.row.id)"
              >Delete</a>
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
        <!-- /table -->
      </div>
    </b-collapse>
    <!-- /Previous Visits -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PreviousVisits",
  computed: {
    ...mapState("Visit", ["previousVisits"])
  },
  methods: {
    ...mapActions("Visit", ["loadAction", "deleteAction"]),
    deleteData(id) {
      let self = this;

      self.$dialog.confirm({
        title: "Deleting Visit",
        message: "Are you sure you want to <b>delete</b> this visit?",
        confirmText: "Delete",
        cancelText: "Cancel",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          try {
            await self.deleteAction(id);

            self.loadAction();
          } catch (error) {
            // error
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.row-header {
  font-weight: bold;
}
.b-table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 2px;
  font-size: 0.8em;
}
</style>
