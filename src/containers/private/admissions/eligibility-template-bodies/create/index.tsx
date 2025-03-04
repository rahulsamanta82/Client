import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUtils from "hooks/useUtils";
import useAdmissions from "containers/private/admissions/useHooks";
import {
  CreateAdmissionETBFormSection,
  CreateAdmissionETBMain,
  CreateAdmissionETBTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { CreateEligibilityTemplateBodyDTO } from "utils/helpers/models/admissions/create-eligibility-template-body.dto";

interface CreateAdmissionETBProps {}

interface FieldData {
  id: string;
  title: string;
  name: string;
}

const CreateAdmissionETB: FC<CreateAdmissionETBProps> = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const [fieldValues, setFieldValues] = useState<any>({});

  const [formData, setFormData] = useState<CreateEligibilityTemplateBodyDTO>({
    ...new CreateEligibilityTemplateBodyDTO(),
    header_id: params?.headerId,
  });

  const {
    createTemplateBody,
    updateTemplateBody,
    getTemplateBodyById,
    getTemplateBodies,
    getEligibilityFieldData,
  } = useAdmissions();

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
    setValue,
  } = useForm<CreateEligibilityTemplateBodyDTO>({ defaultValues: formData });

  const fields: any[] = [
    { title: "Select Field", value: "" },
    { title: "Certificate", value: "certificate_id" },
    { title: "Certificate Percentage", value: "certificate_percentage" },
    {
      title: "Certificate Obtained marks",
      value: "certificate_obtained_marks",
    },
    {
      title: "Certificate Categories",
      value: "certificate_category_id",
    },

    { title: "Certificate Total marks", value: "certificate_total_marks" },
    { title: "Is DAE", value: "is_dae" },
    { title: "Subject/Diploma/Specialization", value: "subject_id" },
    { title: "Subject Percentage", value: "subject_percentage" },
    { title: "Subject Total marks", value: "subject_total_marks" },
    { title: "Subject Obtained marks", value: "subject_obtained_marks" },
    { title: "Subject Type", value: "subject_type" },
    { title: "Result Type", value: "result_type_id" },
    { title: "Student Age", value: "student_age" },
    { title: "Student Is Active", value: "student_is_active" },
    { title: "Domicile", value: "domicile" },
    { title: "City", value: "p_city" },
    { title: "Area Region", value: "area_region_id" },
    { title: "Quota", value: "quota_id" },
    {
      title: "Quota Eligibility 1=Yes 0=Not Eligible",
      value: "quota_eligibility",
    },
    { title: "Student Disability Yes/No", value: "student_disability" },
  ];

  const operators = [
    { title: "Select Operator", value: "" },
    { title: "Is equal to", value: "=" },
    { title: "Is not equal to", value: "!=" },
    { title: "Is greater than", value: ">" },
    { title: "Is less than", value: "<" },
    { title: "Is DAE", value: "<>" },
    { title: "Is greater than or equal to", value: ">=" },
    { title: "Is less than or equal to", value: "<=" },
  ];

  useEffect(() => {
    getEligibilityFieldData(params?.headerId, setFieldValues);
    if (params?.bodyId) {
      getTemplateBodyById(params?.bodyId, formData, setValue, setFormData);
    }
  }, [params?.bodyId, params?.headerId]);
  console.log(fieldValues);

  const handleChange = (event: any): void => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger([name]);
    if (name === "field") {
      if (!Object.keys(fieldValues).includes(value)) {
        formData.value = fields.find((f: any) => f.value === value).value;
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (
    data: CreateEligibilityTemplateBodyDTO,
    addMore: boolean = false
  ) => {
    if (params?.bodyId) {
      updateTemplateBody(params?.bodyId, data);
    } else {
      createTemplateBody(data, addMore, resetForm);
    }
  };

  const resetForm = () => {
    for (let key in formData) {
      if (key !== "header_id") {
        setValue(key as keyof CreateEligibilityTemplateBodyDTO, "");
      }
    }

    setFormData({
      ...new CreateEligibilityTemplateBodyDTO(),
      header_id: params?.headerId,
    });
  };

  return (
    <CreateAdmissionETBMain>
      <CreateAdmissionETBTop>
        <div className="left">
          <span className="page-heading">
            {decodeURIComponent(params?.title)}
          </span>
          <Breadcrumb />
        </div>
      </CreateAdmissionETBTop>

      <CreateAdmissionETBFormSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Field</label>
            <div className="field-wrap">
              <div className="field">
                <select
                  {...register("field", { required: true })}
                  value={formData.field}
                  onChange={handleChange}
                >
                  {fields.map((field, index) => (
                    <option value={field.value} key={index}>
                      {field.title}
                    </option>
                  ))}
                </select>
              </div>
              <FormErrorMessage error={errors.field} />
            </div>
          </div>
          <div className="input-field">
            <label>Operator</label>
            <div className="field-wrap">
              <div className="field">
                <select
                  {...register("op", { required: true })}
                  value={formData.op}
                  onChange={handleChange}
                >
                  {operators.map((operator, index) => (
                    <option key={index} value={operator.value}>
                      {operator.title}
                    </option>
                  ))}
                </select>
              </div>
              <FormErrorMessage error={errors.op} />
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Field Value</label>
            <div className="field-wrap">
              <div className="field">
                {Object.keys(fieldValues).includes(formData.field) ? (
                  <select
                    {...register("value", { required: true })}
                    value={formData.value}
                    onChange={handleChange}
                  >
                    {/* <option value="">Select Value</option>
                    {fieldValues[formData.field]?.map(
                      (item: FieldData, index: number) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      )
                    )} */}
                    <option value="">Select Value</option>
                    {fieldValues[formData.field]?.map(
                      (item: FieldData, index: number) => (
                        <option key={index} value={item.id}>
                          {item.hasOwnProperty("title")
                            ? item.title
                            : item.name || ""}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    {...register("value", { required: true })}
                    value={formData.value}
                    onChange={handleChange}
                  />
                )}
              </div>
              <FormErrorMessage error={errors.value} />
            </div>
          </div>
        </div>

        <div className="submit-buttons">
          <div className="buttons">
            <button
              className="lg-rounded-btn gray"
              type="button"
              onClick={resetForm}
            >
              Reset
            </button>
            {!params?.bodyId && (
              <button
                className="lg-rounded-btn black"
                onClick={handleSubmit((data) => onSubmit(data, true))}
              >
                Save & Add more
              </button>
            )}
            <button
              className="lg-rounded-btn"
              onClick={handleSubmit((data) => onSubmit(data))}
            >
              Save & Exit
            </button>
          </div>
        </div>
      </CreateAdmissionETBFormSection>
    </CreateAdmissionETBMain>
  );
};

export default CreateAdmissionETB;
