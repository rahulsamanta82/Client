import { FC, useEffect, useState } from "react";
import { AddEntryTestMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useEportal from "containers/private/e-portal/useHooks";
import { useSelector } from "react-redux";
import { ReferenceInfoDTO } from "utils/helpers/models/e-portal/reference-info.dto";
import { JobDesignationDTO } from "utils/helpers/models/careers/designation.dto";

interface AddEntryTestProps {
  setOpen: Function;
  reference?: ReferenceInfoDTO | null;
}

const AddRefrence: FC<AddEntryTestProps> = ({ setOpen, reference }) => {
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<ReferenceInfoDTO>();
  const [formData, setFormData] = useState<ReferenceInfoDTO>(new ReferenceInfoDTO());
  const { createReferenceInfo, updateReferenceInfo } = useEportal();
  const onSubmit = (data: ReferenceInfoDTO, addMore: boolean = false) => {
    if (reference?.id) {
      updateReferenceInfo(reference?.id, formData, setOpen);
    } else {
      createReferenceInfo(formData, setOpen, addMore, resetForm);
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

  const resetForm = () => {
    const initialForm: any = new ReferenceInfoDTO();
    for (let key in formData) {
      setValue(key as keyof ReferenceInfoDTO, initialForm[key]);
      (formData as any)[key] = initialForm[key];
    }

    setFormData({ ...formData });
  }

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (reference?.id) {
      for (let key in formData) {
        (formData as any)[key] = (reference as any)[key];
        setValue(key as keyof ReferenceInfoDTO, (formData as any)[key]);
      }

      setFormData({ ...formData });
    }
  }, []);

  return (
    <AddEntryTestMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>References </span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form onSubmit={handleSubmit(data => onSubmit(data))}>
            <div className="common-fields">
              <div className="input-field">
                <label>Reference Name</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      placeholder="Enter Your Reference Name"
                      {...register('name', { required: true })}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.name} />
                </div>
              </div>
              <div className="input-field">
                <label>Designation</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      {...register('designation', { required: true })}
                      value={formData.designation}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.designation} />
                </div>
              </div>
              <div className="input-field">
                <label>Organization</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      placeholder="Enter Your Reference Organization"
                      {...register('organization', { required: true })}
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.organization} />
                </div>
              </div>
              <div className="input-field">
                <label>Relationship</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      placeholder="Enter Your  Relationship with Reference"
                      {...register('relationship', { required: true })}
                      value={formData.relationship}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.relationship} />
                </div>
              </div>
              <div className="input-field">
                <label>Contact</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      placeholder="Enter Your Reference Contact"
                      {...register('contact', { required: true })}
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.contact} />
                </div>
              </div>
              <div className="input-field">
                <label>Email</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      placeholder="Enter Your Reference Email"
                      {...register('email', { required: true })}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.email} />
                </div>
              </div>
            </div>
            {<div className="action-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" onClick={resetForm}>
                  Reset
                </button>

                {!reference?.id && <button className="lg-rounded-btn black" onClick={handleSubmit(data => onSubmit(data, true))}>
                  Save & Add More
                </button>}

                <button className="lg-rounded-btn" onClick={handleSubmit(data => onSubmit(data))}>
                  {reference?.id ? 'Update' : 'Save'}
                </button>
              </div>
            </div>}
          </form>
        </ContentWrapper>
      </Container>
    </AddEntryTestMain>
  );
};

export default AddRefrence;
