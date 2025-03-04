import { FC, useEffect, useState } from "react";
import { QualificationTestMain, ContentWrapper, Container } from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";
import { EmployementInfoDTO } from "utils/helpers/models/e-portal/employement-info.dto";
import { useForm } from "react-hook-form";
import useEportal from "containers/private/e-portal/useHooks";
import useUtils from "hooks/useUtils";
import { JobDesignationDTO } from "utils/helpers/models/careers/designation.dto";
import dummySquareAvatar from 'assets/images/common/others/dummy-avatar.png'
import FormErrorMessage from "components/particles/forms/form-error-message";
import { warningToaster } from "utils/helpers/common/alert-service";

interface AddEmployementInfoProps {
  setOpen: Function;
  employement?: EmployementInfoDTO | null;
}

const AddEmployment: FC<AddEmployementInfoProps> = ({ setOpen, employement }) => {
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<EmployementInfoDTO>();
  const [formData, setFormData] = useState<EmployementInfoDTO>(new EmployementInfoDTO());
  const { createEmployementInfo, updateEmployementInfo, getJobDesignations } = useEportal();
  const [designations, setDesignations] = useState<JobDesignationDTO[]>([]);
  const { compareDateStrings } = useUtils();

  const onSubmit = (data: EmployementInfoDTO, addMore: boolean = false) => {
    if (!formData.document_path) {
      warningToaster('Please upload the certificate');
      return;
    } else if (!compareDateStrings(formData.periodfrom, formData.periodto)) {
      warningToaster('From date should be before To date');
      return;
    }
    const body = new FormData();
    for (let key in formData) {
      body.append(key, key === 'document_path' ? data[key] : formData[key as keyof EmployementInfoDTO]);
    }
    if (employement?.id) {
      updateEmployementInfo(employement?.id, body, setOpen);
    } else {
      createEmployementInfo(body, setOpen, addMore, resetForm);
    }
  }

  const handleChange = (event: any) => {
    const { value, name, checked = false } = event.target;
    if (name === 'is_continue') {
      (formData as any)[name] = checked ? 1 : 0;
    } else {
      (formData as any)[name] = value;
    }
    setValue(name, (formData as any)[name]);
    trigger(name);
    setFormData({ ...formData });
  }

  const handleFileUpload = (event: any) => {
    const { name, files } = event.target;
    const file = files[0];
    setValue(name, file);
    setFormData({ ...formData, [name]: URL.createObjectURL(file) });
    trigger([name]);
  };

  const resetForm = () => {
    const initialForm: any = new EmployementInfoDTO();
    for (let key in formData) {
      setValue(key as keyof EmployementInfoDTO, initialForm[key]);
      (formData as any)[key] = initialForm[key];
    }

    setFormData({ ...formData });
  }

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    getJobDesignations(setDesignations);
    if (employement?.id) {
      for (let key in formData) {
        (formData as any)[key] = (employement as any)[key];
        setValue(key as keyof EmployementInfoDTO, (formData as any)[key]);
      }

      setFormData({ ...formData });
    }
  }, []);

  return (
    <QualificationTestMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Employment Information </span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form onSubmit={handleSubmit(data => onSubmit(data))}>
            <div className="common-fields">
              <div className="input-field">
                <label>Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      placeholder="Enter your Employment Name"
                      {...register('employer_name', { required: true })}
                      value={formData.employer_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <FormErrorMessage error={errors.employer_name} />
              </div>
              <div className="input-field">
                <label>Designation/ Appointment</label>
                <div className="field-wrap">
                  <div className="field">
                    <select {...register('designation_id', { required: true })}
                      value={formData.designation_id}
                      onChange={handleChange}>
                      <option value="">Select Designation</option>
                      {designations.map((designation, index) => {
                        return <option value={designation.id} key={index}>{designation.title}</option>
                      })}
                    </select>
                  </div>
                </div>
                <FormErrorMessage error={errors.designation_id} />
              </div>
              <div className="input-field">
                <label>Salary Drawn</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="number"
                      {...register('salary_drawn', { required: true })}
                      value={formData.salary_drawn}
                      onChange={handleChange}
                      placeholder="Enter The Salary Drawn"
                    />
                  </div>
                </div>
                <FormErrorMessage error={errors.salary_drawn} />
              </div>
              <div className="input-field">
                <label>From</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date"
                      {...register('periodfrom', { required: true })}
                      value={formData.periodfrom}
                      onChange={handleChange} />
                  </div>
                </div>
                <FormErrorMessage error={errors.periodfrom} />
              </div>
              <div className="input-field">
                <label>To</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date"
                      {...register('periodto', { required: true })}
                      value={formData.periodto}
                      onChange={handleChange} />
                  </div>
                </div>
                <FormErrorMessage error={errors.periodto} />
              </div>
              <div className="input-field">
                <label>Leaving reason</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text"
                      {...register('leavingreason', { required: true })}
                      value={formData.leavingreason}
                      placeholder="Reason to leave"
                      onChange={handleChange} />
                  </div>
                </div>
                <FormErrorMessage error={errors.leavingreason} />
              </div>
            </div>
            <div className="checkbox-field">
              <input type="checkbox" id="is_continue"
                checked={formData.is_continue == 1}
                name="is_continue"
                onChange={handleChange} />
              <label htmlFor="is_continue">Is Continue</label>
            </div>

            <div className="upload-field">
              <label>Profile Picture</label>
              <label className="field-wrapper">
                <div className="file-name-section">
                  <div className="inner-content">
                    <div className="upload-text">
                      <div className="upload-icon">
                        <SmallUploadSvg className="icon" />
                      </div>
                      { }
                      <span className="text">Upload document_path Document</span>
                    </div>
                    <div className="upload-restrictions">
                      Select a 300x300 jpg image with maximum size of 400 KB
                    </div>
                  </div>
                </div>
                <div className="uploaded-image">
                  <img src={formData.document_path ?? dummySquareAvatar} alt="" />
                </div>
                <input type="file" className="d-none" {...register('document_path', { required: false })} onChange={handleFileUpload} />
              </label>
            </div>

            <div className="action-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                  Reset
                </button>
                {employement?.id ? '' : <button className="lg-rounded-btn black" onClick={handleSubmit((data) => onSubmit(data, true))}>
                  Save & Add More
                </button>}
                <button className="lg-rounded-btn" onClick={handleSubmit((data) => onSubmit(data))}>
                  {employement?.id ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </QualificationTestMain>
  );
};

export default AddEmployment;
