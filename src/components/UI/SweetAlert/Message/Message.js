import React from 'react';
import Swal from 'sweetalert2';

import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const message = ( props ) => {
    return (
        <Aux>
            {/* {Swal.fire({
                text: props.message,
                icon: props.icon,
                showCancelButton: props.cancelButton,
                cancelButtonText: props.cancelButtonText,
                cancelButtonColor: '#BA000D',
                confirmButtonText: props.confirmButtonText,
            }).catch(error => {
                console.log('[Error swal]', error);
            })} */}
        </Aux>
    )
}

export default message;
