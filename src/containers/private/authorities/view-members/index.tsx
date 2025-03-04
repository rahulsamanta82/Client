import { FC, Fragment, useEffect, useState } from "react";
import {
  AuthorotiesListingMain,
  AuthorotiesListingSection,
  AuthorotiesListingTop,
} from "./style";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  AddProgramTableSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useAuthorities from "../useHooks";
import { useForm } from "react-hook-form";
import React from 'react';

import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";
import { AuthorityDTO, ExternalMember, InternalMember } from "utils/helpers/models/authorities/authorities.dto";



const ViewMember: FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [formData, setFormData] = useState<AuthorityDTO>(new AuthorityDTO());

  const { handleTableSearch, handleSearchChange } = useUtils();
  const columns: string[] = [
    "Name",
    "Email",
    "Member Type",
    "Active",
    "From",
    "To",
  ];
  const { getAuthorityById } = useAuthorities();

  const navigate = useNavigate();
  const goToCreateQuotaList = () => {
    navigate(siteRoutes.createQuotasAdmissionList);
  };
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
  };

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
    }
  };

  const getAllAuthorityById = (page: number, search: any) => {
    const queryParams: any = {
      per_page: pagination.per_page,
      page,
      search,
      authority_id: params.id
    };
    getAuthorityById(params?.id, formData, setFormData, setValue);

  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<AuthorityDTO>();

  useEffect(() => {
    const authorityId = Number(params?.id);
    if (!isNaN(authorityId)) {
      getAllAuthorityById(authorityId, formData);
    }
  }, []);
  console.log('mydata', formData);


  return (
    <AuthorotiesListingMain>
      <AuthorotiesListingTop>
        <div className="left">
          <span className="page-heading">View Members</span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </AuthorotiesListingTop>
      <AuthorotiesListingSection className="content-radius-shadow">
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
              {formData?.internal_members?.map((member: any, memberIndex: number) => (
                <tr key={memberIndex}>
                  <td>
                    <div>{member?.user?.first_name || 'N/A'}</div> {/* Access individual member details */}
                  </td>
                  <td>
                    <div>{member?.user?.email || 'N/A'}</div>
                  </td>
                  <td>{member?.authority_member_type?.title || 'N/A'}</td>
                  <td>
                    <span className=""> {member?.is_active ? <span className="status-tile">Active</span> : <span className="status-tile red">Inactive</span>}</span>
                  </td>
                  <td>
                    <div>{member?.active_from || 'N/A'}</div>
                  </td>
                  <td>
                    <div>{member?.active_to || 'N/A'}</div>
                  </td>
                </tr>
              ))}

              {formData?.external_members?.map((member: any, memberIndex: number) => (
                <tr key={memberIndex}>
                  <td>
                    <div>{member?.first_name} {member?.last_name}</div>
                  </td>
                 
                  <td>
                    <div>{member?.email || 'N/A'}</div>
                  </td>
                  <td>
                    <div>{'External Member'}</div>
                  </td>
                  <td>
                    <span>
                      {member?.is_active ? (
                        <span className="status-tile green">Active</span>
                      ) : (
                        <span className="status-tile red">Inactive</span>
                      )}
                    </span>
                  </td>
                  <td>--</td>
                  <td>--</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Fragment>
          {/* <DataNotFound show={!isLoading && !data.length} /> */}
          <Pagination {...pagination} onPageChange={onPageChange} />
        </Fragment>
      </AuthorotiesListingSection>
    </AuthorotiesListingMain>
  );
};

export default ViewMember;
