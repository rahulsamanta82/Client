import { FC } from "react";
import {
  AddParticularsMain,
  Container,
  ContentWrapper,
  AllocateSectionDropdownMain,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";

import { useNavigate } from "react-router-dom";

interface AddParticularsProps {
  setOpen: Function;
  id?: number;
}

const AddParticulars: FC<AddParticularsProps> = ({ setOpen }) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <AddParticularsMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span> Link Particulars to Template Body</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="form-quotas-main">
                <div className="form-quotas">
                  <label className="key-body-label">Particulars List</label>

                  <AllocateSectionDropdownMain>
                    <ul className="p-custom-scrollbar-8">
                      <li>
                        <div className="checkbox">
                          <input type="checkbox" />
                        </div>
                        <div className="item-text">
                          <span className="text">Breakage Fund</span>
                        </div>
                      </li>
                    </ul>
                  </AllocateSectionDropdownMain>
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
    </AddParticularsMain>
  );
};

export default AddParticulars;
