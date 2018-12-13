import instance from '@/utils/http'
import { getField, updateField } from 'vuex-map-fields'
let _ = require('lodash')

let initialState = {
    data: {
        hn: null,
        gid: null,
        cid: null,
        nap: null,
        name: null,
        dob: null,
        sex: null,
        gender: null,
        marital: null,
        nationality: null,
        payer: null,
        isRefer: null,
        referFrom: null,
        education: null,
        tel: null,
        relative_tel: null,
        address: null
    }
}

let state = {
    isDataInBackend: false,
    data: null
}

let getters = {
    getField
}

let mutations = {
    updateField,
    setDefault(state) {
        state.data = _.cloneDeep(initialState.data)
        state.isDataInBackend = false
    },
    loadData(state, payload) {
        // Change DOB to date object
        payload.dob = new Date(payload.dob)

        state.data = payload
    },
    setIsDataInBackend(state, payload) {
        state.isDataInBackend = payload
    }
}

let actions = {
    setDefaultAction (context) {
        context.commit('setDefault')
    },
    submitAction (context) {
        return instance({
            url: 'patient',
            method: 'put',
            data: state.data
        })
        .then(() => {
            context.commit('setIsDataInBackend', true)
        })
    },
    deleteAction() {
        let relativeURL = 'patient/' + encodeURIComponent(state.data.hn)

        return instance({
            url: relativeURL,
            method: 'delete'
        })
    },
    loadAction(context, hn) {
        let relativeURL = 'patient/' + encodeURIComponent(hn)

        return instance({
            url: relativeURL,
            method: 'get'
        })
            .then((response) => {
                let payload = response.data

                if (Object.getOwnPropertyNames(payload).length > 0) {
                    // assign visit data
                    if (payload.visits && (Object.getOwnPropertyNames(payload.visits).length > 0)) {
                        context.commit('Visit/loadData', payload.visits, { root: true })
                    }

                    // assign investigation data
                    if (payload.investigation && (Object.getOwnPropertyNames(payload.investigation).length > 0)) {
                        context.commit('Investigation/loadData', payload.investigation, { root: true })
                    }

                    // assign appointment data
                    if (payload.appointments && (Object.getOwnPropertyNames(payload.appointments).length > 0)) {
                        context.commit('Appointment/loadData', payload.appointments, { root: true })
                    }

                    context.commit('loadData', payload)
                    context.commit('setIsDataInBackend', true)
                }
            })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
 