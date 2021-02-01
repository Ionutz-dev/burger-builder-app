import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidityHandler } from '../../shared/utility';

import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (
      !this.props.buildingBurger &&
      this.props.redirectPath !== '/burger-builder'
    ) {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidityHandler(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  render() {
    const formElemenstArray = [];
    for (let key in this.state.controls) {
      formElemenstArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElemenstArray.map(el => {
      return (
        <Input
          key={el.id}
          elementType={el.config.elementType}
          elementConfig={el.config.elementConfig}
          value={el.config.value}
          changed={event => this.inputChangedHandler(event, el.id)}
          invalid={!el.config.valid}
          shouldValidate={el.config.validation}
          touched={el.config.touched}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      if (this.props.error.message === 'EMAIL_EXISTS')
        errorMessage = <p className={classes.Error}>Email already exists</p>;
      if (this.props.error.message === 'INVALID_EMAIL')
        errorMessage = <p className={classes.Error}>Invalid email</p>;
      if (this.props.error.message === 'OPERATION_NOT_ALLOWED')
        errorMessage = <p className={classes.Error}>Operation not allowed</p>;
      if (this.props.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER')
        errorMessage = (
          <p className={classes.Error}>Too many attempts, try later</p>
        );
      if (this.props.error.message === 'EMAIL_NOT_FOUND')
        errorMessage = <p className={classes.Error}>Email not found</p>;
      if (this.props.error.message === 'INVALID_PASSWORD')
        errorMessage = <p className={classes.Error}>Invalid password</p>;
      if (this.props.error.message === 'USER_DISABLED')
        errorMessage = <p className={classes.Error}>Disabled account</p>;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.redirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    redirectPath: state.auth.redirectPath,
    buildingBurger: state.burgerBuilder.building,
  };
};

const mapDispatchActions = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () =>
      dispatch(actions.setAuthRedirectPath('/burger-builder')),
  };
};

export default connect(mapStateToProps, mapDispatchActions)(Auth);
