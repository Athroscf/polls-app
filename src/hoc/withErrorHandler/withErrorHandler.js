import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import Failure from '../../components/UI/SweetAlert/Message/Message';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state= {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render () {
            return (
                <Aux>
                    <Failure
                        text={this.state.error.message}
                        icon='cancel'
                        cancelButton={false}
                        confirmButtonText='Recargar pagina' />
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;
