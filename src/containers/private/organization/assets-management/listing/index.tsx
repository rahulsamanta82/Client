import { FC, Fragment, useEffect, useState } from "react";
import {
  AssetsListingMain,
  AssetsListingSection,
  AssetsListingTop,
} from "./style";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  MajorCategoriesIconSvg,
  MinorCategoriesIconSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import { useNavigate } from "react-router-dom";
import useAlert from "hooks/useAlert";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useStore from "hooks/useStore";

interface AssetsListingProps {}

const AssetsListing: FC<AssetsListingProps> = ({}) => {
  const breadcrumbLinks = [
    {
      title: "Infrastructure & Asset Management /",
      path: "",
    },
    {
      title: "Assets",
      path: siteRoutes.assetsListing,
    },
  ];
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState({ search: "", page: 1 });
  const { confirmationPopup } = useAlert();
  const { hasAccess } = useStore();
  const columns: string[] = [
    "Image",
    "Major Category",
    "Minor Category",
    "Product",
    "Product DESC",
    "Asset Condition",
    "Units",
    "Estimated Life",
    "Action",
  ];

  const goToCreateAsset = () => {
    navigate(siteRoutes.createAsset);
  };

  const goToMajorCategoriesListing = () => {
    navigate(siteRoutes.majorCategoriesListing);
  };
  const goToMinorCategoriesListing = () => {
    navigate(siteRoutes.minorCategoriesListing);
  };

  const handleDelete = async (id: number) => {
    const result = await confirmationPopup();
    console.log(result, "result");
    if (result.isConfirmed) {
      console.log("hurray");
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setQueryParams({ ...queryParams, page });
  };

  const goToEditAsset = (id: number) => {
    navigate(`${siteRoutes.createAsset}?id=${id}`);
  };

  useEffect(() => {}, [queryParams]);

  return (
    <AssetsListingMain>
      <AssetsListingTop>
        <div className="left">
          <span className="page-heading">Assets</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.majorCategoriesListing) && (
            <div className="create-org-btn">
              <button
                className="lg-rounded-btn"
                onClick={goToMajorCategoriesListing}
              >
                <MajorCategoriesIconSvg />
                <span>Major Categories</span>
              </button>
            </div>
          )}

          {hasAccess(sitePermissions.minorCategoriesListing) && (
            <div className="create-org-btn">
              <button
                className="lg-rounded-btn"
                onClick={goToMinorCategoriesListing}
              >
                <MinorCategoriesIconSvg />
                <span>Minor Categories</span>
              </button>
            </div>
          )}
          {hasAccess(sitePermissions.createAsset) && (
            <div className="create-org-btn">
              <button className="lg-rounded-btn" onClick={goToCreateAsset}>
                + Add New
              </button>
            </div>
          )}
        </div>
      </AssetsListingTop>
      <AssetsListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.downloadAssetListPdf) && (
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}

            {hasAccess(sitePermissions.downloadAssetListExcel) && (
              <div className="export-btn">
                <span>
                  <ExcelSvg className="icon" />
                </span>
                <span className="text">Excel</span>
              </div>
            )}
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
              {[1, 2, 3].map((item: number, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="org-logo"></div>
                    </td>
                    <td>Baghdad</td>
                    <td>Main Department</td>
                    <td>Chairs</td>
                    <td>22 inch</td>
                    <td>Good</td>
                    <td>2</td>
                    <td>2 years</td>
                    <td>
                      <div className="table-action-icons">
                        {hasAccess(sitePermissions.editAsset) && (
                          <div
                            className="action-icon"
                            onClick={() => goToEditAsset(index)}
                          >
                            <EditTableSvg />
                          </div>
                        )}

                        {hasAccess(sitePermissions.deleteAsset) && (
                          <div
                            className="action-icon"
                            onClick={() => handleDelete(index)}
                          >
                            <DeleteTableSvg />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>{/* <Pagination onPageChange={onPageChange} /> */}</Fragment>
      </AssetsListingSection>
    </AssetsListingMain>
  );
};

export default AssetsListing;
