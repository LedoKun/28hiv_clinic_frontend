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
        async performLogin () {
            let self = this

            try {
                await self.performLoginAction({
                    username: self.username,
                    password: self.password
                })

                self.$toast.open({
                    message: 'เข้าสู่ระบบแล้ว',
                    type: 'is-success',
                    position: 'is-bottom'
                })

                self.$parent.close()
            } catch (error) {
                // error
            }
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