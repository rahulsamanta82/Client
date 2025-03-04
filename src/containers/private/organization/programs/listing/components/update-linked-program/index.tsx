import { FC, useState } from "react";
import { ManageCriteriaMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { useSelector } from "react-redux";
import useUtils from "hooks/useUtils";
import { UpdateLinkedProgramDTO } from "utils/helpers/models/admissions/update-linked-program.dto";
import useAdmissions from "containers/private/admissions/useHooks";

interface ManageCriteriaProps {
  setOpen: Function;
  admissionSession: any;
  setPrograms: Function;
  programs: any[];
}

const UpdateLinkedProgram: FC<ManageCriteriaProps> = ({ setOpen, admissionSession, programs, setPrograms }) => {
  const { id, class_start_date, fee_due_date, admission_status } = admissionSession;
  const { getDateFromDateTime } = useUtils();
  const [formData, setFormData] = useState<UpdateLinkedProgramDTO>(
    { admission_session_id: id, class_start_date: getDateFromDateTime(class_start_date), fee_due_date: getDateFromDateTime(fee_due_date), admission_status }
  );
  const { updateLinkedProgram } = useAdmissions();
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
    setValue,
  } = useForm<UpdateLinkedProgramDTO>();

  const onSubmit = () => {
    updateLinkedProgram(formData, setOpen, programs, setPrograms);
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    setFormData({ ...formData, [name]: value });
    trigger(name);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  return (
    <ManageCriteriaMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Update Linked Program</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="common-fields">
              <div className="input-field">
                <label>Class Start Date</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="date"
                      {...register("class_start_date", { required: true })}
                      value={formData.class_start_date}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.class_start_date} />
                </div>
              </div>
              <div className="input-field">
                <label>Processing Fee Due Date</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="date"
                      {...register("fee_due_date", { required: true })}
                      value={formData.fee_due_date}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.fee_due_date} />
                </div>
              </div>
              <div className="radio-field">
                <label>Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <label htmlFor="is-active-yes">Active</label>
                    <input
                      type="radio"
                      id="is-active-yes"
                      value={1}
                      checked={formData.admission_status == 1}
                      {...register("admission_status", { required: true })}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="is-active-no">Deactivate</label>
                    <input
                      type="radio"
                      id="is-active-no"
                      value={0}
                      checked={formData.admission_status == 0}
                      {...register("admission_status", { required: true })}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <FormErrorMessage error={errors.admission_status} />
              </div>
            </div>
            <div className="action-buttons">
              {isLoading ? (
                <div className="sm-primary-loader"></div>
              ) : (
                <div className="buttons">
                  <button
                    className="lg-rounded-btn gray"
                    type="reset"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>

                  <button
                    className="lg-rounded-btn"
                  >
                    Save & Close
                  </button>
                </div>
              )}
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </ManageCriteriaMain>
  );
};

export default UpdateLinkedProgram;
