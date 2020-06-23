import React from 'react';
import Swal from 'sweetalert2';

const successMessage = ( props ) => {
    const success = Swal.fire({
        text: props.message,
        icon: props.icon,
        showCancelButton: props.cancelButton,
        cancelButtonText: props.cancelButtonText,
        cancelButtonColor: '#BA000D',
        confirmButtonText: props.confirmButtonText
    })
    return (
        <div>
            {success}
        </div>
    )
}

export default successMessage;
