library Smoking

using FHIR version '4.0.1'

include FHIRHelpers version '4.4.000' called FHIRHelpers

valueset "Tobacco Use Screening": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.526.3.1278'

context Patient

define AllObservations:
  [Observation]

define TobaccoUseScreening:
  [Observation: "Tobacco Use Screening"]