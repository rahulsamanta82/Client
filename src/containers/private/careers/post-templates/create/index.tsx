import { FC, useEffect, useState } from "react";
import {
  CreatePostTemplateSection,
  CreatePostTemplateMain,
  CreatePostTemplateTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { JobTemplateDTO } from "utils/helpers/models/careers/job-template.dto";
import { useForm } from "react-hook-form";
import useCareers from "../../useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useOrganization from "containers/private/organization/useHooks";
import { JobDesignationDTO } from "utils/helpers/models/careers/designation.dto";
import { FinanceApplicationDTO } from "utils/helpers/models/finance/application.dto";
import useFinance from "containers/private/finance/useHooks";

const CreatePostTemplate: FC = () => {
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<JobTemplateDTO>();
  let [formData, setFormData] = useState<JobTemplateDTO>(new JobTemplateDTO());
  const [certificateLevels, setCertificateLevels] = useState<any[]>([]);
  const [designations, setDesignations] = useState<JobDesignationDTO[]>([]);
  const [applications, setApplications] = useState<FinanceApplicationDTO[]>([]);
  const [vouchers, setVouchers] = useState<FinanceApplicationDTO[]>([]);
  const {
    createJobTemplate,
    updateJobTemplate,
    getJobTemplateById,
    getJobDesignations,
  } = useCareers();

  const { getFinanceApplications, getVoucherTemplateHeaders } = useFinance();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const { getCertificateLevelsAdmin } = useOrganization();

  const onSubmit = () => {
    if (params?.id) {
      updateJobTemplate(params?.id, formData);
    } else {
      createJobTemplate(formData);
    }
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    formData = new JobTemplateDTO();
    for (let key in formData) {
      setValue(
        key as keyof JobTemplateDTO,
        formData[key as keyof JobTemplateDTO]
      );
    }
    setFormData({ ...formData });
  };

  useEffect(() => {
    if (params?.id) {
      getJobTemplateById(params?.id, formData, setValue, setFormData);
    }
    getCertificateLevelsAdmin(setCertificateLevels);
    getJobDesignations(setDesignations);
    getFinanceApplications(setApplications);
    getVoucherTemplateHeaders(setVouchers);
  }, []);
  console.log(vouchers);

  return (
    <CreatePostTemplateMain>
      <CreatePostTemplateTop>
        <div className="left">
          <span className="page-heading">Add Post Templates</span>
          <Breadcrumb />
        </div>
      </CreatePostTemplateTop>

      <CreatePostTemplateSection
        className="p-custom-scrollbar-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="heading-div">
          <p className="main-heading">General Requirements</p>
        </div>
        <form>
          <div className="common-fields">
            <div className="input-field">
              <label>Designation</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    {...register("designation_id", { required: true })}
                    value={formData.designation_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Designation</option>
                    {designations.map((designation, index) => {
                      return (
                        <option value={designation.id} key={index}>
                          {designation.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.designation_id} />
              </div>
            </div>

            <div className="input-field">
              <label>Title</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: true })}
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.title} />
              </div>
            </div>

            <div className="input-field ">
              <label>Required Experience (Years) </label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    {...register("required_experience", { required: true })}
                    value={formData.required_experience}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.required_experience} />
              </div>
            </div>
            <div className="input-field ">
              <label>Finance Application</label>
              <div className="field-wrap">
                <div className="field">
                  <select>
                    <option value="">Select Application</option>
                    {applications?.map((item: any) => {
                      return <option value="">{item?.title}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="input-field ">
              <label>Fee Template</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">Select Fee Template</option>
                    {vouchers.map((item: any) => {
                      return <option value="">{item.title}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="input-field">
              <label>Pay Scale</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    {...register("pay_scale", { required: true })}
                    value={formData.pay_scale}
                    onChange={handleChange}
                    placeholder="Pay Scale"
                  />
                </div>
                <FormErrorMessage error={errors.pay_scale} />
              </div>
            </div>

            <div className="input-field">
              <label>Eligbility</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    {...register("eligibility", { required: true })}
                    value={formData.eligibility}
                    onChange={handleChange}
                  >
                    <option value="">Select Eligibility</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <FormErrorMessage error={errors.eligibility} />
              </div>
            </div>
            <div className="input-field">
              <label>Application</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    {...register("acc_application_id", { required: true })}
                    value={formData.acc_application_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Application</option>
                    {applications.map((app, index) => {
                      return (
                        <option value={app.id} key={index}>
                          {app.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.acc_application_id} />
              </div>
            </div>

            <div className="input-field">
              <label>Minimum Age </label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    {...register("age_min", { required: true })}
                    value={formData.age_min}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.age_min} />
              </div>
            </div>
            <div className="input-field">
              <label>Minimum Age </label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    {...register("age_max", { required: true })}
                    value={formData.age_max}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.age_max} />
              </div>
            </div>
            <div className="input-field">
              <label>Challan Fee </label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    {...register("challan_fee", { required: true })}
                    value={formData.challan_fee}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.challan_fee} />
              </div>
            </div>

            <div className="input-field">
              <label>Minimum Qualifications </label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    {...register("min_qualification", { required: true })}
                    value={formData.min_qualification}
                    onChange={handleChange}
                  >
                    <option value="">Select Minimum Qualifications</option>
                    {certificateLevels.map((level: any, index: number) => {
                      return (
                        <option value={level.id} key={index}>
                          {level.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.min_qualification} />
              </div>
            </div>
            <div className="input-field">
              <label>Description </label>
              <div className="field-wrap">
                <div className="field">
                  <textarea
                    {...register("description", { required: true })}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                  ></textarea>
                </div>
                <FormErrorMessage error={errors.description} />
              </div>
            </div>
          </div>
          <div className="heading-div">
            <p className="main-heading">Additional Requirements </p>
          </div>
          <div className="common-fields">
            <div className="input-field">
              <label>Research </label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="text"
                    placeholder="Research"
                    {...register("research", { required: true })}
                    value={formData.research}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.research} />
              </div>
            </div>

            <div className="input-field">
              <label>Preferences </label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="text"
                    placeholder="Preferences"
                    {...register("preferences", { required: true })}
                    value={formData.preferences}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.preferences} />
              </div>
            </div>
            <div className="input-field">
              <label>Note: </label>
              <div className="field-wrap">
                <div className="field">
                  <textarea
                    {...register("additional_notes", { required: true })}
                    value={formData.additional_notes}
                    onChange={handleChange}
                    cols={10}
                    rows={2}
                    placeholder="Additional Note"
                    className="textarea"
                  ></textarea>
                </div>
                <FormErrorMessage error={errors.additional_notes} />
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
              <button
                className="lg-rounded-btn"
                type="button"
                onClick={handleSubmit(onSubmit)}
              >
                Save & Exit
              </button>
            </div>
          </div>
        </form>
      </CreatePostTemplateSection>
    </CreatePostTemplateMain>
  );
};

export default CreatePostTemplate;
