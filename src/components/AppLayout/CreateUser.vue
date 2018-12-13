<template>
<form
    @submit.prevent="createUser"
>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">New User</p>
        </header>
        <section class="modal-card-body">
            <b-field
                label="Username"
                :type="{'is-danger': errors.has('username')}"
                :message="errors.first('username')"
            >
                <b-input
                    id="username"
                    type="text"
                    :value="username"
                    placeholder="Username..."
                    required
                    v-validate="'required|min:5'"
                >
                </b-input>
            </b-field>

            <b-field
                label="Password"
                :type="{'is-danger': errors.has('password')}"
                :message="errors.first('password')"
            >
                <b-input
                    type="password"
                    id="password"
                    v-model="password"
                    password-reveal
                    placeholder="Password..."
                    required
                    v-validate="'required|min:5'"
                >
                </b-input>
            </b-field>

            <b-field
                label="Confirm Password"
                :type="{'is-danger': errors.has('confirmPassword')}"
                :message="errors.first('confirmPassword')"
            >
                <b-input
                    type="password"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    password-reveal
                    placeholder="Confirm Password..."
                    required
                    v-validate="'required|confirmed:password'"
                >
                </b-input>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary" @click="createUser">Create User</button>
        </footer>
    </div>
</form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'createUser',
    methods: {
        ...mapActions('Auth', [
            'createUserAction'
        ]),
        createUser () {
            let self = this

            this.$validator.validateAll().then(() => {
                this.createUserAction({
                    username: self.username,
                    password: self.password
                })
                    .then(() => {
                        self.$toast.open({
                            message: 'User Created!',
                            type: 'is-success',
                            position: 'is-bottom'
                        })
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
            })
        }
    },
    mounted: function () {
        this.username = null
        this.password = null
        this.confirmPassword = null
    },
    data: function () {
        return {
            username: null,
            password: null,
            confirmPassword: null
        }
    }
}
</script>

<style scoped>
</style>