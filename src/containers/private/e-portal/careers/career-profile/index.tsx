import { FC, Fragment, useEffect, useState } from "react";
import {
  StudentInfo,
  EportalViewProfileMain,
  EportalViewProfileTopSection,
  InfoField,
  InfoSection,
  BasicInfo,
  EducationalInfo,
} from "./style";
import {
  BlackTableViewSvg,
  EducationalInfoSvg,
  EmployeeInfoSvg,
  EmploymentIconSvg,
  PublicationIconSvg,
  ReferenceIconSvg,
} from "assets/images/common/svgs";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import dummyImage from "../../../../../assets/images/common/others/download.png";
import Pagination from "components/particles/table/pagination";
import useEportal from "../../useHooks";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

interface EportalViewProfileProps {}

const EportalViewCareerProfile: FC<EportalViewProfileProps> = () => {
  const { hasAccess } = useStore();
  const [formData, setFormData] = useState<any>({});

  const columns: string[] = [
    "Sr.",
    "Certificate/Degree",
    "Institute",
    "Year",
    "Rollno",
    "Certificate No.",
    "Total Marks / CGPA",
    "Obtained Marks / GPA",
  ];
  const employment: string[] = [
    "Sr.",
    "Organization",
    "Designation/ Appointment",
    "Salary Drawn",
    "From",
    "To",
    "Duration",
    "Reasons For Leaving",
  ];
  const publications: string[] = [
    "Sr.",
    "DOI #",
    "Title / Research Article ",
    "Journal / Publisher Name ",
    "Authors Name ",
    "Impact Factor / HEC Category",
    "Volume / No. / Pages",
    "Month of Publication",
    "Year of Publication",
    "Bibtex File",
  ];
  const reference: string[] = [
    "Sr.",
    "Reference Name ",
    "Designation ",
    "Organization ",
    "Relationship ",
    "Contact",
    "Email",
  ];

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
  };

  const navigate = useNavigate();

  const [EmploymentInfo, setEmploymentInfo] = useState<any[]>([]);
  const [publicationInfo, setPublicationInfo] = useState<any[]>([]);
  const [referneceInfo, setReferenceInfo] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>({});
  const [tableData, setTableData] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({
    categories_types_id: "",
    parent_id: "",
    city_id: "",
    search: "",
  });

  const {
    getEmployementInfos,
    getPublicationInfos,
    getReferenceInfos,
    getProfile,
    getQualificationsByUser,
  } = useEportal();
  const getAllQualificationByUser = (page: number = 1) => {
    const filterOptions = { ...filters };

    for (let key in filterOptions) {
      if (!filters[key]) {
        delete filterOptions[key];
      }
    }
    const queryParams = {
      per_page: pagination.per_page,
      page,
      ...filterOptions,
    };
    getQualificationsByUser(setTableData, queryParams, setPagination);
  };

  useEffect(() => {
    getEmployementInfos(setEmploymentInfo);
    getPublicationInfos(setPublicationInfo);
    getReferenceInfos(setReferenceInfo);
    getProfile(setProfile);
    getAllQualificationByUser();
  }, []);

  return (
    <EportalViewProfileMain>
      <EportalViewProfileTopSection>
        <span className="page-heading">Your Profile</span>
        {hasAccess(sitePermissions.ePortalEditProfile) && (
          <div className="edit-profile-button">
            <button
              className="lg-rounded-btn"
              onClick={() => navigate(siteRoutes.createEportalCareer)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </EportalViewProfileTopSection>

      <InfoSection>
        <StudentInfo>
          <div className="profile-pic-section info-container">
            <div className="content-section">
              <div className="profile-picture">
                <img
                  src={
                    profile?.profile_image ? profile?.profile_image : dummyImage
                  }
                  alt=""
                />
              </div>
              <div className="user-name">{profile?.name}</div>
              <div className="designation">Bachelor in Computer Science</div>
            </div>
          </div>

          <div className="info-container employee-info">
            <div className="header-part">
              <div className="heading-part">
                <div className="icon-part">
                  <EmployeeInfoSvg className="icon" />
                </div>
                <span className="heading">Job Application Information</span>
              </div>

              <div className="download-profile-button">
                <button className="lg-rounded-btn">Download Profile</button>
              </div>
            </div>

            <div className="fields-section">
              <InfoField gray={false} studentInfo>
                <span className="title">Job Title:</span>
                <span className="info">Active</span>
              </InfoField>
              <InfoField gray={false} studentInfo>
                <span className="title">Job Application No.</span>
                <span className="info">208234</span>
              </InfoField>
              <InfoField gray={true} studentInfo>
                <span className="title">Applied Department</span>
                <span className="info">Computer Science</span>
              </InfoField>
              <InfoField gray={true} studentInfo>
                <span className="title">Campus</span>
                <span className="info">Bahawalpur (Main Campus)</span>
              </InfoField>
              <InfoField gray={false} studentInfo>
                <span className="title">Job Post Closing Date</span>
                <span className="info">2021-11-27</span>
              </InfoField>
              <InfoField gray={false} studentInfo>
                <span className="title">Batch</span>
                <span className="info">IPB-263</span>
              </InfoField>
            </div>
          </div>
        </StudentInfo>
        <BasicInfo className="info-container">
          <div className="header-part">
            <div className="heading-part">
              <div className="icon-part">
                <EmployeeInfoSvg className="icon" />
              </div>
              <span className="heading">Basic Information</span>
            </div>
          </div>

          <div className="fields-section">
            <InfoField gray={false}>
              <span className="title">Father Name</span>
              <span className="info">{profile?.father_name}</span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">CNIC</span>
              <span className="info">{profile?.cnic}</span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Date Of Birth</span>
              <span className="info">{profile?.date_of_birth}</span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Domicile</span>
              <span className="info">{profile?.domicile}</span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Nationality</span>
              <span className="info">Pakistan</span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Passport No</span>
              <span className="info">{profile?.passport_no ?? "-"}</span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Religion</span>
              <span className="info">{profile?.religion}</span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Blood Group</span>
              <span className="info">{profile?.blood_group}</span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Gender</span>
              <span className="info">{profile?.gender}</span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Mobile No.</span>
              <span className="info">{profile?.phone_no}</span>
            </InfoField>

            <InfoField gray={true}>
              <span className="title">Phone No</span>
              <span className="info">{profile?.phone_no}</span>
            </InfoField>

            <InfoField gray={true}>
              <span className="title">Email</span>
              <span className="info">{profile?.email}</span>
            </InfoField>
          </div>

          <InfoField gray={false}>
            <span className="title">Present Address</span>
            <span className="info">{profile?.address}</span>
          </InfoField>
          <InfoField gray={true}>
            <span className="title">Permanent Address</span>
            <span className="info">{profile?.p_address}</span>
          </InfoField>
        </BasicInfo>
        {/* basic info */}
        <EducationalInfo className="info-container">
          <div className="header-part">
            <div className="heading-part">
              <div className="icon-part">
                <EducationalInfoSvg className="icon" />
              </div>
              <span className="heading">Educational Information</span>
            </div>
          </div>

          <div className="data-table">
            <table className="bottom-bordered-cells no-border">
              <thead>
                <tr>
                  {columns.map((item: string, index: number) => {
                    return <th key={index}>{item}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tableData) &&
                  tableData.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.certificate_level}</td>
                      <td>{item.institute}</td>
                      <td>{item.year}</td>
                      <td>{item.roll_num}</td>
                      <td>{item.certificate_no}</td>
                      <td>{item.total_marks}</td>
                      <td>{item.obt_marks}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Fragment>
            <DataNotFound show={!isLoading && !tableData.length} />
            <Pagination onPageChange={onPageChange} {...pagination} />
          </Fragment>
        </EducationalInfo>
        {/* emaployement info */}
        <EducationalInfo className="info-container">
          <div className="header-part">
            <div className="heading-part">
              <div className="icon-part">
                <EmploymentIconSvg className="icon" />
              </div>
              <span className="heading">Employment Information</span>
            </div>
          </div>

          <div className="data-table">
            <table className="bottom-bordered-cells no-border">
              <thead>
                <tr>
                  {employment.map((item: string, index: number) => {
                    return <th key={index}>{item}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {EmploymentInfo.map((item: any, index: number) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td> {item?.employer_name}</td>
                      <td>{item?.designation?.title}</td>
                      <td>{item?.salary_drawn}</td>
                      <td>{item?.periodfrom}</td>
                      <td>{item?.periodto}</td>
                      <td>{item?.duration}</td>
                      <td className="reason">{item?.leavingreason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Fragment>
            <Pagination onPageChange={onPageChange} {...pagination} />
          </Fragment>
        </EducationalInfo>
        {/* /// publication Info */}
        <EducationalInfo className="info-container">
          <div className="header-part">
            <div className="heading-part">
              <div className="icon-part">
                <PublicationIconSvg className="icon" />
              </div>
              <span className="heading">Publication Information</span>
            </div>
          </div>

          <div className="data-table">
            <table className="bottom-bordered-cells no-border">
              <thead>
                <tr>
                  {publications.map((item: string, index: number) => {
                    return <th key={index}>{item}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {publicationInfo.map((item: any, index: number) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.doi}</td>
                      <td>{item?.title}</td>
                      <td>{item?.journal_name}</td>
                      <td>{item?.author_name}</td>
                      <td>{item?.impact_factor}</td>
                      <td>{item?.volume_no}</td>
                      <td>{item?.publication_month}</td>
                      <td>{item?.publication_year}</td>
                      <td>
                        <BlackTableViewSvg />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Fragment>
            <Pagination onPageChange={onPageChange} {...pagination} />
          </Fragment>
        </EducationalInfo>
        {/* refrence Info */}
        <EducationalInfo className="info-container">
          <div className="header-part">
            <div className="heading-part">
              <div className="icon-part">
                <ReferenceIconSvg className="icon" />
              </div>
              <span className="heading">References</span>
            </div>
          </div>

          <div className="data-table">
            <table className="bottom-bordered-cells no-border">
              <thead>
                <tr>
                  {reference.map((item: string, index: number) => {
                    return <th key={index}>{item}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {referneceInfo.map((item: any, index: number) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.designation}</td>
                      <td>{item?.organization}</td>
                      <td>{item?.relationship}</td>
                      <td>{item?.contact}</td>
                      <td>{item?.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Fragment>
            <Pagination onPageChange={onPageChange} {...pagination} />
          </Fragment>
        </EducationalInfo>
      </InfoSection>
    </EportalViewProfileMain>
  );
};

export default EportalViewCareerProfile;
