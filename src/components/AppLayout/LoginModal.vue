<template>
<form
    @submit.prevent="performLogin"
>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">เข้าสู่ระบบ</p>
        </header>
        <section class="modal-card-body">
            <b-field label="ชื่อผู้ใช้">
                <b-input
                    type="username"
                    v-model="username"
                    placeholder="ชื่อผู้ใช้..."
                    required>
                </b-input>
            </b-field>

            <b-field label="รหัสผ่าน">
                <b-input
                    type="password"
                    v-model="password"
                    password-reveal
                    placeholder="รหัสผ่าน..."
                    required>
                </b-input>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary">Login</button>
        </footer>
    </div>
</form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'loginModal',
    methods: {
        ...mapActions('Auth', [
            'performLoginAction'
        ]),
        performLogin () {
            let self = this
            this.performLoginAction({
                username: self.username,
                password: self.password
            })
                .then(() => {
                    self.$toast.open({
                        message: 'เข้าสู่ระบบแล้ว',
                        type: 'is-success',
                        position: 'is-bottom'
                    })

                    self.$parent.close()
                })
                .catch((error) => {
                    let message = error.response.data.name ? (
                        error.response.data.name
                        + ' (' + error.response.data.statusCode + ') : '
                        + error.response.data.description
                    ) : 'Unexpected Error!'

                    self.$toast.open({
                        message: message,
                        type: 'is-danger',
                        position: 'is-bottom',
                        duration: 5000
                    })
                })
        }
    },
    mounted: function () {
        this.username = null
        this.password = null
    },
    data: function () {
        return {
            username: null,
            password: null
        }
    }
}
</script>

<style scoped>
</style>