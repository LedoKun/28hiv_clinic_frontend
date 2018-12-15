import instance from '@/utils/http'
import urlEncode from '@/utils/urlEncode'
import { getField, updateField } from 'vuex-map-fields'
import Moment from 'moment'
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
        let dateData = Moment(payload.date)
        payload.date = dateData.isValid ? dateData.toDate() : null
        state.investigation = payload
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

        let relativeURL = '/api/patient/' + urlEncode(hn) + '/investigation'

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
    submitAction (context) {
        let hn = context.rootState.Patient.data.hn

        if(!hn) {
            return
        }

        return instance({
            url: '/api/patient/' + urlEncode(hn) + '/investigation',
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
            '/api/patient/'
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
 