import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Typography from '../../components/UI/Typography/Typography';
import classes from './Auth.css';

export class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'textfield',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Correo Electronico'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'textfield',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Contraseña'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignIn: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = ( event, controlName ) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updateControls});
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignIn);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignIn: !prevState.isSignIn}
        })
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={ ( event ) => this.inputChangeHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            switch (this.props.error.message) {
                case 'EMAIL_NOT_FOUND':
                    errorMessage = (
                        <p>No existe una cuenta con este correo electronico!</p>
                    );
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = (
                        <p>Contraseña Incorrecta!</p>
                    );
                    break;
                case 'USER_DISABLED':
                    errorMessage = (
                        <p>Este usuario ha sido deshabilitado!</p>
                    );
                    break;
                default:
                    break;
            }
        }

        let authRedirect = null;

        if (this.props.isAuth) {
            authRedirect = <Redirect to="/" />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    <Typography variant="h4">
                        {this.state.isSignIn ? 'Iniciar Sesion' : 'Crear Cuenta'}
                    </Typography>
                    {form}
                    <Button type="submit">
                        {this.state.isSignIn ? 'Iniciar Sesion' : 'Registrarse'}
                    </Button>
                    <a onClick={this.switchAuthModeHandler}>
                        {this.state.isSignIn ? 'Aun no tienes una cuenta? Registrate!' : 'Ya tienes una cuenta? Inicia Sesion'}
                    </a>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);