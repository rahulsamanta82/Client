import { FC, useEffect, useState } from "react";
import { AllocateCourseRoomsMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
interface AllocateCourseRoomsProps {
  setOpen: Function;
  course_id: any;
}

const AllocateCourseRooms: FC<AllocateCourseRoomsProps> = ({
  setOpen,
  course_id,
}) => {
  return (
    <AllocateCourseRoomsMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Allocate Course Rooms</span>
            </div>
            <div className="close-icon cp" onClick={() => setOpen(false)}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>Course Rooms</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Course Rooms</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="action-buttons">
              <div className="buttons">
                <button
                  className="lg-rounded-btn gray"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <button className="lg-rounded-btn">Save & Close</button>
              </div>
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </AllocateCourseRoomsMain>
  );
};

export default AllocateCourseRooms;
