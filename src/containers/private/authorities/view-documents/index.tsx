import { FC, Fragment, useEffect, useState } from "react";
import {
  ViewDocumentMain,
  ViewDocumentSection,
  ViewDocumentTop,
} from "./style";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  AddProgramTableSvg,
  DownloadTableActionSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup, warningToaster } from "utils/helpers/common/alert-service";
import useAuthorities from "../useHooks";
import { useForm } from "react-hook-form";

import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";
import { AuthorityDTO } from "utils/helpers/models/authorities/authorities.dto";

const ViewDocument: FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { getAuthorityById } = useAuthorities();
  const { handleTableSearch, handleSearchChange, concatPathWithBackendUrl, downloadFileWithUrl } = useUtils();
  const columns: string[] = ["Id", "Title", "Action"];
  const [formData, setFormData] = useState<AuthorityDTO>(new AuthorityDTO());

  const navigate = useNavigate();
  const goToCreateQuotaList = () => {
    navigate(siteRoutes.createQuotasAdmissionList);
  };
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<AuthorityDTO>();

  const getAllAuthorityById = (page: number, search: any) => {
    const queryParams: any = {
      per_page: pagination.per_page,
      page,
      search,
      authority_id: params.id
    };
    getAuthorityById(params?.id, formData, setFormData, setValue);

  };

  const goToViewDocument = (path: string | null) => {
    if (path) {
      const concatenatedPath = concatPathWithBackendUrl(path);
      downloadFileWithUrl(concatenatedPath);
    } else {
      warningToaster("File doesn't exist or corrupted");
    }
  }

  useEffect(() => {
    const authorityId = Number(params?.id);
    if (!isNaN(authorityId)) {
      getAllAuthorityById(authorityId, formData);
    }
  }, []);
  console.log('mydata', formData);
  return (
    <ViewDocumentMain>
      <ViewDocumentTop>
        <div className="left">
          <span className="page-heading">View/Download Document </span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </ViewDocumentTop>
      <ViewDocumentSection className="content-radius-shadow">
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
            <input type="search" placeholder="Search" />
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
            
              <tr>
                <td>
                  <div>{formData?.id}</div>
                </td>

                <td>{formData?.name}</td>
                <td  onClick={() => goToViewDocument(formData?.document)}>
                  <DownloadTableActionSvg />
                </td>
              </tr>
         
            </tbody>
          </table>
        </div>
        <Fragment>
          {/* <DataNotFound show={!isLoading && !data.length} /> */}
          <Pagination {...pagination} onPageChange={onPageChange} />
        </Fragment>
      </ViewDocumentSection>
    </ViewDocumentMain>
  );
};

export default ViewDocument;
