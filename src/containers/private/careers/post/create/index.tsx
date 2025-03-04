import { FC, useState, useEffect } from "react";
import { CreatePostSection, CreatePostMain, CreatePostTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { JobPostDTO } from "utils/helpers/models/careers/job-post.dto";
import useUtils from "hooks/useUtils";
import useCareers from "../../useHooks";
import { useForm } from "react-hook-form";
import { JobTemplateDTO } from "utils/helpers/models/careers/job-template.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { JobBatchDTO } from "utils/helpers/models/careers/job-batch.dto";
import useOrganization from "containers/private/organization/useHooks";
import { JobTypeDTO } from "utils/helpers/models/careers/job-type.dto";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import useComponentVisible from "hooks/click-outside";
import { warningToaster } from "utils/helpers/common/alert-service";

const CreatePost: FC = () => {
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<JobPostDTO>();
  let [formData, setFormData] = useState<JobPostDTO>(new JobPostDTO());
  const [searchCampus, setSearchCampus] = useState<string>('');
  const [searchDepartment, setSearchDepartment] = useState<string>('');
  const [searchJobType, setSearchJobType] = useState<string>('');
  const [jobTemplates, setJobTemplates] = useState<JobTemplateDTO[]>([]);
  const [jobBatches, setJobBatches] = useState<JobBatchDTO[]>([]);
  const [jobTypes, setJobTypes] = useState<JobTypeDTO[]>([]);
  const [orgStructures, setOrgStructures] = useState<any[]>([]);
  const [searchedCampuses, setSearchedCampuses] = useState<any[]>([]);
  const [searchedDepartments, setSearchedDepartments] = useState<any[]>([]);
  const [searchedJobTypes, setSearchedJobTypes] = useState<any[]>([]);
  const { ref: departmentRef, isComponentVisible: showDepartmentDropdown, setIsComponentVisible: setShowDepartmentDropdown } = useComponentVisible(false);
  const { ref: campusRef, isComponentVisible: showCampusDropdown, setIsComponentVisible: setShowCampusDropdown } = useComponentVisible(false);
  const { ref: jobTypeRef, isComponentVisible: showJobTypeDropdown, setIsComponentVisible: setShowJobTypeDropdown } = useComponentVisible(false);
  const { createJobPost, updateJobPost, getJobPostById, getJobTemplates, getJobBatches, getJobTypes } = useCareers();
  const { getOrgStructures } = useOrganization();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const onSubmit = () => {
    if (!formData.job_type_id.length) {
      warningToaster('Select atleast one job type');
    } else if (!formData.department_id.length) {
      warningToaster('Select atleast one department');
    } else if (!formData.campus_id.length) {
      warningToaster('Select atleast one campus');
    } else {
      if (params?.id) {
        updateJobPost(params?.id, formData);
      } else {
        createJobPost(formData);
      }
    }
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  const resetForm = () => {
    formData = new JobPostDTO();
    for (let key in formData) {
      setValue(key as keyof JobPostDTO, formData[key as keyof JobPostDTO]);
    }

    setFormData({ ...formData });
  }

  const onSelectCampus = (campus: any) => {
    const { selected, id } = campus;
    const updatedCampusIds = selected
      ? [...formData.campus_id, id]
      : formData.campus_id.filter((campusId) => campusId !== id);

    setFormData({ ...formData, campus_id: updatedCampusIds });
  }

  const onSelectDepartment = (department: any) => {
    const { selected, id } = department;
    const updatedDepartmentIds = selected
      ? [...formData.department_id, id]
      : formData.department_id.filter((deptId) => deptId !== id);

    setFormData({ ...formData, department_id: updatedDepartmentIds });
  }

  const onSelectJobType = (jobType: any) => {
    const { selected, id } = jobType;
    const updatedJobTypeIds = selected
      ? [...formData.job_type_id, id]
      : formData.job_type_id.filter((jobTypeId) => jobTypeId !== id);

    setFormData({ ...formData, job_type_id: updatedJobTypeIds });
  }

  const handleCampusSearchChange = (event: any) => {
    const { value } = event.target;
    setSearchCampus(value);
    const campusHelper = orgStructures.filter((strcuture) =>
      strcuture.title.toLowerCase().includes(searchCampus.toLowerCase())
    );
    setSearchedCampuses([...campusHelper]);
  };
  const handleDeptSearchChange = (event: any) => {
    const { value } = event.target;
    setSearchDepartment(value);
    const deptHelper = orgStructures.filter((strcuture) =>
      strcuture.title.toLowerCase().includes(searchDepartment.toLowerCase())
    );
    setSearchedDepartments([...deptHelper]);
  };
  const handleJobTypeSearchChange = (event: any) => {
    const { value } = event.target;
    setSearchJobType(value);
    const jobTypeHelper = jobTypes.filter((jobType) =>
      jobType.title.toLowerCase().includes(searchJobType.toLowerCase())
    );
    setSearchedJobTypes([...jobTypeHelper]);
  };

  useEffect(() => {
    if (params?.id) {
      getJobPostById(params?.id, formData, setValue, setFormData);
    }
    getJobTemplates(setJobTemplates);
    getJobBatches(setJobBatches);
    getOrgStructures(setOrgStructures);
    getJobTypes(setJobTypes);
  }, []);

  return (
    <CreatePostMain>
      <CreatePostTop>
        <div className="left">
          <span className="page-heading">{params?.id ? 'Update' : 'Add'} Post</span>
          <Breadcrumb />
        </div>
      </CreatePostTop>

      <CreatePostSection className="p-custom-scrollbar-8">
        <form>
          <div className="m-common-fields">
            <div className="input-field">
              <label>Select Template</label>
              <div className="field-wrap">
                <div className="field">
                  <select {...register('template_id', { required: true })} value={formData.template_id} onChange={handleChange}>
                    <option value="">Select Template</option>
                    {jobTemplates.map((template, index) => {
                      return <option value={template.id} key={index}>{template.title}</option>
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.template_id} />
              </div>
            </div>

            <div className="input-field">
              <label>Advertisement Number</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" placeholder="Advertisement Number" {...register('add_no', { required: true })} value={formData.add_no} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.add_no} />
              </div>
            </div>

            <div className="input-field">
              <label>Select Batch</label>
              <div className="field-wrap">
                <div className="field">
                  <select {...register('batch_id', { required: true })} value={formData.batch_id} onChange={handleChange}>
                    <option value="">Select Batch</option>
                    {jobBatches.map((batch, index) => {
                      return <option value={batch.id} key={index}>{batch.title}</option>
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.batch_id} />
              </div>
            </div>
            <div className="input-field">
              <label>Case Number</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" placeholder="Case Number" {...register('case_no', { required: true })} value={formData.case_no} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.case_no} />
              </div>
            </div>

            <div className="input-field">
              <label>Post for Women</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" placeholder="Post for Women" {...register('women_post', { required: true })} value={formData.women_post} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.women_post} />
              </div>
            </div>

            <div className="input-field">
              <label>Post for Disabled Person </label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" placeholder="Post for Disabled Person" {...register('disabled_post', { required: true })} value={formData.disabled_post} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.disabled_post} />
              </div>
            </div>
            <div className="input-field">
              <label>Post for Minorities </label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" placeholder="Post for Minorities" {...register('minorities_post', { required: true })} value={formData.minorities_post} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.minorities_post} />
              </div>
            </div>

            <div className="input-field">
              <label>Special Quota </label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" placeholder="Special Quota" {...register('special_quota', { required: true })} value={formData.special_quota} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.special_quota} />
              </div>
            </div>

            <div className="input-field">
              <label>Closing Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" {...register('closing_date', { required: true })} value={formData.closing_date} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.closing_date} />
              </div>
            </div>
            <div className="input-field">
              <label>in House Closing Date </label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" {...register('in_house_date', { required: true })} value={formData.in_house_date} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.in_house_date} />
              </div>
            </div>

            <div className="input-field">
              <label>For internal Employees?</label>
              <div className="field-wrap">
                <div className="field">
                  <select {...register('internal_employee', { required: true })} value={formData.internal_employee} onChange={handleChange}>
                    <option value="">Select one</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
                <FormErrorMessage error={errors.internal_employee} />
              </div>
            </div>

            <div className="input-field">
              <label>Allow admin users to apply for this post</label>
              <div className="field-wrap">
                <div className="field">
                  <select {...register('in_house_user', { required: true })} value={formData.in_house_user} onChange={handleChange}>
                    <option value="">Select one</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
                <FormErrorMessage error={errors.in_house_user} />
              </div>
            </div>
          </div>
          <div className="m-common-fields">
            <div className="multiselect-field" ref={campusRef}>
              <div className="input-field" onClick={() => setShowCampusDropdown(true)}>
                <label>Campuses</label>
                <div className="field-wrap">
                  <div className="field">
                    <div className="selected-items">
                      <input
                        type="search"
                        placeholder="Select Campus"
                        value={searchCampus}
                        onChange={handleCampusSearchChange}
                      />
                      {formData.campus_id.length ? (
                        <div className="item">
                          {formData.campus_id.length} selected
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {showCampusDropdown && (
                <MultiselectDropdown
                  options={searchCampus === "" ? orgStructures : searchedCampuses}
                  onSelect={onSelectCampus}
                  value={formData.campus_id}
                />
              )}
            </div>
            <div className="multiselect-field" ref={departmentRef}>
              <div className="input-field" onClick={() => setShowDepartmentDropdown(true)}>
                <label>Departments</label>
                <div className="field-wrap">
                  <div className="field">
                    <div className="selected-items">
                      <input
                        type="search"
                        placeholder="Select Department"
                        value={searchDepartment}
                        onChange={handleDeptSearchChange}
                      />
                      {formData.department_id.length ? (
                        <div className="item">
                          {formData.department_id.length} selected
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {showDepartmentDropdown && (
                <MultiselectDropdown
                  options={searchDepartment === "" ? orgStructures : searchedDepartments}
                  onSelect={onSelectDepartment}
                  value={formData.department_id}
                />
              )}
            </div>
            <div className="multiselect-field" ref={jobTypeRef}>
              <div className="input-field" onClick={() => setShowJobTypeDropdown(true)}>
                <label>Job Types</label>
                <div className="field-wrap">
                  <div className="field">
                    <div className="selected-items">
                      <input
                        type="search"
                        placeholder="Select Job Type"
                        value={searchJobType}
                        onChange={handleJobTypeSearchChange}
                      />
                      {formData.job_type_id.length ? (
                        <div className="item">
                          {formData.job_type_id.length} selected
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {showJobTypeDropdown && (
                <MultiselectDropdown
                  options={searchJobType === "" ? jobTypes : searchedJobTypes}
                  onSelect={onSelectJobType}
                  value={formData.job_type_id}
                />
              )}
            </div>
          </div>
          <div className="action-buttons">
            <div className="buttons">
              <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                Reset
              </button>
              <button className="lg-rounded-btn" type="button" onClick={handleSubmit(onSubmit)}>Save & Exit</button>
            </div>
          </div>
        </form>
      </CreatePostSection>
    </CreatePostMain>
  );
};

export default CreatePost;
