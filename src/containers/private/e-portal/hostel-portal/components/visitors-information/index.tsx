import { FC, useState } from "react";
import { VisitorsInfoListing, VisitorsInfoMain } from "./style";
import { DeleteTableSvg, EditTableSvg } from "assets/images/common/svgs";
import AddVisitor from "../add-visitor";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface VisitorsInfoProps { }

const VisitorsInformation: FC<VisitorsInfoProps> = () => {
    const columns: string[] = [
        "Image",
        "Name",
        "Relation with Student",
        "CNIC",
        "Mobile",
        "Action",
    ];
    const [openAddVisitorModal, setOpenAddVisitorModal] = useState<boolean>(
        false
    );
    const { hasAccess } = useStore();

    return (
        <VisitorsInfoMain>
            <VisitorsInfoListing className="content-radius-shadow">
                <div className="table-header">
                    <div className="heading">
                        <span>Visitors Information</span>
                    </div>
                    {hasAccess(sitePermissions.eportalHostelVisitorCreate) && (
                        <div className="add-new-button">
                            <button
                                className="lg-rounded-btn"
                                onClick={() => setOpenAddVisitorModal(true)}
                            >
                                Add New
                            </button>
                        </div>
                    )}
                </div>
                <div className="data-table">
                    <table className="bottom-bordered-cells">
                        <thead>
                            <tr>
                                {columns.map((item: string, index: number) => {
                                    return <th key={index}>{item}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((item: number, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="image">
                                                <img
                                                    src={
                                                        "https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g"
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>Hamza Amjad</td>
                                        <td>Brother</td>
                                        <td>31111-0000000-3</td>
                                        <td>0300 00 00 000</td>
                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(
                                                    sitePermissions.eportalHostelVisitorEdit
                                                ) && (
                                                        <div className="action-icon">
                                                            <EditTableSvg />
                                                        </div>
                                                    )}
                                                {hasAccess(
                                                    sitePermissions.eportalHostelVisitorDelete
                                                ) && (
                                                        <div className="action-icon">
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
            </VisitorsInfoListing>
            {openAddVisitorModal && <AddVisitor setOpen={setOpenAddVisitorModal} />}
        </VisitorsInfoMain>
    );
};

export default VisitorsInformation;
