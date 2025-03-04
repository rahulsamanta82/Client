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
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import useUtils from "hooks/useUtils";
import { useForm } from "react-hook-form";
import useTestingServices from "../useHooks";
import { SeatingPlanRoomDTO } from "utils/helpers/models/testing-service/seating-plan-room.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { confirmationPopup } from "utils/helpers/common/alert-service";


const SeatingPlanRoom: FC = ({ }) => {
  const navigate = useNavigate();

  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<SeatingPlanRoomDTO>();
  let [formData, setFormData] = useState<SeatingPlanRoomDTO>(new SeatingPlanRoomDTO());

  const { hasAccess } = useStore();
  const { createSeatingPlanRoom, getSeatingPlanRooms, updateSeatingPlanRoom, deleteSeatingPlanRoom, getTestingCenterRooms } = useTestingServices();
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
  const columns: string[] = ["ID", "Room", "Status", "Action"];

  const breadcrumbLinks = [
    { title: "Testing Services /", path: "" },
    { title: "Schedules /", path: siteRoutes.TestingServicesTestSchedulelist },
    {
      title: "Seating Plan Room List",
      path: siteRoutes.testingServicesTestScheduleSeatingPlanRoomslist,
    },
  ];
  const [seatingPlanRooms, setSeatingPlanRooms] = useState<any>([]);
  const [centerRooms, setCenterRooms] = useState<any>([]);
  const [seatingPlan, setSeatingPlan] = useState<any>([]);
  const [testSchedule, setTestSchedule] = useState<any>([]);
  const [isEditMode, setIsEditMode] = useState(false); // To track if the form is in edit mode




  useEffect(() => {
    getAllSeatingPlansRoom(pagination.page, search);
    getTestingCenterRooms(setCenterRooms);

  }, []);

  const getAllSeatingPlansRoom = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      seating_plan_id: params?.seating_plan_id
    };
    getSeatingPlanRooms(setSeatingPlanRooms, setSeatingPlan, setTestSchedule, queryParams, setPagination);

  };


  const onSubmit = (data: SeatingPlanRoomDTO) => {

    const updatedFormData = { ...formData, seating_plan_id: params?.seating_plan_id };
    if (isEditMode) {
      setFormData(updatedFormData);
      updateSeatingPlanRoom(updatedFormData, false);
     
    } else {
      createSeatingPlanRoom(updatedFormData, params?.schedule_id, resetForm);
    }
    getAllSeatingPlansRoom(pagination.page, search);
    setIsEditMode(false);
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  const resetForm = () => {
    formData = new SeatingPlanRoomDTO();
    for (let key in formData) {
      setValue(key as keyof SeatingPlanRoomDTO, formData[key as keyof SeatingPlanRoomDTO]);
    }

    setFormData({ ...formData });
  }

  const handleUpdateCenterStatus = (room: SeatingPlanRoomDTO) => {
    setFormData({ ...room });
    updateSeatingPlanRoom(room, false);
    getAllSeatingPlansRoom(pagination.page, search);
  }

  const formRef = useRef<HTMLFormElement | null>(null); 
  const handleEdit = (seatingPlanRoom: SeatingPlanRoomDTO) => {
    // Populate the form with the selected room's details
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
      deleteSeatingPlanRoom(id, setData, queryParams, setPagination);
      getAllSeatingPlansRoom(pagination.page, search);
    }
  };

  return (
    <>
      <TestCenterListingMain>
        <TestCenterListingTop>
          <div className="left">
            <span className="page-heading">Seating Plan Room List</span>
            <Breadcrumb links={breadcrumbLinks} />
          </div>
        </TestCenterListingTop>

        <FilterSection className="content-radius-shadow">
          <div className="page-heading">Test Schedule Details</div>

          <div className="stats">
            <div className="sats-item">
              <div className="stats-title">ID</div>
              <div className="stats-value">{testSchedule?.id}</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">Test Name</div>
              <div className="stats-value">{testSchedule?.test?.title}</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">Description</div>
              <div className="stats-value">
                {testSchedule?.description} Batch {testSchedule?.batch}
              </div>
            </div>
            <div className="sats-item">
              <div className="stats-title">Start Date</div>
              <div className="stats-value"> {testSchedule?.start_date}</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">End Date</div>
              <div className="stats-value"> {testSchedule?.end_date}</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">Test Date</div>
              <div className="stats-value">{testSchedule?.test_date}</div>
            </div>
          </div>

        </FilterSection>


        <FilterSection className="content-radius-shadow">
          <div className="page-heading">Seating Plan Details</div>

          <div className="stats">
            <div className="sats-item">
              <div className="stats-title">ID</div>
              <div className="stats-value">{seatingPlan?.id}</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">Test Date</div>
              <div className="stats-value">{seatingPlan?.test_date}</div>
            </div>

            <div className="sats-item">
              <div className="stats-title">Start Time</div>
              <div className="stats-value">{seatingPlan?.start_time}</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">End Time</div>
              <div className="stats-value">{seatingPlan?.end_time}</div>
            </div>
            <div className="sats-item">
              <div className="stats-title">Remarks</div>
              <div className="stats-value">
                {seatingPlan?.remarks}
              </div>
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
                handleSearchChange(e, setSearch, getAllSeatingPlansRoom)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllSeatingPlansRoom)}
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
                {seatingPlanRooms?.map((seatingPlanRoom: any, index: number) => {
                  return (
                    <Fragment>
                      <tr>
                        <td>
                          <div className="mw-100">{seatingPlanRoom?.id}</div>
                        </td>
                        <td>
                          <div className="mw-150">
                            {seatingPlanRoom?.rooms?.name}
                          </div>
                        </td>
                        <td>
                          <div className="table-radio-field">
                            <div className="radio">
                              <label>No</label>
                              <input type="radio" checked={seatingPlanRoom.is_active == 0} onChange={() => handleUpdateCenterStatus({ ...seatingPlanRoom, id: seatingPlanRoom.id, is_active: 0 })} />
                            </div>
                            <div className="radio">
                              <label>Yes</label>
                              <input type="radio" checked={seatingPlanRoom.is_active == 1} onChange={() => handleUpdateCenterStatus({ ...seatingPlanRoom, id: seatingPlanRoom.id, is_active: 1 })} />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="mw-100">
                            <div className="table-action-icons">
                              <div className="action-icon" onClick={() => handleEdit(seatingPlanRoom)}>
                                <EditTableSvg />
                              </div>

                              <div className="action-icon" onClick={() => handleDelete(seatingPlanRoom.id)}>
                                <DeleteTableSvg />
                              </div>
                            </div>
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
            <div className="page-heading">Room Details</div>
            <input
              type="hidden"
              {...register('id')}
              value={formData.id} // Ensure formData has id value
            />
            <div className="common-fields">
              <div className="input-field">
                <label>Rooms</label>
                <div className="field-wrap">
                  <div className="field">

                    <select {...register('room_id', { required: true })} value={formData.room_id} onChange={handleChange}>
                      <option value="">Select Rooms</option>
                      {centerRooms.map((room: any, index: number) => {
                        return <option value={room.id} key={index}>{room.name}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="radio-field">
                <label>Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="radio" id="status-yes" {...register('is_active', { required: true })} value={1} onChange={handleChange} checked={formData.is_active == 1} />
                    <label htmlFor="active">Active</label>
                  </div>
                  <div className="field">
                    <input type="radio" id="status-no" {...register('is_active', { required: true })} value={0} onChange={handleChange} checked={formData.is_active == 0} />
                    <label htmlFor="deactivate">Deactivate</label>
                  </div>
                </div>
              </div>
            </div>

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

export default SeatingPlanRoom;
