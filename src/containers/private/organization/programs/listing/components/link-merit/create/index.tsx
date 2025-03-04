import { FC, useEffect, useState } from "react";
import {
  CreateLinkMeritListTop,
  CreateLinkMeritListSection,
  CreateLinkMeritListMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import useUtils from "hooks/useUtils";
import { AddProgramLinkToMeritDTO } from "utils/helpers/models/admissions/add-program-link-to-merit.dto";
import useAdmissions from "containers/private/admissions/useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";

const CreateAddLinkMeritList: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const [formData, setFormData] = useState<AddProgramLinkToMeritDTO>({
    ...new AddProgramLinkToMeritDTO(),
    program_id: params?.program_id,
    admission_session_id: params?.admission_session_id,
  });
  const [templateHeaders, setTemplateHeaders] = useState<any[]>([]);
  const [meritFormulas, setMeritFormulas] = useState<any[]>([]);
  const {
    getTemplateHeaders,
    getMeritFormulas,
    createProgramLinkMerit,
    updateProgramLinkMerit,
    getProgramLinkMeritById,
  } = useAdmissions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<AddProgramLinkToMeritDTO>();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValue(name, value);
    trigger([name]);
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    getTemplateHeaders(setTemplateHeaders);
    getMeritFormulas(setMeritFormulas);
  }, []);

  const onSubmit = (
    data: AddProgramLinkToMeritDTO,
    addMore: boolean = false
  ) => {
    if (params?.id) {
      updateProgramLinkMerit(params?.id, formData);
    } else {
      createProgramLinkMerit(formData, addMore, resetForm);
    }
  };

  const resetForm = () => {
    for (let key in formData) {
      setValue(key as keyof AddProgramLinkToMeritDTO, "");
    }

    setFormData({ ...new AddProgramLinkToMeritDTO() });
  };

  useEffect(() => {
    if (params?.id)
      getProgramLinkMeritById(params?.id, formData, setValue, setFormData);
  }, []);

  return (
    <CreateLinkMeritListMain>
      <CreateLinkMeritListTop>
        <div className="heading">
          <span className="page-heading">
            {params?.id ? "Update" : "Add"} Link
          </span>
          <Breadcrumb />
        </div>
      </CreateLinkMeritListTop>

      <CreateLinkMeritListSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Eligibility Template</label>
            <div className="field-wrap">
              <div className="field">
                <select
                  {...register("template_id", { required: true })}
                  value={formData.template_id}
                  onChange={handleChange}
                >
                  <option value="">Select Eligibility Template</option>
                  {templateHeaders.map((item: any, index: number) => {
                    return (
                      <option value={item?.id} key={index}>
                        {item?.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors.template_id} />
            </div>
          </div>
          <div className="input-field">
            <label>Merit</label>
            <div className="field-wrap">
              <div className="field">
                <select
                  {...register("merit_id", { required: true })}
                  value={formData.merit_id}
                  onChange={handleChange}
                >
                  <option value="">Select Merit</option>
                  {meritFormulas.map((item: any, index: number) => {
                    return (
                      <option value={item?.id} key={index}>
                        {item?.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <FormErrorMessage error={errors.merit_id} />
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <div className="buttons">
            <button
              className="lg-rounded-btn gray"
              type="button"
              onClick={resetForm}
            >
              Reset
            </button>
            {!params?.id ? (
              <button
                className="lg-rounded-btn black"
                onClick={handleSubmit((data) => onSubmit(data, true))}
              >
                Save & Add more
              </button>
            ) : (
              ""
            )}
            <button
              className="lg-rounded-btn"
              onClick={handleSubmit((data) => onSubmit(data))}
            >
              {params?.id ? "Update" : "Save"} & Exit
            </button>
          </div>
        </div>
      </CreateLinkMeritListSection>
    </CreateLinkMeritListMain>
  );
};

export default CreateAddLinkMeritList;
