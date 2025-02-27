Brian's connectathon 2023 $populate and $extract [talk](https://www.youtube.com/watch?v=vS3fYKo6RVQ)

See [this](https://build.fhir.org/ig/HL7/sdc/OperationDefinition-Questionnaire-populate.html) for parameters to the official SDC $populate operator. 

All about CSIRO smart forms [questionnaires](https://www.smartforms.io/dashboard/questionnaires) and [docs](https://smartforms.csiro.au/docs/) and [storybook](https://smartforms.csiro.au/storybook/?path=/story/component-itemtype-attachment--attachment-basic). 

This form of getFormFHIRData successfully returns the subject in the QR. 
```
JSON.stringify(LForms.Util.getFormFHIRData("QuestionnaireResponse", "R4", undefined, {
  subject: {
    resourceType: "Patient",
    id: "tus-screened"
  }
}), null, 2)
```