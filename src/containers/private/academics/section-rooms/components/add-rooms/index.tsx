import { FC } from "react";
import {
  AddRoomsMain,
  Container,
  ContentWrapper,
  AddRoomsDropdownMain,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";

import { useNavigate } from "react-router-dom";

interface AddAllocateSectionProps {
  setOpen: Function;
  id?: number;
}

const AddRooms: FC<AddAllocateSectionProps> = ({ setOpen }) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <AddRoomsMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Add Rooms</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="form-quotas-main">
                <div className="form-quotas">
                  <label className="key-body-label">Add Room</label>

                  <AddRoomsDropdownMain>
                    <ul className="p-custom-scrollbar-8">
                      <li>
                        <div className="checkbox">
                          <input type="checkbox" />
                        </div>
                        <div className="item-text">
                          <span className="text">FART.1.03-Class Room</span>
                        </div>
                      </li>
                      <li>
                        <div className="checkbox">
                          <input type="checkbox" />
                        </div>
                        <div className="item-text">
                          <span className="text">
                            BS-AGES-BWP-7TH-HORT-M (BSc (Hons) Agriculture(M))
                          </span>
                        </div>
                      </li>
                    </ul>
                  </AddRoomsDropdownMain>
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
    </AddRoomsMain>
  );
};

export default AddRooms;
