import { FC, Fragment } from "react";
import { TPACListingSection, TPACListingMain, TPACListingTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface TemplateProgramAccountCodeListingProps { }

const TemplateProgramAccountCodeListing: FC<TemplateProgramAccountCodeListingProps> = ({ }) => {
    const navigate = useNavigate();
    const columns: string[] = [
        "Title",
        "Department",
        "Program code",
    ]

    const { hasAccess } = useStore();

    const goToCreateSlot = () => {
        navigate(siteRoutes.createFineSlot);
    }
    return (
        <TPACListingMain>
            <TPACListingTop>
                <div className="left">
                    <span className="page-heading">Template Programs Account code</span>
                    <Breadcrumb />
                </div>
            </TPACListingTop>

            <TPACListingSection className="content-radius-shadow">
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
                        />
                    </div>
                </div>
                <div className="data-table">
                    <table className="bottom-bordered-cells">
                        <thead>
                            <tr>
                                {columns.map((column: string, index: number) => {
                                    return <th key={index}>{column}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {[1,1,1,1,1,1,1,1,1,1,1].map((item,index) => {
                                return <tr key={index}>
                                    <td>M.A. Pre- School Education (Group-B)</td>
                                    <td>Department of Test</td>
                                    <td>
                                        <div className="program-code-field">
                                            <input type="number" value={1} />
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <Fragment>
                    <Pagination page={1} onPageChange={e => console.log(e)} per_page={10} totalRecords={40} />
                </Fragment>
            </TPACListingSection>
        </TPACListingMain>
    )
}

export default TemplateProgramAccountCodeListing;