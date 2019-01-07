import instance from '@/utils/http'
import urlEncode from '@/utils/urlEncode'
import { getField, updateField } from 'vuex-map-fields'
import Moment from 'moment'
let _ = require('lodash')

let initialState = {
    data: {
        date: null,
        appointmentFor: null
    }
}

let state = {
    previousAppointments: [],
    data: null
}

let getters = {
    getField
}

let mutations = {
    updateField,
    setDefault(state) {
        state.data = _.cloneDeep(initialState.data)
        state.previousAppointments = []
    },
    loadData(state, payload) {
        // Change date to date object
        payload.date = new Date(payload.date)
        state.previousAppointments = payload
    }
}

let actions = {
    setDefaultAction (context) {
        context.commit('setDefault')
    },
    async loadAction(context) {
        let hn = context.rootState.Patient.data.hn

        if(!hn) {
            return
        }

        let relativeURL = 'patient/' + urlEncode(hn) + '/appointment'

        try {
            let response = await instance({
                url: relativeURL,
                method: 'get'
            })

            let payload = response.data

            if (Object.getOwnPropertyNames(payload).length > 0) {
                context.commit('loadData', payload)
            }

            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    editAction (contect, key) {
        state.data = _.cloneDeep(state.previousAppointments[key])
        state.data.date = Moment(state.data.date).toDate()
    },
    submitAction (context) {
        let hn = context.rootState.Patient.data.hn

        if(!hn) {
            return
        }

        return instance({
            url: 'patient/' + urlEncode(hn) + '/appointment',
            method: 'put',
            data: state.data
        })
    },
    deleteAction(context, id) {
        let hn = context.rootState.Patient.data.hn

        if(!hn) {
            return
        }

        let relativeURL = (
            'patient/'
            + urlEncode(hn)
            + '/appointment/'
            + urlEncode(id)
        )

        return instance({
            url: relativeURL,
            method: 'delete'
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
 