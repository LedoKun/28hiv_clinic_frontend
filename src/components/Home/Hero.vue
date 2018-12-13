<template>
<div>
    <section class="hero is-info welcome is-small">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    Hello there,
                </h1>
                <h2 class="subtitle">
                    I hope you are having a great day!
                </h2>
            </div>
        </div>
    </section>

    <section class="info-tiles">
        <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">{{ dashboardInfo.countTodayAppointment }}</p>
                     <p class="subtitle">จำนวนผู้ป่วยนัด</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">{{ dashboardInfo.countPatientExamined }}</p>
                    <p class="subtitle">จำนวนผู้ป่วยที่ตรวจ</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">{{ dashboardInfo.countPatient }}</p>
                    <p class="subtitle">จำนวนผู้ป่วยทั้งหมด</p>
                </article>
            </div>
        </div>
    </section>
</div>
</template>

<script>
export default {
    name: 'Hero',
    props: {
        dashboardInfo: {
            type: Object,
            default: function () {
                return {
                    username: 'user',
                    appionted: 0,
                    examined: 0,
                    nextDayAppointed: 0
                }
            }
        }
    }
}
</script>

<style scoped>
.hero.welcome.is-info {
  background: #36D1DC;
  background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);
  background: linear-gradient(to right, #5B86E5, #36D1DC);
}
.hero.welcome .title, .hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}
.info-tiles {
  margin: 1rem 0;
}
.info-tiles .subtitle {
  font-weight: 300;
  color: #8F99A3;
}
</style>
