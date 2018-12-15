<template>
<nav class="is-white topNav is-fixed-top">
  <div class="container">
    <div class="navbar-brand">
      <div class="navbar-item">
        <img src="../../assets/vue-logo.png" height="28">
      </div>
      <div
        class="navbar-burger burger"
        data-target="topNav"
        @click="toggleBurgerMenu()"
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    <div id="topNav" class="navbar-menu">
      <div class="navbar-start">
        <router-link
            :to="{ name: 'home' }"
            class="navbar-item"
            exact
        >
            หน้าแรก
        </router-link>

        <router-link
            :to="{ name: 'patient' }"
            class="navbar-item"
            v-if="isLoggedin"
        >
            ผู้ป่วย
        </router-link>

        <router-link
            :to="{ name: 'data' }"
            class="navbar-item"
            exact
            v-if="isLoggedin"
        >
            ข้อมูล / สถิติ
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <div
              class="control"
              v-if="isLoggedin"
            >
                <SearchBox />
            </div>

            <!-- login and create user buttons -->
            <div
              class="control"
              v-if="!isLoggedin"
            >
              <a
                class="button is-small is-info is-outlined"
                @click="toggleLoginModal()"
                >
                <span class="icon">
                    <b-icon
                        icon="account-outline"
                        size="is-small"
                    />
                </span>
              <span>เข้าสู่ระบบ</span>
              </a>
            </div>
            <!-- / login and create user buttons -->

            <!-- logout button -->
            <div
              class="control"
              v-if="isLoggedin"
            >
              <a
                class="button is-small is-info is-outlined"
                @click="logout()"
                >
                <span class="icon">
                    <b-icon
                        icon="account-outline"
                        size="is-small"
                    />
                </span>
              <span>ออกจากระบบ</span>
              </a>
            </div>
            <!-- /logout button -->

          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- login modal -->
  <b-modal :active.sync="isLoginModalActive" has-modal-card>
      <LoginModal/>
  </b-modal>
</nav>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import SearchBox from './SearchBox.vue'
import LoginModal from './LoginModal.vue'
import { mapActions, mapState } from 'vuex'

Vue.use(VeeValidate, {
    events: ''
})

export default {
    name: 'navbar',
    components: {
        SearchBox,
        LoginModal
    },
    methods: {
      ...mapActions('Auth', [
        'performLogoutAction'
      ]),
      logout() {
        this.performLogoutAction()
      },
      toggleBurgerMenu () {
          // The following code is based off a toggle menu by @Bradcomp
          // source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
          let burger = document.querySelector('.burger')
          let menu = document.querySelector('#' + burger.dataset.target)

          burger.classList.toggle('is-active')
          menu.classList.toggle('is-active')
      },
      toggleLoginModal () {
          this.isLoginModalActive = !this.isLoginModalActive
      }
    },
    data: function () {
      return {
        isLoginModalActive: false
      }
    },
    computed: {
      ...mapState('Auth', [
          'isLoggedin'
      ])
    },
}
</script>

<style scoped>
nav.navbar {
  border-top: 4px solid #276cda;
  margin-bottom: 1rem;
}
.navbar-item.brand-text {
  font-weight: 300;
}
.navbar-item, .navbar-link {
  font-size: 14px;
  font-weight: 700;
}
</style>
