import { FC, useState } from "react";
import { AddOptionSvg, DeleteOptionSvg } from "assets/images/common/svgs";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  LeaveRequistionMain,
  LeaveRequistionSection,
  LeaveRequistionTop,
  FilterSection,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import GradingSchema from "./components/confirmation";
import Confirmation from "./components/confirmation";

const LeaveRequistion: FC = ({}) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
    { title: "Leave Requistion", path: siteRoutes.createLeaveRequestion },
  ];
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  return (
    <>
      <LeaveRequistionMain>
        <LeaveRequistionTop>
          <div className="left">
            <span className="page-heading">Leave Requistion</span>
            <Breadcrumb links={breadcrumbLinks} />
          </div>
        </LeaveRequistionTop>

        <FilterSection className="content-radius-shadow">
          <div className="stats">
            <div className="sats-item">
              <div className="stats-title">Leave Available Days</div>
              <div className="stats-value">100</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">Upper Limit Days</div>
              <div className="stats-value">10</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">Time Available</div>
              <div className="stats-value">20</div>
            </div>
          </div>
          <div className="rules">
            <div className="rules-heading">Rules</div>
            <div>
              <ul>
                <li>
                  Used for short-term personal reasons, such as family
                  emergencies or personal errands. Typically, universities allow
                  10-12 days per year.
                </li>
                <li>
                  For illness, injury, or medical treatment. Universities often
                  offer 15-30 days of paid medical leave annually
                </li>
                <li>
                  Used for short-term personal reasons, such as family
                  emergencies or personal errands. Typically, universities allow
                  10-12 days per year.
                </li>
                <li>
                  For illness, injury, or medical treatment. Universities often
                  offer 15-30 days of paid medical leave annually
                </li>
                <li>
                  Used for short-term personal reasons, such as family
                  emergencies or personal errands. Typically, universities allow
                  10-12 days per year.
                </li>
                <li>
                  For illness, injury, or medical treatment. Universities often
                  offer 15-30 days of paid medical leave annually
                </li>
              </ul>
            </div>
          </div>
        </FilterSection>

        <LeaveRequistionSection className="p-custom-scrollbar-8">
          <form>
            <div className="page-heading">Leave Type & Period</div>

            <div className="common-fields">
              <div className="input-field">
                <label>Select Leave Type</label>

                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Free Leave</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="radio-field">
                <label>Is Station Leave</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="radio" id="active" />
                    <label htmlFor="active">Yes</label>
                  </div>
                  <div className="field">
                    <input type="radio" id="deactivate" />
                    <label htmlFor="deactivate">No</label>
                  </div>
                </div>
              </div>

              <div className="input-field">
                <label>Period Applied From</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date" />
                  </div>
                </div>
              </div>
            </div>
            <div className="common-fields">
              <div className="input-field">
                <label>Period Applied To</label>

                <div className="field-wrap">
                  <div className="field">
                    <input type="date" name="" id="" />
                  </div>
                </div>
              </div>

              <div className="radio-field">
                <label>Leave Extension</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="radio" id="active" />
                    <label htmlFor="active">Yes</label>
                  </div>
                  <div className="field">
                    <input type="radio" id="deactivate" />
                    <label htmlFor="deactivate">No</label>
                  </div>
                </div>
              </div>

              <div className="input-field">
                <label>For</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Casual Leave</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="common-fields">
              <div className="input-field">
                <label>Previous Leave</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select Previous Leave</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="input-field">
              <label>Leave Remarks</label>
              <div className="field-wrap">
                <div className="text-area">
                  <textarea name="" id=""></textarea>
                </div>
              </div>
            </div>

            <div className="attachments">
              <div className="attachment-heading">Attachments</div>
              <AddOptionSvg />
            </div>
            <div className="common-fields">
              <div className="input-field">
                <label>File Title</label>

                <div className="field-wrap">
                  <div className="field">
                    <input type="text" />
                  </div>
                </div>
              </div>

              <div className="input-field">
                <label>File</label>
                <div className="upload-container">
                  <div className="upload-section">
                    <label htmlFor="file-upload" className="upload-label">
                      Choose a file
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      className="file-input"
                    />
                  </div>

                  <div className="file-details-section" id="file-details">
                    <p className="file-placeholder">No file chosen</p>
                  </div>
                </div>
              </div>
              <div>
                <DeleteOptionSvg className="delete-icon" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" type="button">
                  Reset
                </button>
                <button
                  className="lg-rounded-btn"
                  onClick={handleOpenConfirmation}
                  type="button"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </LeaveRequistionSection>
      </LeaveRequistionMain>
      {openConfirmation && <Confirmation setOpen={setOpenConfirmation} />}
    </>
  );
};

export default LeaveRequistion;
