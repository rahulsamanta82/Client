import { FC } from "react";
import { SettingModalMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";

interface SettingModalProps {
  setOpen: Function;
  id?: number;
}

const SettingModal: FC<SettingModalProps> = ({ setOpen }) => {
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <SettingModalMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Remunerations Settings</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>Employee Slot 1 (BPS 1-2): 1</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="input-field">
                <label>Employee Slot 2 (BPS 5-7): 1</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Employee Slot 3 (BPS 11-14): </label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="input-field">
                <label>Employee Slot 4 (BPS 16-17): 0</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Employee Slot 5 (BPS 18-19): 0</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" type="reset">
                  Close
                </button>

                <button className="lg-rounded-btn" type="submit">
                  Save & Close
                </button>
              </div>
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </SettingModalMain>
  );
};

export default SettingModal;
