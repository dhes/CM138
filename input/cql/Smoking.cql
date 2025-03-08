library Smoking version '0.0.001'

using FHIR version '4.0.1'

include FHIRHelpers version '4.4.000' called FHIRHelpers

valueset "Tobacco Use Screening": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.526.3.1278'
valueset "Tobacco User": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.526.3.1170'

context Patient

// define AllObservations:
//   [Observation]

define TobaccoUseScreening:
  [Observation: "Tobacco Use Screening"]

// define MostRecentTobaccoUseScreening:
//   Last([Observation: "Tobacco Use Screening"])
//     where TobaccoScreen.status in {'final', 'amended', 'corrected'}
//       and TobaccoScreen.effective is not null
// // define PatientId:
//   Patient.id

// define PatientIdString:
//   First(Split(Patient.id, '/'))

define PatientFullName:
  First(Patient.name).given[0] + ' ' + First(Patient.name).family

define "Age":
  AgeInYears()

define "Is18OrOlder":
  "Age" >= 18

define "StartOfCurrentYear":
  DateTime(year from Today(), 1, 1, 0, 0, 0, 0)

define "TobaccoUseScreenings":
  [Observation: "Tobacco Use Screening"] TobaccoScreen
    where TobaccoScreen.status in {'final', 'amended', 'corrected'}
      and TobaccoScreen.effective is not null

define "MostRecentTobaccoUseScreening":
  Last(
    "TobaccoUseScreenings" TobaccoScreen
      sort by effective.value
  )

define "HasUpToDateTobaccoUseScreening":
  "MostRecentTobaccoUseScreening" is not null
    and (
      "MostRecentTobaccoUseScreening".effective.value >= "StartOfCurrentYear"
    )

define MosMostRecentTobaccoUseScreeningValue:
  "MostRecentTobaccoUseScreening".value.code

define Smoker:
	"MostRecentTobaccoUseScreening".value as CodeableConcept in "Tobacco User"

define "TobaccoUseScreeningNotUpToDate":
  not "HasUpToDateTobaccoUseScreening"

  
define "Is18OrOlderAndDueForTobaccoUseScreening":
  "Is18OrOlder" and "TobaccoUseScreeningNotUpToDate"