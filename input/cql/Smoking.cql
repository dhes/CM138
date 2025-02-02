library Smoking

using FHIR version '4.0.1'

include FHIRHelpers version '4.4.000' called FHIRHelpers

context Patient

define AllObservations:
  [Observation]

define "AllObservationDates":
  "AllObservations".effective