import { FC, Fragment, useState, useEffect, useRef } from "react";
import {
  CallTableSvg,
  DarkEyeSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  DownloadPrimaryTableSvg,
  EditGreenTableSvg,
  EditTableSvg,
  EmailSvg,
  ExcelSvg,
  EyeSvg,
  GreenDownLodadSvg,
  LocationSvg,
  MannageRoomSvg,
  MessageTableSvg,
  PdfSvg,
  PublishSvg,
  RemoveActionSvg,
  RoomPicSvg,
  SearchFieldSvg,
  TabPrimaryActionMenu,
  UnPublishSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  TestCenterListingMain,
  TestCenterListingSection,
  TestCenterListingTop,
  FilterSection,
  PlanCards,
  CreateTestCenterSection,
} from "./style";
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import useTestingServices from "../useHooks";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import useUtils from "hooks/useUtils";
import { useForm } from "react-hook-form";
import { SeatingPlanDTO } from "utils/helpers/models/testing-service/seating-plan.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import useOrganization from "../../organization/useHooks";



const SittingPlan: FC = ({ }) => {
  const navigate = useNavigate();
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<SeatingPlanDTO>();
  let [formData, setFormData] = useState<SeatingPlanDTO>(new SeatingPlanDTO());

  const { hasAccess } = useStore();
  const { getSeatingPlans, deleteSeatingPlan, createSeatingPlan, updateSeatingPlan, getCenterWiseSummary, generateSeatingPlan } = useTestingServices();
  const { getPrograms } = useOrganization();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const { handleSearchChange, handleTableSearch, getQueryParams } = useUtils();

  const params = getQueryParams();
  const {
    isComponentVisible: isDropdownOpen,
    setIsComponentVisible: setIsDropdownOpen,
    ref: dropdownMenuRef,
  } = useComponentVisible(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "ID",
    "Date",
    "Start Time",
    "End Time",
    "Time Left ",
    "Action",
  ];

  const onSubmit = (data: SeatingPlanDTO, addMore: boolean = false) => {

    if (isEditMode) {
      const updatedFormData = { ...formData, test_schedule_id: params?.schedule_id, seating_plan_id: params?.seating_plan_id };

      setFormData(updatedFormData);
      updateSeatingPlan(updatedFormData, false);

    } else {
      const updatedFormData = { ...formData, test_schedule_id: params?.schedule_id , phd_programs: JSON.stringify(formData.phd_programs)};

      createSeatingPlan(updatedFormData, params?.schedule_id, addMore, resetForm);
    }
    getAllSeatingPlans(pagination.page, search);
    setIsEditMode(false);
  }

  const generate = (seating_plan_id: number) => {
    generateSeatingPlan({ seating_plan_id });
  };


  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  const resetForm = () => {
    formData = new SeatingPlanDTO();
    for (let key in formData) {
      setValue(key as keyof SeatingPlanDTO, formData[key as keyof SeatingPlanDTO]);
    }

    setFormData({ ...formData });
  }



  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const goToCreateTestCenter = () => {
    navigate(siteRoutes.createTestingServicesTestSchedule);
  };

  const goToManageSeatingPLan = () => {
    navigate(siteRoutes.createTestingServicesTestSchedule);
  };

  const goToManageSeatingPlanRoom = (id: number) => {
    navigate(`${siteRoutes.testingServicesTestScheduleSeatingPlanRoomslist}?seating_plan_id=${id}`);

  };

  const {
    isComponentVisible: showCentersDropdown,
    setIsComponentVisible: setShowCentersDropdown,
    ref: testCentersDropdownRef,
  } = useComponentVisible();
  const [qualifications, setQualifications] = useState<any>([]);
  const [centerSummary, setCenterSummary] = useState<any>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const [programs, setPrograms] = useState<any[]>([]);
  const [searchedPrograms, setSearchedPrograms] = useState<any[]>([]);

  const [selectedPrograms, setSelectedPrograms] = useState<number[]>([]);

  const onSelectPrograms = (program: { selected: boolean; id: number }) => {
    const { selected, id } = program;
    const updatedProgramIds = selected
      ? [...formData.phd_programs, id]
      : formData.phd_programs.filter((programId) => programId !== id);

    setFormData({ ...formData, phd_programs: updatedProgramIds });

  };



  const toggleAcademicDropdown = (index: number) => {
    setQualifications([
      ...qualifications.map((item: any, ind: number) => {
        if (index === ind) {
          return {
            ...item,
            isDropdownOpen: !item.isDropdownOpen,
          };
        } else {
          return {
            ...item,
            isDropdownOpen: false,
          };
        }
      }),
    ]);
  };

  useEffect(() => {
    getAllSeatingPlans(pagination.page, search);
    getCenterWiseSummary(setCenterSummary, { test_schedule_id: params?.schedule_id });
    getPrograms(setPrograms);
  }, []);

  const getAllSeatingPlans = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      test_schedule_id: params?.schedule_id
    };
    getSeatingPlans(setQualifications, queryParams, setPagination);

  };
  console.log(centerSummary, 'rrrrr');
  console.log(programs, 'program')


  const dummyData = [
    {
      campusName: "Baghdad ul Jaded Campus Bahawalpur",
      totalStudents: 100,
      seatsGenerated: 100,
      remainingSeats: 20,
    },
    {
      campusName: "Quaid-e-Azam Campus Lahore",
      totalStudents: 120,
      seatsGenerated: 100,
      remainingSeats: 30,
    },
    {
      campusName: "Quaid-e-Azam Campus Lahore",
      totalStudents: 120,
      seatsGenerated: 100,
      remainingSeats: 30,
    },
  ];

  const goToViewTestApplicant = () => {
    navigate(siteRoutes.viewTestApplicants);
  };

  const formRef = useRef<HTMLFormElement | null>(null);
  const handleEdit = (seatingPlanRoom: SeatingPlanDTO) => {
    console.log(seatingPlanRoom,'edit');
    setFormData({ ...seatingPlanRoom });
    setIsEditMode(true);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteSeatingPlan(id, setData, queryParams, setPagination);
      getAllSeatingPlans(pagination.page, search);
    }
  };

  const handleMultiSearchChange = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    const programsHelper = programs.filter((program) =>
      program.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedPrograms([...programsHelper]);
  };

  return (
    <>
      <TestCenterListingMain>
        <TestCenterListingTop>
          <div className="left">
            <span className="page-heading">Seating Plan List</span>
            <Breadcrumb />
          </div>
          <div className="right">
            <div className="create-org-btn">
              <button className="lg-rounded-btn">Test center slips</button>
            </div>
            <div className="create-org-btn">
              <button className="lg-rounded-btn">Download Schedule</button>
            </div>
          </div>
        </TestCenterListingTop>

        <div className="main-plan-card">
          {dummyData.map((data, index) => (
            <PlanCards className="content-radius-shadow" key={index}>
              <div className="campus-name">{data.campusName}</div>
              <div className="table-main">
                <div>
                  <div className="seats-main">
                    <span className="total">Total Students</span>
                    <span className="student-number">{data.totalStudents}</span>
                  </div>
                  <div className="seats-main">
                    <span className="total">Seats Generated </span>
                    <span className="seats-number">{data.seatsGenerated}</span>
                  </div>
                  <div className="seats-main">
                    <span className="total">Remaining</span>
                    <span className="remaining-number">
                      {data.remainingSeats}
                    </span>
                  </div>
                </div>
                <div>
                  <RoomPicSvg />
                </div>
              </div>
            </PlanCards>
          ))}
        </div>

        <FilterSection className="content-radius-shadow">
          <div className="stats">
            <div className="sats-item">
              <div className="stats-title">ID</div>
              <div className="stats-value">{qualifications[0]?.test_schedule?.id}</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">Test Name</div>
              <div className="stats-value">{qualifications[0]?.test_schedule?.test?.title}</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">Start Date</div>
              <div className="stats-value">{qualifications[0]?.test_schedule?.start_date}</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">End Date</div>
              <div className="stats-value">{qualifications[0]?.test_schedule?.end_date}</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">Test Date</div>
              <div className="stats-value">{qualifications[0]?.test_schedule?.test_date}</div>
            </div>
          </div>
        </FilterSection>
        <TestCenterListingSection className="content-radius-shadow">
          <div className="tableHeading">Seating Plan List</div>
          <div className="list-header">
            <div className="table-data-export-buttons">
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>

              <div className="export-btn">
                <span>
                  <ExcelSvg className="icon" />
                </span>
                <span className="text">Excel</span>
              </div>
            </div>
            <div className="table-search-field">
              <span className="search-icon">
                <SearchFieldSvg className="icon" />
              </span>
              <input
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) =>
                  handleSearchChange(e, setSearch, getAllSeatingPlans)
                }
                onKeyUp={(e) => handleTableSearch(e, getAllSeatingPlans)}
              />
            </div>
          </div>
          <div className="data-table">
            <table className="bottom-bordered-cells">
              <thead>
                <tr>
                  {columns.map((column: string, index: number) => {
                    return <th key={index}>{column}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {qualifications.map((qualification: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      <tr>
                        <td>
                          <div className="mw-100">{qualification?.id}</div>
                        </td>
                        <td>
                          <div className="mw-150">{qualification?.test_date}</div>
                        </td>
                        <td>
                          <div className="mw-150">{qualification?.start_time}</div>
                        </td>
                        <td>
                          <div className="mw-100">{qualification?.end_time}</div>
                        </td>
                        <td>
                          <div className="mw-150">1day 23:59:58</div>
                        </td>

                        <td>
                          <div className="action-menu">
                            <div
                              className="menu-icon cp"
                              onClick={() => toggleAcademicDropdown(index)}
                            >
                              <TabPrimaryActionMenu className="icon" />
                            </div>
                            {qualification.isDropdownOpen && (
                              <div className="table-menu-dropdown">
                                <div className="particular-menu cp" onClick={() => handleEdit(qualification)}>
                                  <div className="action-icon">
                                    <EditTableSvg className="icon" />
                                  </div>
                                  <span className="title">Edit</span>
                                </div>
                                <div
                                  className="particular-menu cp"
                                  onClick={() => goToManageSeatingPlanRoom(qualification.id)}
                                >
                                  <div className="action-icon">
                                    <MannageRoomSvg className="icon" />
                                  </div>
                                  <span className="title">Manage Rooms</span>
                                </div>
                                <div className="particular-menu cp" onClick={() => generate(qualification.id)}>
                                  <div className="action-icon">
                                    <GreenDownLodadSvg className="icon" />
                                  </div>
                                  <span className="title">
                                    Generate Seating Plan
                                  </span>
                                </div>
                                <div
                                  className="particular-menu cp"
                                  onClick={goToViewTestApplicant}
                                >
                                  <div className="action-icon">
                                    <DarkEyeSvg className="icon" />
                                  </div>
                                  <span className="title">
                                    View Applicants List
                                  </span>
                                </div>
                                <div className="particular-menu cp">
                                  <div className="action-icon">
                                    <UnPublishSvg className="icon" />
                                  </div>
                                  <span className="title">Unpublish Slip</span>
                                </div>

                                <div className="particular-menu cp">
                                  <div className="action-icon">
                                    <PublishSvg className="icon" />
                                  </div>
                                  <span className="title">Publish Slip</span>
                                </div>
                                <div className="particular-menu cp">
                                  <div className="action-icon">
                                    <RemoveActionSvg className="icon" />
                                  </div>
                                  <span className="title">
                                    Remove Seating Plan
                                  </span>
                                </div>
                                <div className="particular-menu cp" onClick={() => handleDelete(qualification.id)}>
                                  <div className="action-icon">
                                    <DeleteTableSvg className="icon" />
                                  </div>
                                  <span className="title">Delete</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Fragment>
            <Pagination
              onPageChange={(page: any) => console.log(page)}
              {...pagination}
            />
          </Fragment>
        </TestCenterListingSection>

        {/* section form */}

        <CreateTestCenterSection className="p-custom-scrollbar-8">
          <form ref={formRef} onSubmit={handleSubmit(data => onSubmit(data))}>
            <div className="page-heading">Seating Plan Details</div>

            <div className="common-fields">
              {/* Test Date */}
              <div className="input-field">
                <label>Test Date</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="date"
                      {...register('test_date', { required: true })}
                      value={formData.test_date}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.test_date} />
                </div>
              </div>

              {/* Start Time */}
              <div className="input-field">
                <label>Start Time</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="time"
                      {...register('start_time', { required: true })}
                      value={formData.start_time}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.start_time} />
                </div>
              </div>

              {/* End Time */}
              <div className="input-field">
                <label>End Time</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="time"
                      {...register('end_time', { required: true })}
                      value={formData.end_time}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.end_time} />
                </div>
              </div>

              {/* Gender Type */}
              <div className="input-field">
                <label>Gender Type</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      {...register('gender_type', { required: true })}
                      value={formData.gender_type}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                  </div>
                  <FormErrorMessage error={errors.gender_type} />
                </div>
              </div>

              <div className="multiselect-field" ref={testCentersDropdownRef}>
                <div className="input-field" onClick={() => setShowCentersDropdown(true)}>
                  <label>Programs</label>
                  <div className="field-wrap">
                  <div className="field">
                    <div className="selected-items">
                      <input
                        type="search"
                        placeholder="Select Programs"
                        value={search}
                        onChange={handleMultiSearchChange}
                      />
                      {formData.phd_programs.length ? (
                        <div className="item">
                          {formData.phd_programs.length > 0 ? (
                            <div>{formData.phd_programs.length} selected</div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                </div>

                {showCentersDropdown && (
                  <MultiselectDropdown
                    onSelect={onSelectPrograms}      // Handle program selection
                    options={programs}               // Use fetched programs
                    value={formData.phd_programs}         // Currently selected programs
                  />
                )}
              </div>


            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                  Reset
                </button>
                <button className="lg-rounded-btn" onClick={handleSubmit(data => onSubmit(data))}>Submit</button>
              </div>
            </div>
          </form>

        </CreateTestCenterSection>
      </TestCenterListingMain>
    </>
  );
};

export default SittingPlan;
