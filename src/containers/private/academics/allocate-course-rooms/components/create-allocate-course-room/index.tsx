import { FC, useEffect, useState } from "react";
import { AddEntryTestMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";

import { useNavigate } from "react-router-dom";

interface AddEntryTestProps {
  setOpen: Function;
  id?: number;
}

const CreateCourseRoom: FC<AddEntryTestProps> = ({ setOpen }) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <AddEntryTestMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Add Allocate Course Room</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
        
              <div
                className="common-fields"
             
              >
                <div className="input-field">
                  <label>Room No</label>
                  <div className="field-wrap">
                    <div className="field">
                      <input type="text"/>
                    </div>
                  </div>
                </div>

                <div className="input-field">
                  <label>Room Name</label>
                  <div className="field-wrap">
                    <div className="field">
                      <input type="text"/>
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
    </AddEntryTestMain>
  );
};

export default CreateCourseRoom;
