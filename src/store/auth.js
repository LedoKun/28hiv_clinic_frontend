import instance from '@/utils/http'

let state = {
    isLoggedin: !!sessionStorage.getItem('jwt_token')
}

let mutations = {
    login (state) {
        state.isLoggedin = true
    },
    logout (state) {
        state.isLoggedin = false
    }
}

let actions = {
    performLogoutAction  (context) {
        if (!state.isLoggedin) {
            return
        }

        return instance({
            url: 'auth/logout',
            method: 'post'
        })
            .then(() => {
                context.commit('logout')
                sessionStorage.removeItem('jwt_token')
            })
    },
    performLoginAction  (context, credential) {
        if (!credential) {
            return
        }

        return instance({
            url: 'auth/login',
            method: 'post',
            data: credential
        })
            .then((response) => {
                let payload = response.data

                if (payload && payload.access_token) {
                    sessionStorage.setItem('jwt_token', payload.access_token)
                    context.commit('login')
                }
            })
    },
    createUserAction  (credential) {
        if (!credential) {
            return
        }

        return instance({
            url: 'auth/create_user',
            method: 'post',
            data: credential
        })
    }
}

export default {
namespaced: true,
state,
actions,
mutations
}
