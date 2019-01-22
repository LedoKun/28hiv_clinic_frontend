import instance from '@/utils/http'
import urlEncode from '@/utils/urlEncode'
import { getField, updateField } from 'vuex-map-fields'
import Moment from 'moment'
let _ = require('lodash')

let initialState = {
    data: {
        hn: null,
        gid: null,
        cid: null,
        nap: null,
        patientStatus: null,
        referOutTo: null,
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
        let dob = Moment(payload.dob)
        payload.dob = dob.isValid ? dob.toDate() : null
        state.data = payload
    },
    setIsDataInBackend(state, payload) {
        state.isDataInBackend = payload
    }
}

let actions = {
    setDefaultAction(context) {
        context.commit('setDefault')
    },
    async submitAction(context) {
        // delete un-needed keys
        if (state.data['visits']) {
            delete state.data['visits']
        }

        if (state.data['investigation']) {
            delete state.data['investigation']
        }

        if (state.data['appointments']) {
            delete state.data['appointments']
        }

        try {
            let response = await instance({
                url: 'patient',
                method: 'put',
                data: state.data
            })

            context.commit('setIsDataInBackend', true)

            return Promise.resolve(response)
        } catch (error) {
            // error
            return Promise.reject(error)
        }
    },
    deleteAction() {
        let relativeURL = 'patient/' + urlEncode(state.data.hn)

        return instance({
            url: relativeURL,
            method: 'delete'
        })
    },
    async loadAction(context, hn) {
        let relativeURL = 'patient/' + urlEncode(hn)

        try {
            let response = await instance({
                url: relativeURL,
                method: 'get'
            })

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

            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
