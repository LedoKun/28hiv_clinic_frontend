function displayDermographicAlerts (patientData) {
  let alertStrings = []

  if (patientData.dateOfBirth === null) {
    alertStrings.push('date of birth')
  }

  if (patientData.gender === null) {
    alertStrings.push('gender')
  }

  if (patientData.nationality === null) {
    alertStrings.push('nationality')
  }

  if (patientData.healthInsurance === null) {
    alertStrings.push('healthcare scheme')
  }

  if (patientData.referralStatus === null) {
    alertStrings.push('referral status')
  }

  if (patientData.patientStatus === null) {
    alertStrings.push('patient status')
  }

  if (patientData.onlyPrescription === null) {
    alertStrings.push('"For Prescription Only?" field')
  }

  return alertStrings.join(', ')
}

export default displayDermographicAlerts
