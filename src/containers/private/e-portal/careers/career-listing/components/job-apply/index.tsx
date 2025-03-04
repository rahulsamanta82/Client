import { FC, useState } from "react";
import { AddEntryTestMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import { useForm } from "react-hook-form";
import useEportal from "containers/private/e-portal/useHooks";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { JobApplyDTO } from "utils/helpers/models/e-portal/job-application.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { warningToaster } from "utils/helpers/common/alert-service";

interface JobApplyModalProps {
  setOpen: Function;
  jobCampuses: any[];
  jobDepartments: any[];
  jobTypes: any[];
  job_id: number;
}

const JobApplyModal: FC<JobApplyModalProps> = ({
  setOpen,
  jobCampuses,
  jobDepartments,
  jobTypes,
  job_id
}) => {
  const [formData, setFormData] = useState<JobApplyDTO>({ ...new JobApplyDTO(), job_id: `${job_id}` });
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<JobApplyDTO>();

  const { createJobApplication } = useEportal();
  const onSubmit = () => {
    if (!formData.accept) {
      warningToaster("Please accept the conditions");
    } else {
      createJobApplication(formData, setOpen);
    }
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    setFormData({ ...formData, [name]: value });
    trigger(name);
  };

  const resetForm = () => {
    setFormData({ ...new JobApplyDTO() });
    for (let key in getValues()) {
      setValue(key as keyof JobApplyDTO, "");
    }
  };

  const handleAcceptanceChange = (event: any) => {
    const { checked } = event.target;
    formData.accept = checked ? 1 : 0;
    setFormData({ ...formData });
    setValue('accept', formData.accept);
  }

  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  return (
    <AddEntryTestMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Apply</span>
            </div>
            <div className="close-icon cp" onClick={() => setOpen(false)}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="common-fields">
              <div className="input-field">
                <label htmlFor="">Department</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      {...register("department", { required: true })}
                      value={formData.department}
                      onChange={handleChange}
                    >
                      <option value="">Select Department</option>
                      {jobDepartments.map((dept, index) => {
                        return (
                          <option value={dept.id} key={index}>
                            {dept.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.department} />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Job Type</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      {...register("job_type", { required: true })}
                      value={formData.job_type}
                      onChange={handleChange}
                    >
                      <option value="">Select Job Type</option>
                      {jobTypes.map((type, index) => {
                        return (
                          <option value={type.id} key={index}>
                            {type.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.job_type} />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Campus</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      {...register("campus", { required: true })}
                      value={formData.campus}
                      onChange={handleChange}
                    >
                      <option value="">Select Campus</option>
                      {jobCampuses.map((campus, index) => {
                        return (
                          <option value={campus.id} key={index}>
                            {campus.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.campus} />
                </div>
              </div>
            </div>
            <div className="job-description">
              <div>
                <p className="des-title">Undertaking by the Applicant:</p>
              </div>
              <div className="description">
                It is solemnly affirmed that facts & figures given are true to
                the best of my knowledge. Any false information, given by me,
                shall automatically disqualify me from the candidature of the
                post applied for.
              </div>
            </div>

            <div className="checkbox-field">
              <input
                type="checkbox"
                id="accept"
                checked={formData.accept == 1}
                onChange={handleAcceptanceChange}
              />
              <label htmlFor="accept">Yes, I accept it.</label>
            </div>

            <div className="action-buttons">
              {isLoading ? (
                <div className="sm-primary-loader"></div>
              ) : (
                <div className="buttons">
                  <button
                    className="lg-rounded-btn gray"
                    type="reset"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>

                  <button className="lg-rounded-btn">{"Apply"}</button>
                </div>
              )}
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </AddEntryTestMain>
  );
};

export default JobApplyModal;
