import { FC } from "react";
import { EditBalanceMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";

interface EditBalanceProps {
  setOpen: Function;
  id?: number;
}

const EditBalance: FC<EditBalanceProps> = ({ setOpen }) => {
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <EditBalanceMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Edit Balance</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>EL Posted Days</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="number" name="" id="" />
                  </div>
                </div>
              </div>

              <div className="input-field">
                <label>Vacational Posted Days</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="number" name="" id="" />
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
    </EditBalanceMain>
  );
};

export default EditBalance;
