import { FC, useEffect, useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import {
  CreateLinkedProgramEntryTestMain,
  CreateLinkedProgramEntryTestTop,
  CreateLinkedProgramEntryTestSection,
  Form,
} from "./style";
import useOrganization from "../../useHooks";
import { AddLinkProgramToEntryTestDTO } from "utils/helpers/models/organization/add-link-program-to-entry-test.dto";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useUtils from "hooks/useUtils";
import useAdmissions from "containers/private/admissions/useHooks";
import { useParams } from "react-router-dom";

interface CreateLinkedProgramEntryTestProps {}

const CreateLinkedProgramEntryTest: FC<
  CreateLinkedProgramEntryTestProps
> = () => {
  const {
    createEntryTestLink,
    updateEntryTestLink,
    getEntryTestLinkById,
    getProgramsForEntryTest,
  } = useOrganization();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const { getAdmissionEntryTests } = useAdmissions();
  let [formData, setFormData] = useState<AddLinkProgramToEntryTestDTO>(
    {...new AddLinkProgramToEntryTestDTO(), admission_session_id: params?.admission_session_id}
  );

  const [programs, setPrograms] = useState<any[]>([]);
  const [entryTests, setEntryTests] = useState<any[]>([]);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddLinkProgramToEntryTestDTO>();
  //   console.log(params.admission_session_id);

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (
    data: AddLinkProgramToEntryTestDTO,
    addMore: boolean = false
  ) => {
    if (params?.id) {
      updateEntryTestLink(params?.id, formData);
    } else {
      createEntryTestLink(formData, addMore, resetForm);
    }
  };

  const resetForm = () => {
    for (const key in formData) {
      setValue(key as keyof AddLinkProgramToEntryTestDTO, "");
    }

    setFormData({ ...new AddLinkProgramToEntryTestDTO() });
  };

  useEffect(() => {
    // getProgramsForEntryTest(setPrograms);
    getAdmissionEntryTests(setEntryTests);
    if (params?.id)
      getEntryTestLinkById(params?.id, formData, setValue, setFormData);
  }, []);


  return (
    <CreateLinkedProgramEntryTestMain>
      <CreateLinkedProgramEntryTestTop>
        <div className="left">
          <span className="page-heading">Link Program to Entry Test</span>
          <Breadcrumb />
        </div>
      </CreateLinkedProgramEntryTestTop>

      <CreateLinkedProgramEntryTestSection className="content-radius-shadow">
        <Form>
          <div className="filter-fields">
            {/* <div className="input-field">
              <label>Programs</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    {...register("admission_session_id", { required: true })}
                    value={formData.admission_session_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Program</option>
                    {programs.map((item: any, index: number) => {
                      return (
                        <option value={item.id} key={index}>
                          {item?.program?.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
               
              </div>
            </div> */}
            {/* <FormErrorMessage error={errors.admission_session_id} /> */}
            <div className="input-field">
              <label>Entry Test</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    {...register("test_id", { required: true })}
                    value={formData.test_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Entry Test</option>
                    {entryTests.map((entryTest: any, index: number) => {
                      return (
                        <option value={entryTest.id} key={index}>
                          {entryTest.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.test_id} />
              </div>
            </div>
            <div className="input-field">
              <label>Minimum Required Percentage</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    {...register("min_required_percentage", { required: true })}
                    value={formData.min_required_percentage}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.min_required_percentage} />
              </div>
            </div>
            <div className="input-field">
              <label>From Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="date"
                    {...register("from_date", { required: true })}
                    value={formData.from_date}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.from_date} />
              </div>
            </div>
            <div className="input-field">
              <label>To Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="date"
                    {...register("to_date", { required: true })}
                    value={formData.to_date}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.to_date} />
              </div>
            </div>
            <div className="input-field">
              <label>Result Awaiting</label>
              <div className="field-wrap">
                <div className="table-radio-field">
                  <div className="radio">
                    <input
                      type="radio"
                      id="result_awaiting_yes"
                      value="1"
                      {...register("allow_result_awaiting", { required: true })}
                      checked={formData.allow_result_awaiting == 1}
                      onChange={handleChange}
                    />
                    <label htmlFor="result_awaiting_yes">Allowed</label>
                  </div>
                  <div className="radio">
                    <input
                      type="radio"
                      value="0"
                      id="result_awaiting_no"
                      {...register("allow_result_awaiting", { required: true })}
                      checked={formData.allow_result_awaiting == 0}
                      onChange={handleChange}
                    />
                    <label htmlFor="result_awaiting_no">Not Allowed</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Status</label>
            <div className="field-wrap">
              <div className="table-radio-field">
                <div className="radio">
                  <input
                    type="radio"
                    value="1"
                    id="status-yes"
                    {...register("status", { required: true })}
                    checked={formData.status == 1}
                    onChange={handleChange}
                  />
                  <label htmlFor="status-yes">Active</label>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    value="0"
                    id="status-no"
                    {...register("status", { required: true })}
                    checked={formData.status == 0}
                    onChange={handleChange}
                  />
                  <label htmlFor="status-no">Deactive</label>
                </div>
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
              {!params?.id && (
                <button
                  className="lg-rounded-btn black"
                  onClick={handleSubmit((data: AddLinkProgramToEntryTestDTO) =>
                    onSubmit(data, true)
                  )}
                >
                  Save & Add More
                </button>
              )}
              <button
                className="lg-rounded-btn"
                onClick={handleSubmit((data: AddLinkProgramToEntryTestDTO) =>
                  onSubmit(data)
                )}
              >
                Save & Exit
              </button>
            </div>
          </div>
        </Form>
      </CreateLinkedProgramEntryTestSection>
    </CreateLinkedProgramEntryTestMain>
  );
};

export default CreateLinkedProgramEntryTest;
