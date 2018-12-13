import instance from '@/utils/http'

let state = {
    isLoggedin: !!(localStorage.getItem('jwt_token') && localStorage.getItem('jwt_refresh_token'))
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
                localStorage.removeItem('jwt_token')
            })
    },
    performLogoutRefreshAction  (context) {
        if (!state.isLoggedin) {
            return
        }

        return instance({
            url: 'auth/logout_refresh',
            method: 'post'
        })
            .then(() => {
                context.commit('logout')
                localStorage.removeItem('jwt_refresh_token')
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
                    localStorage.setItem('jwt_token', payload.access_token)
                    context.commit('login')
                }

                if (payload && payload.refresh_token) {
                    localStorage.setItem('jwt_refresh_token', payload.refresh_token)
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
