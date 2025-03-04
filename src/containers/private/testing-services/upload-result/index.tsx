import { FC, Fragment, useState, useEffect } from "react";
import {
  CallTableSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  DownloadPrimaryTableSvg,
  EditGreenTableSvg,
  EditTableSvg,
  ExcelSvg,
  MessageTableSvg,
  PdfSvg,
  SearchFieldSvg,
  TabPrimaryActionMenu,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  UploadTestResultMain,
  UploadTestResultSection,
  UploadTestResultsTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import useTestingServices from "../useHooks";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { Navigate, useNavigate } from "react-router-dom";
import useUtils from "hooks/useUtils";
import { useForm } from "react-hook-form";
import { UploadResultDTO } from "utils/helpers/models/testing-service/upload-result.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";




const UploadTestResults: FC = ({ }) => {
  const navigate = useNavigate();

  const { handleSubmit, register, setValue, trigger, getValues, formState: { errors } } = useForm<UploadResultDTO>();
  let [formData, setFormData] = useState<UploadResultDTO>(new UploadResultDTO());

  const [data, setData] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any>([]);
  const [fileName, setFileName] = useState('');


  const { hasAccess } = useStore();
  const { uploadResult, getTestSchedules } = useTestingServices();
  const [search, setSearch] = useState("");
  const {
    isComponentVisible: showDropdownMenu,
    setIsComponentVisible: setShowDropdownMenu,
    ref: dropdownMenuRef,
  } = useComponentVisible(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "CNIC",
    "Message Status",

  ];
  useEffect(() => {
    getAllTestSchedules(pagination.page, search);
    // getTestSchedules(setSchedules);
  }, []);

  const getAllTestSchedules = (page: number, search: string,) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,

    };
    getTestSchedules(setSchedules, queryParams, setPagination);
  };
  const onSubmit = (data: UploadResultDTO) => {
    const { file } = data;
    const updatedFormData: any = { ...formData, file };

    const form_data = new FormData();
    for (let key in updatedFormData) {
      form_data.append(key, updatedFormData[key]);
    }

    uploadResult(form_data, resetForm);
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  const resetForm = () => {
    formData = new UploadResultDTO();
    for (let key in formData) {
      setValue(key as keyof UploadResultDTO, formData[key as keyof UploadResultDTO]);
    }

    setFormData({ ...formData });
  }

  const toggleRowExpand = (index: number) => {
    const dat = [...data];
    dat[index].isExpanded = !dat[index].isExpanded;
    setData([...dat]);
  };

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };

  const toggleActionDropdownMenu = () => {
    setShowDropdownMenu(!showDropdownMenu);
  };

  const goToCreateTestCenter = () => {
    navigate(siteRoutes.TestingServicesTestCentercreate);
  };

  const handleFileUpload = (event: any) => {
    const { name, files } = event.target;
    const file = files[0];
    setFileName(file.name);
    setValue(name, file);
    setFormData({ ...formData, [name]: URL.createObjectURL(file) });
    trigger([name]);
  };

  console.log(formData, 'formdata')
  console.log(getValues(), 'gggggg')
  console.log(fileName, 'filename')



  return (
    <UploadTestResultMain>
      <UploadTestResultsTop>
        <div className="left">
          <span className="page-heading">Candidates Test Result</span>
          <Breadcrumb />
        </div>
      </UploadTestResultsTop>

      <FilterSection className="content-radius-shadow">
        <FilterHeader showFilterDropdown={openFilterDropdown}>
          <span className="filter-heading">Upload Result</span>
          <span className="dropdown-arrow cp" onClick={toggleFilterDropdown}>
            <DownArrowLightgrayMediumSvg className="icon" />
          </span>
        </FilterHeader>
        {openFilterDropdown && (
          <Filters>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="filter-fields">
                <div className="input-field">
                  <label>Select Schedule</label>
                  <div className="field-wrap">
                    <div className="field">
                      <select
                        {...register('sch_test_id', { required: true })}
                        value={formData.sch_test_id}
                        onChange={handleChange}
                      >
                        <option value="">None</option>
                        {schedules.map((schedule: any, index: number) => {
                          return (
                            <option value={schedule?.id} key={index}>
                              {schedule?.description}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <FormErrorMessage error={errors.sch_test_id} />
                  </div>
                </div>
                <div className="input-field">
                  <label>Select Type</label>
                  <div className="field-wrap">
                    <div className="field">
                      <select
                        {...register('test_type', { required: true })}
                        value={formData.test_type}
                        onChange={handleChange}
                      >
                        <option value="">None</option>
                        <option value="cnic">Cnic</option>
                        <option value="challan_no">Challan no</option>
                      </select>
                    </div>
                    <FormErrorMessage error={errors.test_type} />

                  </div>
                </div>
                <div className="input-field">
                  <label>CSV file</label>
                  <div className="upload-container">
                    <div className="upload-section">
                      <label htmlFor="file-upload" className="upload-label">
                        Choose a file
                      </label>
                      <input
                        type="file"
                        id="file-upload"
                        className="file-input"
                        {...register('file', { required: false })}
                        onChange={handleFileUpload}
                      />
                    </div>
                    <div className="file-details-section" id="file-details">
                      {fileName ? (
                        <p className="file-placeholder">{fileName}</p>
                      ) : (
                        <p className="file-placeholder">No file chosen</p>
                      )}
                    </div>


                  </div>
                </div>
              </div>
              <div className="submit-buttons">
                <div className="buttons">
                  <button
                    className="lg-rounded-btn gray"
                    type="button" // Prevent this button from submitting the form
                  >
                    Download Sample File
                  </button>
                  <button
                    className="lg-rounded-btn"
                    type="submit" // Make this button submit the form
                  >
                    Upload Result
                  </button>
                </div>
              </div>
            </form>

          </Filters>
        )}
      </FilterSection>
      <UploadTestResultSection className="content-radius-shadow">
        <span className="tableHeading">Upload Result Log</span>
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
              onChange={(e) => setSearch(e.target.value)}
            // onKeyUp={handleSearch}
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
              {data.map((item: any, index: number) => {
                return (
                  <Fragment key={index}>
                    <tr className={`expandable ${item.isExpanded && "opened"}`}>
                      <td>
                        <div className="mw-150">31222-8787865-2</div>
                      </td>
                      <td>
                        <span className="status-tile green">Active</span>
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
      </UploadTestResultSection>
    </UploadTestResultMain>
  );
};

export default UploadTestResults;
