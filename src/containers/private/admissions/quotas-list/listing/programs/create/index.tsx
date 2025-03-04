import { FC, useEffect, useState } from "react";
import {
  QuotaAddListProgramMain,
  QuotaAddListProgramContainer,
  QuotaAddListProgramWrapper,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import { useLocation } from "react-router-dom";
import useOrganization from "containers/private/organization/useHooks";
import { AddQuotaProgramLinkDTO } from "utils/helpers/models/admissions/add-quota-program-link.dto";
import useAdmissions from "containers/private/admissions/useHooks";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";

interface CreateQoutaListProgramProps {
  setOpen: (open: boolean) => void;
}

const CreateQoutaListProgram: FC<CreateQoutaListProgramProps> = ({
  setOpen,
}) => {
  const {
    state: { quota },
  } = useLocation();
  const [formData, setFormData] = useState<AddQuotaProgramLinkDTO>({
    ...new AddQuotaProgramLinkDTO(),
    quota_id: quota?.id,
  });
  const { getPrograms } = useOrganization();
  const [programs, setPrograms] = useState<any[]>([]);
  const { createQuotaProgramLink, getQuotaPrograms } = useAdmissions();

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    const queryParams = {
      quota_header_id: quota?.template?.id,
      per_page: "All",
      page: 1,
    };
    getQuotaPrograms(setPrograms, queryParams);
  }, []);

  const handleSelect = (program: any) => {
    const { id } = program;
    if (formData.adm_session_id.includes(id)) {
      const index = formData.adm_session_id.findIndex((p: any) => p.id === id);
      formData.adm_session_id.splice(index, 1);
    } else {
      formData.adm_session_id.push(id);
    }

    setFormData({ ...formData });
  };

  const onSubmit = () => {
    if (formData.adm_session_id) {
      createQuotaProgramLink(
        { ...formData, adm_session_id: formData.adm_session_id.join(",") },
        setOpen
      );
    } else {
      warningToaster(warningMessages.programsRequiredMsg);
    }
  };

  return (
    <QuotaAddListProgramMain>
      <QuotaAddListProgramContainer>
        <QuotaAddListProgramWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Add Programs for {quota?.title}</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>Programs</label>
                <div className="field-wrap">
                  <ul className="p-custom-scrollbar-8">
                    {programs.map((item: any, index: number) => (
                      <li key={index} onClick={() => handleSelect(item)}>
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            checked={formData.adm_session_id.includes(item?.id)}
                            readOnly
                          />
                        </div>
                        <div className="item-text">
                          <span className="text">{item.title}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
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
        </QuotaAddListProgramWrapper>
      </QuotaAddListProgramContainer>
    </QuotaAddListProgramMain>
  );
};

export default CreateQoutaListProgram;
