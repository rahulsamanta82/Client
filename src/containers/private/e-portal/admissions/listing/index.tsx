import { FC, useEffect, useState } from "react";
import {
  HeadingDiv,
  ApplicationListSection,
  MainApplicationList,
  ApplicationsWrapper,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  ApplicationBtnIcon,
  ApplyIconSvg,
  FormBuildingSvg,
  InfoIconSvg,
  LastDateIconSvg,
  RedCrossIconSvg,
} from "assets/images/common/svgs";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useEportal from "../../useHooks";
import useUtils from "hooks/useUtils";

const ApplicationList: FC = () => {
  const navigate = useNavigate();
  const { getDateFromDateTime } = useUtils();
  const { getStudentApplications } = useEportal();
  const [data, setData] = useState<any[]>([]);
  const goToApplyOtherProgram = () => {
    navigate(siteRoutes.createEportalAdmissionList);
  };

  useEffect(() => {
    getStudentApplications(setData);
  }, []);

  return (
    <>
      <MainApplicationList>
        <HeadingDiv>
          <div className="left">
            <span className="page-heading">Application List</span>
            <Breadcrumb />
          </div>
          <div className="right">
            <div className="create-btn">
              <button
                className="lg-rounded-btn link-btn"
                onClick={goToApplyOtherProgram}
              >
                <div className="icon">
                  <ApplicationBtnIcon />
                </div>
                Apply in another Program
              </button>
            </div>
          </div>
        </HeadingDiv>

        <ApplicationsWrapper>
          {data?.map((item: any, index: number) => {
            return (
              <ApplicationListSection key={index}>
                <div className="main-heading-div">
                  <p className="form-heading">{item?.program}</p>
                  <div>
                    <FormBuildingSvg />
                    <span className="city-name">{item?.campus_title}</span>
                  </div>
                </div>
                <div className="sub-heading-div">
                  <p className="sub-heading">{item?.app_no}</p>
                  <div className="apply-date-main-div">
                    <span className="sub-heading">Apply Date</span>
                    <div className="apply-date-div">
                      <ApplyIconSvg />
                      <span className="apply-date">{item?.app_date}</span>
                    </div>
                  </div>
                </div>

                <hr className="line" />

                <div className="info-div">
                  <InfoIconSvg className="info-icon" />
                  <p className="info-para">
                    Based on the information you have provided you appeared to
                    bs eligible for consederation for admission
                  </p>
                </div>

                <div className="uploaded-parent">
                  <div className="status-div">
                    <p className="sub-heading">Application Fee Status</p>
                    <div className="status">
                      <RedCrossIconSvg />
                      <p className="status-para">Not Uploaded</p>
                    </div>
                  </div>

                  <div className="last-date-div">
                    <p className="sub-heading">
                      Last date to upload fee challan
                    </p>
                    <div className="last-date">
                      <LastDateIconSvg />
                      <p className="last-date-para">
                        {getDateFromDateTime(item?.close_date)}
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="line" />

                <div className="action-button">
                  <button className="download-btn">Download Application</button>
                  <button className="">Download Fee Challan</button>
                  <button className="upload-btn">Upload Fee Challan</button>
                  <button className="pay-btn">Pay Online</button>
                </div>
              </ApplicationListSection>
            );
          })}
        </ApplicationsWrapper>
      </MainApplicationList>
    </>
  );
};

export default ApplicationList;
