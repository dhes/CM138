for Juliet Rubini of ICF on Zulip. 

I'm studying the "Preventive Care and Screening: Tobacco Use: Screening and Cessation InterventionFHIR" test cases on MADiE, the FHIR version that uses QI-Core v4.1.1.  I have some questions about CumulativeMedicationDuration.cql version 4.1.000. Are you by any chance the 'JKR' in 
/*
@update: JKR 2024-04-02 ->
Incremented QICoreCommon and FHIRHelpers version
Created Fluent functions for all relevant functions
*/

Trigger-data:
MedicationRequest (MR)
  MR.dosageInstruction[singleton].timing.repeat.boundsPeriod.{start,end}

Trigger point in code 
```
 define fluent function medicationRequestPeriod(Request "MedicationRequest"):
  Request R
    let
      dosage: singleton from R.dosageInstruction,
...
      timing: dosage.timing,
...
      period: Quantity(TIMING.REPEAT.PERIOD, timing.repeat.periodUnit),
...
```
Trigger-data:
MR.dispenseRequest.validityPeriod.{start,end}
Trigger point in code 
```

```


