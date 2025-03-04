import Swal, { SweetAlertPosition } from "sweetalert2"
import { errorMessages, warningMessages } from "../enums/messages.enum"

export const successToaster = (text: string, position: SweetAlertPosition = 'top-right') => {
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
        timer: 3000,
    })
}

export const warningToaster = (text: string, position: SweetAlertPosition = 'top-right') => {
    Swal.fire({
        text,
        icon: 'warning',
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

export const errorToaster = (text: string, position: SweetAlertPosition = 'top-right') => {
    Swal.fire({
        text: text ?? errorMessages.somethingWentWrong,
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

export const errorToasterAutoClose = (title: string, position: SweetAlertPosition = 'top-right') => {
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

export const confirmationPopup = async (title: string = warningMessages.confirmationDefaultMsg, text?: string) => {
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