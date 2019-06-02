<template>
<nav class="navbar is-transparent">
    <div class="navbar-brand">
        <a class="navbar-item" :href="$config.baseURL">
            <img src="@/assets/site-logo.png" alt="Bulma: a modern CSS framework based on Flexbox"
                height="28">
        </a>
        <div class="navbar-burger burger" data-target="navLinks" @click="toggleBurgerMenu()">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>

    <div id="navLinks" class="navbar-menu">
        <div class="navbar-start">
        </div>

        <div class="navbar-end">
            <div class="navbar-item field">
                <p class="control has-icons-right searchbox">
                    <b-autocomplete
                        v-model="keyword"
                        ref="patient_search"
                        :data="data"
                        placeholder="Search..."

                        field="name"
                        :loading="isFetching"
                        @keyup.native="getSearchHits"
                        @select="option => {
                            if(option && option.id) {
                                selected(option.id)
                            }
                        }"
                        :clear-on-select="true"
                        autofocus
                        id="patientSearchBox"
                        expanded
                        :keep-first="true"
                    >

                        <template slot-scope="props">
                            <div class="media">
                                <div class="media-content">
                                {{ props.option.name }} {{ props.option.clinicID ? '['+props.option.clinicID+']' : '' }}<br>
                                <small>HN {{ props.option.hn }} [{{ props.option.nationality }}]</small>
                                </div>
                            </div>
                        </template>

                        <template slot="header">
                            <router-link :to="{ name: 'NewPatient' }">
                              Add new patient...
                            </router-link>
                        </template>

                        <template slot="empty">No results</template>

                    </b-autocomplete>
                </p>

                <p class="control" >
                    <a class="button is-primary" href="#" v-if="!isLoggedIn" @click="login">
                        Login
                    </a>

                    <a class="button is-primary" href="#" v-else @click="logout">
                        Logout
                    </a>
                </p>
            </div>
        </div>
    </div>
</nav>
</template>

<script>
import fetchData from '@/utils/http/fetchData.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'

export default {
  name: 'navBar',
  methods: {
    login () {

    },
    logout () {

    },
    toggleBurgerMenu () {
      // The following code is based off a toggle menu by @Bradcomp
      // source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
      let burger = document.querySelector('.burger')
      let menu = document.querySelector('#' + burger.dataset.target)
      burger.classList.toggle('is-active')
      menu.classList.toggle('is-active')
    },
    async getSearchHits () {
      let self = this

      if (!self.keyword.length) {
        self.data = []
        return
      }

      self.isFetching = true

      try {
        let url = this.$config['APIPath'] + '/patient/search'
        let params = {
          keyword: self.keyword
        }
        let response = await fetchData(url, 'get', params)

        self.data = response.data
      } catch {
        self.data = []
        commonErrorToast()
      } finally {
        self.isFetching = false
      }
    },
    selected (id) {
      this.$router.push({ name: 'PatientSummary', params: { id: id } })
      this.data = []
    }
  },
  created () {
    this.getSearchHits = this.$_.debounce(this.getSearchHits, this.$config['globalDebounceWait'])
  },
  data: function () {
    return {
      keyword: '',
      data: [],
      search_hit: [],
      isFetching: false,
      isLoggedIn: false
    }
  }
}
</script>

<style scoped>
.searchbox {
    padding-right: 0.5rem;
}
</style>
