import { FormInputAutocomplete } from "./FormInputAutocompleteTypes";

export default function createAutocompleteString(
  options: FormInputAutocomplete
) {
  options = Object.assign(
    {
      section: "",
      context: "",
      type: "",
      field: "",
      dataType: "",
    },
    options
  );

  return `${options.section} ${options.context} ${options.type} ${
    options.field
  } ${options.dataType} ${options.webauthn ? "webauthn" : ""}`
    .trim()
    .replace(/\s+/, " ");
}
