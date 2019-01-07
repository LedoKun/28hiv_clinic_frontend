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

        wbc: null,
        hb: null,
        hct: null,
        wbcPNeu: null,
        wbcPLym: null,
        wbcPEos: null,
        wbcPBasos: null,

        bun: null,
        cr: null,
    
        na: null,
        k: null,
        cl: null,
        hco3: null,
        ca: null,
        mg: null,
        po4: null,

        fbs: null,
        hba1c: null,

        urine_glucose_dipstick: null,
        urine_prot_dipstick: null,
        urine_glucose: null,
        urine_prot: null,
        urine_cr: null,

        chol: null,
        tg: null,
        hdl: null,
        ldl: null,

        total_prot: null,
        albumin: null,
        globulin: null,
        total_bilirubin: null,
        direct_bilirubin: null,
        ast: null,
        alt: null,
        alp: null,

        tpha: null,
        vdrl: null,
        rpr: null,

        hbsag: null,
        antiHBs: null,
        antiHCV: null,

        cryptoAgBlood: null,
        cryptoAgCSF: null,

        ppd: null,
        cxr: null,
    
        afb: null,
        sputumCulture: null,
        dst: null,
        geneXpert: null,
        lineProbeAssay: null,

        hivResistance: [],
        hivMutation: [],
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

        let relativeURL = 'patient/' + urlEncode(hn) + '/investigation'

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
        state.data = _.cloneDeep(state.investigation[key])
        state.data.date = Moment(state.data.date).toDate()
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
 