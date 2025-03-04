import { FC, useEffect, useState } from "react";
import { UnlockMain, UnlockContainer, UnlockWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import useAdmissions from "containers/private/admissions/useHooks";

interface ManageCriteriaProps {
  setOpen: Function;
  automationId: number;
}

const BulkUnlockStep: FC<ManageCriteriaProps> = ({ setOpen, automationId }) => {
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({ program: [] });
  const { bulkUnlock, createBulkUnLock } = useAdmissions();

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSelect = (id: number, index: number) => {
    if (formData.program.includes(id)) {
      formData.program.splice(index, 1);
    } else {
      formData.program.push(id);
    }

    setFormData({ ...formData });
  };

  useEffect(() => {
    bulkUnlock(automationId, setData);
  }, []);

  const onSubmit = () => {
    createBulkUnLock(automationId, formData, handleCloseModal);
  };

  return (
    <UnlockMain>
      <UnlockContainer>
        <UnlockWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Choose List To Unlock</span>
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
                    {data.length > 0 ? (
                      data.map((program: any, index: number) => (
                        <li
                          key={index}
                          onClick={() => handleSelect(program.id, index)}
                        >
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              checked={formData.program.includes(program.id)}
                            />
                          </div>
                          <div className="item-text">
                            <span className="text">{program.title}</span>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p>Record Not Found</p>
                    )}
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
                  className="lg-rounded-btn primary"
                  type="button"
                  disabled={!formData?.program?.length}
                  onClick={onSubmit}
                >
                  Save & Close
                </button>
              </div>
            </div>
          </form>
        </UnlockWrapper>
      </UnlockContainer>
    </UnlockMain>
  );
};

export default BulkUnlockStep;
