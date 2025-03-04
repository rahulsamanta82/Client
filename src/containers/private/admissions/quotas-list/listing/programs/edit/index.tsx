import { FC, useState } from "react";
import {
  EditQuotaListProgramMain,
  EditQuotaListProgramContainer,
  EditQuotaListProgramWrapper,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import { AddQuotaProgramLinkDTO } from "utils/helpers/models/admissions/add-quota-program-link.dto";
import useAdmissions from "containers/private/admissions/useHooks";
import useUtils from "hooks/useUtils";
import { useForm } from "react-hook-form";

interface CreateQoutaListProgramProps {
  setOpenEditModal: (open: boolean) => void;
  headerId: number;
}

const EditQoutaListProgram: FC<CreateQoutaListProgramProps> = ({
  setOpenEditModal,
  headerId,
}) => {
  const [formData, setFormData] = useState<AddQuotaProgramLinkDTO>({
    ...new AddQuotaProgramLinkDTO(),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<AddQuotaProgramLinkDTO>();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const { editProgramLinkQuota } = useAdmissions();

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };
  const onSubmit = async () => {
    try {
      await editProgramLinkQuota(headerId, formData);

      handleCloseModal();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <EditQuotaListProgramMain>
      <EditQuotaListProgramContainer>
        <EditQuotaListProgramWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              {/* <span>Edit Seats for {quota?.title}</span> */}
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>Quota Seats </label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="number"
                      placeholder="Quota Seats"
                      {...register("quota_seats", { required: true })}
                      value={formData.quota_seats}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Accounts</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="number"
                      placeholder="Account No."
                      {...register("acc_voucher_id", { required: true })}
                      value={formData.acc_voucher_id}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <div className="buttons">
                <button
                  className="lg-rounded-btn gray"
                  type="button"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  className="lg-rounded-btn"
                  type="button"
                  onClick={onSubmit}
                >
                  Save & Close
                </button>
              </div>
            </div>
          </form>
        </EditQuotaListProgramWrapper>
      </EditQuotaListProgramContainer>
    </EditQuotaListProgramMain>
  );
};

export default EditQoutaListProgram;
