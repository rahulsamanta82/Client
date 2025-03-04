import { FC } from "react";
import { DownloadVoucherMain, DownloadVoucherListingSection } from "./style";
import {
    TableCloudStorageSvg,
    TableDownloadPrimarySvg,
    TableUploadGreenSvg,
} from "assets/images/common/svgs";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface DownloadVoucherProps { }

const DownloadVoucher: FC<DownloadVoucherProps> = () => {
    const columns: string[] = [
        "Session",
        "Start Date",
        "End Date",
        "Voucher Status",
        "Action",
    ];
    const { hasAccess } = useStore();
    return (
        <DownloadVoucherMain>
            <DownloadVoucherListingSection className="content-radius-shadow">
                <div className="table-header">
                    <div className="heading">
                        <span>Download hostel voucher</span>
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
                            {[1, 2, 3]?.map((items: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>Fall 2024</td>
                                        <td>2024-05-20</td>
                                        <td>2024-06-20</td>
                                        <td>
                                            <span className="status-tile green">Paid</span>
                                        </td>
                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(
                                                    sitePermissions.eportalDownloadHostelVoucher
                                                ) && (
                                                        <div className="action-icon">
                                                            <TableDownloadPrimarySvg />
                                                        </div>
                                                    )}
                                                {hasAccess(
                                                    sitePermissions.eportalUploadHostelVoucher
                                                ) && (
                                                        <div className="action-icon">
                                                            <TableUploadGreenSvg />
                                                        </div>
                                                    )}
                                                {hasAccess(
                                                    sitePermissions.eportalUploadCloudHostelVoucher
                                                ) && (
                                                        <div className="action-icon">
                                                            <TableCloudStorageSvg />
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
            </DownloadVoucherListingSection>
        </DownloadVoucherMain>
    );
};

export default DownloadVoucher;
