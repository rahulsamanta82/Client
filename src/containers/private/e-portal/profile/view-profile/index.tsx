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
import { EducationalInfoSvg, EmployeeInfoSvg } from "assets/images/common/svgs";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useEportal from "../../useHooks";
import dummyImage from "../../../../../assets/images/common/others/download.png";
import Pagination from "components/particles/table/pagination";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

interface EportalViewProfileProps {}

const EportalViewProfile: FC<EportalViewProfileProps> = () => {
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

  const { getProfile, getQualificationsByUser } = useEportal();

  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const [filters, setFilters] = useState<any>({
    categories_types_id: "",
    parent_id: "",
    city_id: "",
    search: "",
  });
  const [tableData, setTableData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllQualificationByUser(page + 1);
  };

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
  const navigate = useNavigate();

  useEffect(() => {
    getProfile(setFormData);
    getAllQualificationByUser();
  }, []);
  console.log(formData);

  return (
    <EportalViewProfileMain>
      <EportalViewProfileTopSection>
        <span className="page-heading">Your Profile</span>
        {hasAccess(sitePermissions.ePortalEditProfile) && (
          <div className="edit-profile-button">
            <button
              className="lg-rounded-btn"
              onClick={() => navigate(siteRoutes.ePortalEditProfile)}
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
                    formData.profile_image ? formData.profile_image : dummyImage
                  }
                  alt=""
                />
              </div>
              <div className="user-name">{formData.name}</div>
              <div className="designation">Bachelor in Computer Science</div>
            </div>
          </div>

          <div className="info-container employee-info">
            <div className="header-part">
              <div className="heading-part">
                <div className="icon-part">
                  <EmployeeInfoSvg className="icon" />
                </div>
                <span className="heading">Student Information</span>
              </div>

              <div className="download-profile-button">
                <button className="lg-rounded-btn">Download Profile</button>
              </div>
            </div>

            <div className="fields-section">
              <InfoField gray={false} studentInfo>
                <span className="title">Job Status</span>
                <span className="info">Active</span>
              </InfoField>
              <InfoField gray={false} studentInfo>
                <span className="title">Student Information</span>
                <span className="info">208234</span>
              </InfoField>
              <InfoField gray={true} studentInfo>
                <span className="title">Department</span>
                <span className="info">Computer Science</span>
              </InfoField>
              <InfoField gray={true} studentInfo>
                <span className="title">Type of Student</span>
                <span className="info">Regular</span>
              </InfoField>
              <InfoField gray={false} studentInfo>
                <span className="title">App Letter No</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false} studentInfo>
                <span className="title">Joining Letter No</span>
                <span className="info">06/Estt-III</span>
              </InfoField>
              <InfoField gray={true} studentInfo>
                <span className="title">Date Of Joining </span>
                <span className="info">2021-11-27</span>
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
              <span className="info">
                {formData.father_name ? formData.father_name : "-"}
              </span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">CNIC</span>
              <span className="info">
                {formData.cnic ? formData.cnic : "-"}
              </span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Date Of Birth</span>
              <span className="info">
                {formData.date_of_birth ? formData.date_of_birth : "-"}
              </span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Domicile</span>
              <span className="info">
                {formData.domicile ? formData.domicile : "-"}
              </span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Nationality</span>
              <span className="info">Pakistan</span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Passport No</span>
              <span className="info">
                {formData.passport_no ? formData.passport_no : "-"}
              </span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Religion</span>
              <span className="info">
                {formData.religion ? formData.religion : "-"}
              </span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Blood Group</span>
              <span className="info">
                {formData.blood_group ? formData.blood_group : "-"}
              </span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Gender</span>
              <span className="info">
                {formData.gender ? formData.gender : "-"}
              </span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Police Station Name</span>
              <span className="info"></span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Phone No</span>
              <span className="info">
                {formData.phone_no ? formData.phone_no : "-"}
              </span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Mobile No.</span>
              <span className="info">0313-1234567</span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Email</span>
              <span className="info">
                {formData.email ? formData.email : "-"}
              </span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Next of Kin</span>
              <span className="info">
                {formData.kin_name ? formData.kin_name : "-"}
              </span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Relation</span>
              <span className="info">
                {formData.relation_with_kin ? formData.relation_with_kin : "-"}
              </span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Contact No (Next of Kin)</span>
              <span className="info">
                {formData.kin_phone ? formData.kin_phone : "-"}
              </span>
            </InfoField>
          </div>

          <InfoField gray={false}>
            <span className="title">Present Address</span>
            <span className="info">
              {formData.address ? formData.address : "-"}
            </span>
          </InfoField>
          <InfoField gray={true}>
            <span className="title">Permanent Address</span>
            <span className="info">
              {formData.p_address ? formData.p_address : "-"}
            </span>
          </InfoField>
        </BasicInfo>
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
      </InfoSection>
    </EportalViewProfileMain>
  );
};

export default EportalViewProfile;
