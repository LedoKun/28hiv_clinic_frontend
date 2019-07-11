import moment from 'moment'

let locale = 'th'

let dateFormat = 'DD/MM/YYYY'
let APIDateFormat = 'YYYY-MM-DD'
let defaultMonthNames = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม'
]

let baseURL = location.origin
let APIRelativePath = '/api'

let defaultIconPack = 'mdi'

let globalDebounceWait = 500

let numberOfPatientPerPage = 25

let defaultToastDuration = 5000

let overdueFUMonths = 6
let overdueVLMonths = 12

let config = {
  // MomentJS locale
  locale: locale,

  // URL to api
  baseURL: baseURL,
  APIRelativePath: APIRelativePath,
  APIPath: baseURL + APIRelativePath,

  // date configs
  dateFormat: dateFormat,
  APIDateFormat: APIDateFormat,
  defaultMonthNames: defaultMonthNames,

  // Buefy config
  defaultIconPack: defaultIconPack,

  // Use moment as date object generator
  defaultDateFormatter: (date) => {
    let momentDate = moment(date)
    return momentDate.isValid() ? momentDate.format(dateFormat) : null
  },

  // convert BE to AD
  defaultDateParser: (date) => {
    let dateArray = date.split('/')

    // convert BE to AD
    if (dateArray.length === 3 && dateArray[2] >= 2200) {
      dateArray[2] = dateArray[2] - 543
    }

    let momentDate = moment(`${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`, 'DD/MM/YYYY')
    return momentDate.isValid() ? momentDate.toDate() : null
  },

  // default number of patient perpage
  numberOfPatientPerPage: numberOfPatientPerPage,

  globalDebounceWait: globalDebounceWait,
  defaultToastDuration: defaultToastDuration,

  // alerts in patient summery page
  overdueFUMonths: overdueFUMonths,
  overdueVLMonths: overdueVLMonths
}

export default config
