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
    setLoggedOut (context) {
        localStorage.removeItem('jwt_refresh_token')
        localStorage.removeItem('jwt_token')

        context.commit('logout')
    },
    async performLogoutAction  (context) {
        if (!state.isLoggedin) {
            return
        }

        try {
            let response = await instance({
                url: 'auth/logout',
                method: 'delete',
                data: {
                    'jwt_token': localStorage.getItem('jwt_token'),
                    'jwt_refresh_token': localStorage.getItem('jwt_refresh_token')
                }
            })

            context.dispatch('setLoggedOut')

            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async performLoginAction  (context, credential) {
        if (!credential) {
            return
        }

        try {
            let response = await instance({
                url: 'auth/login',
                method: 'post',
                data: credential
            })

            let payload = response.data

            if (payload && payload.access_token) {
                localStorage.setItem('jwt_token', payload.access_token)
                context.commit('login')
            }

            if (payload && payload.refresh_token) {
                localStorage.setItem('jwt_refresh_token', payload.refresh_token)
                context.commit('login')
            }

            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
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
