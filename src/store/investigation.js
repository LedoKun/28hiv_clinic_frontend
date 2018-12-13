import instance from '@/utils/http'
import urlEncode from '@/utils/urlEncode'
import { getField, updateField } from 'vuex-map-fields'
let _ = require('lodash')

let initialState = {
    data: {
        date: null,
        antiHIV: null,
        cd4: null,
        pCD4: null,
        vl: null,
        vdrl: null,
        rpr: null,
        hbsag: null,
        antiHBs: null,
        antiHCV: null,
        ppd: null,
        cxr: null,
        tb: null,
        hivResistence: null
    }
}

let state = {
    investigation: [],
    data: null
}

let getters = {
    getField
}

let mutations = {
    updateField,
    setDefault(state) {
        state.data = _.cloneDeep(initialState.data)
        state.investigation = []
    },
    loadData(state, payload) {
        // Change date to date object
        payload.date = new Date(payload.date)
        state.investigation = payload
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

        let relativeURL = 'patient/' + urlEncode(hn) + '/investigation'

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
            url: 'patient/' + urlEncode(hn) + '/investigation',
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
            + '/investigation/'
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
 