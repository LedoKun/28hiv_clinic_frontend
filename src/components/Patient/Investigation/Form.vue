<template>
<b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
            Add Investigation Results
        </p>
        <a class="card-header-icon">
            <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
        </a>
    </div>
    <div class="card-content">

        <!-- form area -->
        <div class="content">
            <form
                @submit.prevent="validateData"
                id="LabInfoForm"
            >
                <div class="columns">
                    <!-- date -->
                    <div class="column">
                        <b-field
                            label="Investigation Date *"
                            custom-class="is-small"
                            :type="{'is-danger': errors.has('date')}"
                            :message="errors.first('date')"
                        >
                            <b-datepicker
                                placeholder="เลือกวัน..."
                                icon="calendar-today"
                                size="is-small"
                                v-model="data.date"
                                name="date"
                                :max-date="new Date()"
                                v-validate="'required'"
                                editable
                            />
                        </b-field>
                    </div>
                    <!-- / date -->

                    <!-- antiHIV -->
                    <div class="column">
                        <b-field
                            label="Anti-HIV"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.antiHIV"
                                size="is-small"
                                name="antiHIV"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / antiHIV -->

                    <!-- cd4 -->
                    <div class="column">
                        <b-field
                            label="CD4"
                            :type="{'is-danger': errors.has('cd4')}"
                            :message="errors.first('cd4')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                step="1"
                                size="is-small"
                                min="0"
                                v-model="data.cd4"
                                name="cd4"
                                v-validate="'numeric|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / cd4 -->

                    <!-- pCD4 -->
                    <div class="column">
                        <b-field
                            label="%CD4"
                            :type="{'is-danger': errors.has('pCD4')}"
                            :message="errors.first('pCD4')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                icon="percent"
                                step="0.01"
                                size="is-small"
                                min="0.0"
                                v-model="data.pCD4"
                                name="pCD4"
                                v-validate="'decimal:2|min_value:0|max_value:100'"
                            />
                        </b-field>
                    </div>
                    <!-- / pCD4 -->

                    <!-- vl -->
                    <div class="column">
                        <b-field
                            label="VL (0, if undetectable)"
                            :type="{'is-danger': errors.has('vl')}"
                            :message="errors.first('vl')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                size="is-small"
                                min="0"
                                v-model="data.vl"
                                name="vl"
                                v-validate="'numeric|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / vl -->

                </div>

                <div class="columns">

                    <!-- wbc -->
                    <div class="column">
                        <b-field
                            label="WBC Count"
                            :type="{'is-danger': errors.has('wbc')}"
                            :message="errors.first('wbc')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                step="1"
                                size="is-small"
                                min="0"
                                v-model="data.wbc"
                                name="wbc"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / wbc -->

                    <!-- hb -->
                    <div class="column">
                        <b-field
                            label="Hb"
                            :type="{'is-danger': errors.has('hb')}"
                            :message="errors.first('hb')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.hb"
                                name="hb"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / hb -->

                    <!-- hct -->
                    <div class="column">
                        <b-field
                            label="Hct"
                            :type="{'is-danger': errors.has('hct')}"
                            :message="errors.first('hct')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                icon="percent"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.hct"
                                name="hct"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / hct -->

                    <!-- wbcPNeu -->
                    <div class="column">
                        <b-field
                            label="%Neu"
                            :type="{'is-danger': errors.has('wbcPNeu')}"
                            :message="errors.first('wbcPNeu')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                icon="percent"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.wbcPNeu"
                                name="wbcPNeu"
                                v-validate="'decimal:2|min_value:0|max_value:100'"
                            />
                        </b-field>
                    </div>
                    <!-- / wbcPNeu -->

                    <!-- wbcPLym -->
                    <div class="column">
                        <b-field
                            label="%Lym"
                            :type="{'is-danger': errors.has('wbcPLym')}"
                            :message="errors.first('wbcPLym')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                icon="percent"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.wbcPLym"
                                name="wbcPLym"
                                v-validate="'decimal:2|min_value:0|max_value:100'"
                            />
                        </b-field>
                    </div>
                    <!-- / wbcPLym -->

                    <!-- wbcPEos -->
                    <div class="column">
                        <b-field
                            label="%Eos"
                            :type="{'is-danger': errors.has('wbcPEos')}"
                            :message="errors.first('wbcPEos')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                icon="percent"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.wbcPEos"
                                name="wbcPEos"
                                v-validate="'decimal:2|min_value:0|max_value:100'"
                            />
                        </b-field>
                    </div>
                    <!-- / wbcPEos -->

                    <!-- wbcPBasos -->
                    <div class="column">
                        <b-field
                            label="%Basos"
                            :type="{'is-danger': errors.has('wbcPBasos')}"
                            :message="errors.first('wbcPBasos')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                icon="percent"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.wbcPBasos"
                                name="wbcPBasos"
                                v-validate="'decimal:2|min_value:0|max_value:100'"
                            />
                        </b-field>
                    </div>
                    <!-- / wbcPBasos -->

                </div>

                <div class="columns">

                    <!-- bun -->
                    <div class="column">
                        <b-field
                            label="BUN"
                            :type="{'is-danger': errors.has('bun')}"
                            :message="errors.first('bun')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.bun"
                                name="bun"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / bun -->

                    <!-- cr -->
                    <div class="column">
                        <b-field
                            label="Cr"
                            :type="{'is-danger': errors.has('cr')}"
                            :message="errors.first('cr')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.cr"
                                name="cr"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / cr -->

                    <!-- na -->
                    <div class="column">
                        <b-field
                            label="Na"
                            :type="{'is-danger': errors.has('na')}"
                            :message="errors.first('na')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.na"
                                name="na"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / na -->

                    <!-- k -->
                    <div class="column">
                        <b-field
                            label="K"
                            :type="{'is-danger': errors.has('k')}"
                            :message="errors.first('k')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.k"
                                name="k"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / k -->

                    <!-- cl -->
                    <div class="column">
                        <b-field
                            label="Cl"
                            :type="{'is-danger': errors.has('cl')}"
                            :message="errors.first('cl')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.cl"
                                name="cl"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / cl -->

                    <!-- hco3 -->
                    <div class="column">
                        <b-field
                            label="HCO3"
                            :type="{'is-danger': errors.has('hco3')}"
                            :message="errors.first('hco3')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.hco3"
                                name="hco3"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / hco3 -->

                    <!-- ca -->
                    <div class="column">
                        <b-field
                            label="Ca"
                            :type="{'is-danger': errors.has('ca')}"
                            :message="errors.first('ca')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.ca"
                                name="ca"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / ca -->

                    <!-- mg -->
                    <div class="column">
                        <b-field
                            label="Mg"
                            :type="{'is-danger': errors.has('mg')}"
                            :message="errors.first('mg')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.mg"
                                name="mg"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / mg -->

                    <!-- po4 -->
                    <div class="column">
                        <b-field
                            label="PO4"
                            :type="{'is-danger': errors.has('po4')}"
                            :message="errors.first('po4')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.po4"
                                name="po4"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / po4 -->
                </div>

                <div class="columns">
                    <!-- fbs -->
                    <div class="column">
                        <b-field
                            label="FBS"
                            :type="{'is-danger': errors.has('fbs')}"
                            :message="errors.first('fbs')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                size="is-small"
                                v-model="data.fbs"
                                name="fbs"
                                min="0"
                                v-validate="'numeric|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / fbs -->

                    <!-- hba1c -->
                    <div class="column">
                        <b-field
                            label="HbA1c"
                            :type="{'is-danger': errors.has('hba1c')}"
                            :message="errors.first('hba1c')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.hba1c"
                                name="hba1c"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / hba1c -->
                </div>

                <div class="columns">
                    <!-- urine_glucose_dipstick -->
                    <div class="column">
                        <b-field
                            label="Urine Glucose (Dipstick)"
                            :type="{'is-danger': errors.has('urine_glucose_dipstick')}"
                            :message="errors.first('urine_glucose_dipstick')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                size="is-small"
                                v-model="data.urine_glucose_dipstick"
                                name="urine_glucose_dipstick"
                                min="0"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / urine_glucose_dipstick -->

                    <!-- urine_prot_dipstick -->
                    <div class="column">
                        <b-field
                            label="Urine Protein (Dipstick)"
                            :type="{'is-danger': errors.has('urine_prot_dipstick')}"
                            :message="errors.first('urine_prot_dipstick')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                size="is-small"
                                v-model="data.urine_prot_dipstick"
                                name="urine_prot_dipstick"
                                min="0"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / urine_prot_dipstick -->

                    <!-- urine_glucose -->
                    <div class="column">
                        <b-field
                            label="Urine Glucose"
                            :type="{'is-danger': errors.has('urine_glucose')}"
                            :message="errors.first('urine_glucose')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.urine_glucose"
                                name="urine_glucose"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / urine_glucose -->

                    <!-- urine_prot -->
                    <div class="column">
                        <b-field
                            label="Urine Prot"
                            :type="{'is-danger': errors.has('urine_prot')}"
                            :message="errors.first('urine_prot')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.urine_prot"
                                name="urine_prot"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / urine_prot -->

                    <!-- urine_cr -->
                    <div class="column">
                        <b-field
                            label="Urine Cr"
                            :type="{'is-danger': errors.has('urine_cr')}"
                            :message="errors.first('urine_cr')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.urine_cr"
                                name="urine_cr"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / urine_cr -->
                </div>

                <div class="columns">

                    <!-- chol -->
                    <div class="column">
                        <b-field
                            label="Cholesterol"
                            :type="{'is-danger': errors.has('chol')}"
                            :message="errors.first('chol')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                step="1"
                                size="is-small"
                                min="0"
                                v-model="data.chol"
                                name="chol"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / chol -->

                    <!-- tg -->
                    <div class="column">
                        <b-field
                            label="TG"
                            :type="{'is-danger': errors.has('tg')}"
                            :message="errors.first('tg')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                step="1"
                                size="is-small"
                                min="0"
                                v-model="data.tg"
                                name="tg"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / tg -->

                    <!-- hdl -->
                    <div class="column">
                        <b-field
                            label="HDL"
                            :type="{'is-danger': errors.has('hdl')}"
                            :message="errors.first('hdl')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                step="1"
                                size="is-small"
                                min="0"
                                v-model="data.hdl"
                                name="hdl"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / hdl -->

                    <!-- ldl -->
                    <div class="column">
                        <b-field
                            label="LDL"
                            :type="{'is-danger': errors.has('ldl')}"
                            :message="errors.first('ldl')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                step="1"
                                size="is-small"
                                min="0"
                                v-model="data.ldl"
                                name="ldl"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / ldl -->

                </div>

                <div class="columns">

                    <!-- total_prot -->
                    <div class="column">
                        <b-field
                            label="Total Protein"
                            :type="{'is-danger': errors.has('total_prot')}"
                            :message="errors.first('total_prot')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.total_prot"
                                name="total_prot"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / total_prot -->

                    <!-- albumin -->
                    <div class="column">
                        <b-field
                            label="Alb"
                            :type="{'is-danger': errors.has('albumin')}"
                            :message="errors.first('albumin')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.albumin"
                                name="albumin"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / albumin -->

                    <!-- globulin -->
                    <div class="column">
                        <b-field
                            label="Glob"
                            :type="{'is-danger': errors.has('globulin')}"
                            :message="errors.first('globulin')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.globulin"
                                name="globulin"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / globulin -->

                    <!-- total_bilirubin -->
                    <div class="column">
                        <b-field
                            label="TB"
                            :type="{'is-danger': errors.has('total_bilirubin')}"
                            :message="errors.first('total_bilirubin')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.total_bilirubin"
                                name="total_bilirubin"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / total_bilirubin -->

                    <!-- direct_bilirubin -->
                    <div class="column">
                        <b-field
                            label="DB"
                            :type="{'is-danger': errors.has('direct_bilirubin')}"
                            :message="errors.first('direct_bilirubin')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.direct_bilirubin"
                                name="direct_bilirubin"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / direct_bilirubin -->

                    <!-- ast -->
                    <div class="column">
                        <b-field
                            label="AST"
                            :type="{'is-danger': errors.has('ast')}"
                            :message="errors.first('ast')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.ast"
                                name="ast"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / ast -->

                    <!-- alt -->
                    <div class="column">
                        <b-field
                            label="ALT"
                            :type="{'is-danger': errors.has('alt')}"
                            :message="errors.first('alt')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.alt"
                                name="alt"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / alt -->

                    <!-- alp -->
                    <div class="column">
                        <b-field
                            label="ALP"
                            :type="{'is-danger': errors.has('alp')}"
                            :message="errors.first('alp')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0.00"
                                step="0.1"
                                size="is-small"
                                min="0.0"
                                v-model="data.alp"
                                name="alp"
                                v-validate="'decimal:2|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / alp -->

                </div>

                <div class="columns">

                    <!-- tpha -->
                    <div class="column">
                        <b-field
                            label="TPHA"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.tpha"
                                size="is-small"
                                name="tpha"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / tpha -->

                    <!-- vdrl -->
                    <div class="column">
                        <b-field
                            label="VDRL"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.vdrl"
                                size="is-small"
                                name="vdrl"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / vdrl -->

                    <!-- rpr -->
                    <div class="column">
                        <b-field
                            label="RPR"
                            :type="{'is-danger': errors.has('rpr')}"
                            :message="errors.first('rpr')"
                            custom-class="is-small"
                        >
                            <div class="field has-addons">
                                <p class="control">
                                    <a class="button is-static is-small">
                                        1 :
                                    </a>
                                </p>
                                <p class="control full-width-input">
                                    <b-input
                                        type="number"
                                        placeholder="0"
                                        step="1"
                                        size="is-small"
                                        min="0"
                                        v-model="data.rpr"
                                        name="rpr"
                                        v-validate="'numeric|min_value:0'"
                                    />
                                </p>
                            </div>
                        </b-field>
                    </div>
                    <!-- / rpr -->
                </div>

                <div class="columns">
                    <!-- HBsAg -->
                    <div class="column">
                        <b-field
                            label="HBsAg"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.hbsag"
                                size="is-small"
                                name="hbsag"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / HBsAg -->

                    <!-- antiHBs -->
                    <div class="column">
                        <b-field
                            label="Anti-HBs"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.antiHBs"
                                size="is-small"
                                name="antiHBs"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / antiHBs -->

                    <!-- antiHCV -->
                    <div class="column">
                        <b-field
                            label="Anti-HCV"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.antiHCV"
                                size="is-small"
                                name="antiHCV"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / antiHCV -->

                    <!-- cryptoAg blood -->
                    <div class="column">
                        <b-field
                            label="Crypto-Ag (Blood)"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.cryptoAgBlood"
                                size="is-small"
                                name="cryptoAgBlood"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / cryptoAg blood -->

                    <!-- cryptoAg CSF -->
                    <div class="column">
                        <b-field
                            label="Crypto-Ag (CSF)"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.cryptoAgCSF"
                                size="is-small"
                                name="cryptoAgCSF"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.positiveAndNegative"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / cryptoAg CSF -->

                </div>

                <div class="columns">

                    <!-- hivResistance -->
                    <div class="column">
                        <b-field
                            label="HIV Resistance"
                            custom-class="is-small"
                        >
                            <b-taginput
                                size="is-small"
                                v-model="data.hivResistance"
                                ellipsis
                                icon="label"
                                placeholder="HIV resistance to... (e.g. EFV)">
                            </b-taginput>
                        </b-field>
                    </div>
                    <!-- / hivResistance -->

                    <!-- hivMutation -->
                    <div class="column">
                        <b-field
                            label="HIV Mutation"
                            custom-class="is-small"
                        >
                            <b-taginput
                                size="is-small"
                                v-model="data.hivMutation"
                                ellipsis
                                icon="label"
                                placeholder="HIV mutation at... (e.g. M41L)">
                            </b-taginput>
                        </b-field>
                    </div>
                    <!-- / hivMutation -->

                </div>

                <div class="columns">

                    <!-- ppd -->
                    <div class="column">
                        <b-field
                            label="PPD (mm)"
                            :type="{'is-danger': errors.has('ppd')}"
                            :message="errors.first('ppd')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="number"
                                placeholder="0"
                                step="1"
                                size="is-small"
                                min="0"
                                v-model="data.ppd"
                                name="ppd"
                                v-validate="'numeric|min_value:0'"
                            />
                        </b-field>
                    </div>
                    <!-- / ppd -->

                    <!-- cxr -->
                    <div class="column">
                        <b-field
                            label="CXR"
                            :type="{'is-danger': errors.has('cxr')}"
                            :message="errors.first('cxr')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="text"
                                size="is-small"
                                v-model="data.cxr"
                                name="cxr"
                                v-validate="'min:2'"
                            />
                        </b-field>
                    </div>
                    <!-- / cxr -->

                </div>

                <div class="columns">

                    <!-- afb -->
                    <div class="column">
                        <b-field
                            label="Sputum AFB"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.afb"
                                size="is-small"
                                name="afb"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.afb"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / afb -->

                    <!-- sputumCulture -->
                    <div class="column">
                        <b-field
                            label="Sputum C/S"
                            custom-class="is-small"
                        >
                            <b-input
                                type="text"
                                size="is-small"
                                v-model="data.sputumCulture"
                                name="sputumCulture"
                                v-validate="'min:2'"
                            />
                        </b-field>
                    </div>
                    <!-- / sputumCulture -->
                </div>

                <div class="columns">
                    <!-- dst -->
                    <div class="column">
                        <b-field
                            label="DST"
                            custom-class="is-small"
                        >
                            <b-taginput
                                size="is-small"
                                v-model="data.dst"
                                ellipsis
                                icon="label"
                                placeholder="MTB resists to... (e.g. Sm, INH, RIF, EMB, Km, Am, Cm, Ofx, Lfx, Mfx, Eto, Pto, Cs, PAS, Cfz)">
                            </b-taginput>
                        </b-field>
                    </div>
                    <!-- / dst -->

                    <!-- geneXpert -->
                    <div class="column">
                        <b-field
                            label="GeneXpert"
                            custom-class="is-small"
                        >
                            <b-select
                                placeholder="เลือก..."
                                v-model="data.geneXpert"
                                size="is-small"
                                name="geneXpert"
                                expanded
                            >
                                <option
                                    v-for="(item, key) in IxOptions.geneXpert"
                                    :value="item"
                                    :key="key"
                                >
                                    {{ item }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <!-- / geneXpert -->

                    <!-- lineProbeAssay -->
                    <div class="column is-4">
                        <b-field
                            label="Line Probe Assay"
                            :type="{'is-danger': errors.has('lineProbeAssay')}"
                            :message="errors.first('lineProbeAssay')"
                            custom-class="is-small"
                        >
                            <b-input
                                type="text"
                                size="is-small"
                                v-model="data.lineProbeAssay"
                                name="lineProbeAssay"
                                v-validate="'min:2'"
                            />
                        </b-field>
                    </div>
                    <!-- / lineProbeAssay -->

                </div>

            </form>
        </div>
        <!-- / form area -->

    </div>

    <div class="card-footer">
        <a
            class="card-footer-item has-text-danger"
            @click="confirmReset"
        >
            Reset Form
        </a>
        <a
            class="card-footer-item"
            @click="validateData"
        >
            Save
        </a>
    </div>
</b-collapse>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

Vue.use(VeeValidate, {
    events: ''
})

export default {
    name: 'IxForm',
    computed: {
        ...mapFields('Investigation', [
            'data'
        ])
    },
    methods: {
        ...mapActions('Investigation', [
            'setDefaultAction',
            'submitAction',
            'loadAction'
        ]),
        confirmReset () {
            this.$dialog.confirm({
                title: 'Reseting Investigation Result Form',
                message: 'Are you sure you want to <b>reset</b> this investigation result form?',
                confirmText: 'Reset Form',
                cancelText: 'Cancel',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    document.getElementById('LabInfoForm').reset()
                    this.$toast.open('Form Reseted!')
                }
            })
        },
        validateData () {
            let self = this
            self.$validator.validateAll().then(async (result) => {
                if (result) {
                    try {
                        await self.submitAction()

                        self.$toast.open({
                            message: 'Investigation Result Saved!',
                            type: 'is-success',
                            position: 'is-bottom'
                        })

                        self.setDefaultAction()
                        self.errors.clear()
                        self.loadAction()
                    } catch (error) {
                        // error
                    }
                } else {
                    self.$toast.open({
                        message: 'กรุณาตรวจสอบข้อมูล',
                        type: 'is-danger',
                        position: 'is-bottom',
                        duration: 5000
                    })
                }
            }).catch(() => {
                // logic error
            })

        },
    },
    data: function () {
        return {
            IxOptions: {
                positiveAndNegative: [
                    '',
                    '+ ve',
                    '- ve',
                    '?'
                ],
                afb: [
                    '',
                    '- ve',
                    '1+',
                    '2+',
                    '3+',
                    'Scantily',
                ],
                geneXpert: [
                    '',
                    'MTB Detected',
                    'RIF Resistance MTB',
                    'MTB Not Detected',
                ]
            }
        }
    }
}
</script>

<style scoped>
.full-width-input {
    width: 100%;
}
</style>
