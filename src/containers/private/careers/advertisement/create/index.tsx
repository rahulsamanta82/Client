import { FC, useEffect, useState } from "react";
import {
  CreateAdvertisementTop,
  CreateAdvertisementFormSection,
  CreateAdvertisementMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { JobBatchDTO } from "utils/helpers/models/careers/job-batch.dto";
import useUtils from "hooks/useUtils";
import useCareers from "../../useHooks";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";

interface CreateAdmissionCampaignProps { }

const CreateAdvertisement: FC<CreateAdmissionCampaignProps> = () => {
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<JobBatchDTO>();
  let [formData, setFormData] = useState<JobBatchDTO>(new JobBatchDTO());
  const { createJobBatch, updateJobBatch, getJobBatchById } = useCareers();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const onSubmit = () => {
    if (params?.id) {
      updateJobBatch(params?.id, formData);
    } else {
      createJobBatch(formData);
    }
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    console.log(name, value)
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  const resetForm = () => {
    formData = new JobBatchDTO();
    for (let key in formData) {
      setValue(key as keyof JobBatchDTO, formData[key as keyof JobBatchDTO]);
    }

    setFormData({ ...formData });
  }

  useEffect(() => {
    if (params?.id) getJobBatchById(params?.id, formData, setValue, setFormData);
  }, []);


  return (
    <CreateAdvertisementMain>
      <CreateAdvertisementTop>
        <div className="heading">
          <span className="page-heading">Add Advertisement </span>
          <Breadcrumb />
        </div>
      </CreateAdvertisementTop>

      <CreateAdvertisementFormSection className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
        <div className="common-fields">
          <div className="input-field">
            <label>Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Title" {...register('title', { required: true })} value={formData.title} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.title} />
              <FormErrorMessage error={errors.title} />
            </div>
          </div>
          <div className="input-field">
            <label>Start Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" {...register('start_date', { required: true })} value={formData.start_date} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.start_date} />
              <FormErrorMessage error={errors.start_date} />
            </div>
          </div>

          <div className="input-field">
            <label>End Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" {...register('end_date', { required: true })} value={formData.end_date} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.end_date} />
              <FormErrorMessage error={errors.end_date} />
            </div>
          </div>
          <div className="radio-field">
            <label>Status</label>
            <div className="field-wrap">
              <div className="field">
                <input type="radio" {...register('is_active', { required: true })} onChange={handleChange} id="active" checked={formData.is_active == 1} value={1} />
                <label htmlFor="active">Active</label>
              </div>
              <div className="field">
                <input type="radio" id="deactivate" {...register('is_active', { required: true })} value={0} onChange={handleChange} checked={formData.is_active == 0} />
                <label htmlFor="deactivate">Deactivate</label>
              </div>
            </div>
            <FormErrorMessage error={errors.is_active} />
            <FormErrorMessage error={errors.is_active} />
          </div>
          <div className="input-field">
            <label htmlFor="batch-type">Batch Type</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register('batch_type', { required: true })} value={formData.batch_type} onChange={handleChange}>
                  <option value={1}>Teaching</option>
                  <option value={0}>Non-teaching</option>
                </select>
              </div>
              <FormErrorMessage error={errors.batch_type} />
            </div>
            <FormErrorMessage error={errors.start_date} />
          </div>
        </div>
        <div className="action-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
              Reset
            </button>
            <button className="lg-rounded-btn">
              Submit
            </button>
          </div>
        </div>
      </CreateAdvertisementFormSection>
    </CreateAdvertisementMain>
  );
};

export default CreateAdvertisement;
