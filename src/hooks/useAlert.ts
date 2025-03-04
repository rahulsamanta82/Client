import Swal, { SweetAlertPosition } from "sweetalert2";
import { warningMessages } from "utils/helpers/enums/messages.enum";

interface useToasterReturnType {
    successToaster: Function;
    errorToaster: Function;
    confirmationPopup: Function;
    errorToasterAutoClose: Function;
}

const useAlert = (): useToasterReturnType => {
    const successToaster = (text: string, position: SweetAlertPosition = 'top-right') => {
        Swal.fire({
            text,
            icon: 'success',
            background: 'var(--white-constant)',
            color: 'var(--black-constant)',
            confirmButtonColor: 'var(--primary)',
            showConfirmButton: false,
            toast: true,
            timerProgressBar: true,
            position,
            timer: 5000,
        })
    }

    const errorToaster = (text: string, position: SweetAlertPosition = 'top-right') => {
        Swal.fire({
            text,
            icon: 'error',
            background: 'var(--white-constant)',
            color: 'var(--black-constant)',
            confirmButtonColor: 'var(--primary)',
            showConfirmButton: false,
            toast: true,
            timerProgressBar: true,
            position,
            timer: 3000,
        })
    }

    const errorToasterAutoClose = (title: string, position: SweetAlertPosition = 'top-right') => {
        Swal.fire({
            title,
            icon: 'error',
            background: 'var(--white-constant)',
            color: 'var(--black-text)',
            confirmButtonColor: 'var(--primary)',
            showConfirmButton: false,
            toast: true,
            timerProgressBar: true,
            timer: 5000,
            position
        })
    }

    const confirmationPopup = async (title: string = warningMessages.confirmationDefaultMsg, text?: string) => {
        return Swal.fire({
            title,
            icon: 'question',
            background: 'var(--alert-popup-bg)',
            color: 'var(--black-text)',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'var(--reset-button-bg)',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        });
    }


    return {
        successToaster,
        errorToaster,
        confirmationPopup,
        errorToasterAutoClose
    }
}

export default useAlert