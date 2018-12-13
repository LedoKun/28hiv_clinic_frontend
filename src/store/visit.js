import instance from '@/utils/http'
import urlEncode from '@/utils/urlEncode'
import { getField, updateField } from 'vuex-map-fields'
let _ = require('lodash')

let initialState = {
    data: {
        date: null,
        bw: null,
        contactTB: null,
        adherenceScale: null,
        adherenceProblem: null,
        delayedDosing: null,
        impression: [],
        arv: [],
        oiProphylaxis: [],
        antiTB: [],
        vaccination: []
    }
}

let state = {
    previousVisits: [],
    data: null
}

let getters = {
    getField
}

let mutations = {
    updateField,
    setDefault(state) {
        state.data = _.cloneDeep(initialState.data)
        state.previousVisits = []
    },
    loadData(state, payload) {
        // Change date to date object
        payload.date = new Date(payload.date)
        state.previousVisits = payload
    }
}

let actions = {
    setDefaultAction (context) {
        context.commit('setDefault')
    },
    loadAction(context) {
        let hn = context.rootState.Patient.data.hn

        if(!hn) {
            return
        }

        let relativeURL = 'patient/' + urlEncode(hn) + '/visit'

        return instance({
            url: relativeURL,
            method: 'get'
        })
            .then((response) => {
                let payload = response.data

                if (Object.getOwnPropertyNames(payload).length > 0) {
                    context.commit('loadData', payload)
                }                
            })

    },
    submitAction (context) {
        let hn = context.rootState.Patient.data.hn

        if(!hn) {
            return
        }

        return instance({
            url: 'patient/' + urlEncode(hn) + '/visit',
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
            + '/visit/'
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
 