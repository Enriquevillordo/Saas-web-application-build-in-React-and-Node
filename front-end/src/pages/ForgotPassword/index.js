import React, { useState } from 'react';
import { Button, Box, Typography, OutlinedInput,  } from '@mui/material';
import { Link } from 'react-router-dom';
import {
    FormText,
    FormGroup,
    FormControl,
    FormLabel,
} from "react-bootstrap";
import LoaderButton from "../../shared/components/LoaderButton";
import { useFormFields } from "./lib/hooksLib";
import { onError } from "./lib/errorLib";
// import './forgotPassword.css';

const ForgotPassword = () => {

    const [fields, handleFieldChange] = useFormFields({
        code: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [codeSent, setCodeSent] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSendingCode, setIsSendingCode] = useState(false);

    function validateCodeForm() {
        return fields.email.length > 0;
    }

    function validateResetForm() {
        return (
            fields.code.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    async function handleSendCodeClick(event) {
        event.preventDefault();

        setIsSendingCode(true);

        try {
            await Auth.forgotPassword(fields.email);
            setCodeSent(true);
        } catch (error) {
            onError(error);
            setIsSendingCode(false);
        }
    }

    async function handleConfirmClick(event) {
        event.preventDefault();

        setIsConfirming(true);

        try {
            await Auth.forgotPasswordSubmit(
                fields.email,
                fields.code,
                fields.password
            );
            setConfirmed(true);
        } catch (error) {
            onError(error);
            setIsConfirming(false);
        }
    }

    const renderRequestCodeForm = () => {
        return (
            <form name="form" onSubmit={handleSendCodeClick} >
                <Box className="col-md-6 col-sm-6 text-center" sx={{ margin: "auto" }}>
                    <Typography variant='h4' mb={4}>
                        Forgot password
                    </Typography>
                    <OutlinedInput type="email" name="email" value={fields.email} onChange={handleFieldChange} className={'form-control' + (submitted && !fields.email? ' is-invalid' : '')} sx={{ mb: 3, '& input': { p: 0 } }} />
                    <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                        Please enter your email address and we will send you an email with the account recovery code.
                    </Typography>
                    <Button type='submit' variant='contained' color='primary' sx={{ mb: 4, background: '#8828ff' }}>Send</Button>
                    <hr></hr>
                    <a href="/login">Back to Login</a>
                </Box>
                {/* <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isSendingCode}
                    disabled={!validateCodeForm()}
                    >
                    Send Confirmation
                </LoaderButton> */}
            </form>
        )
    }

    const renderConfirmationForm = () => {
        return (
            <form onSubmit={handleConfirmClick}>
                <FormGroup bsSize="large" controlId="code">
                <FormLabel>Confirmation Code</FormLabel>
                <FormControl
                    autoFocus
                    type="tel"
                    value={fields.code}
                    onChange={handleFieldChange}
                />
                <FormText>
                    Please check your email ({fields.email}) for the confirmation code.
                </FormText>
                </FormGroup>
                <hr />
                <FormGroup bsSize="large" controlId="password">
                <FormLabel>New Password</FormLabel>
                <FormControl
                    type="password"
                    value={fields.password}
                    onChange={handleFieldChange}
                />
                </FormGroup>
                <FormGroup bsSize="large" controlId="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl
                    type="password"
                    value={fields.confirmPassword}
                    onChange={handleFieldChange}
                />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isConfirming}
                    disabled={!validateResetForm()}
                    >
                    Confirm
                </LoaderButton>
            </form>
        );
    }

    function renderSuccessMessage() {
        return (
          <div className="success">
            <p><BsCheck size={16} /> Your password has been reset.</p>
            <p>
              <Link to="/login">
                Click here to login with your new credentials.
              </Link>
            </p>
          </div>
        );
    }

    return (
        <Box className="px-3 pb-3 mt-1" px={15} py={8}>
            {
                !codeSent
                ? renderRequestCodeForm()
                : !confirmed
                ? renderConfirmationForm()
                : renderSuccessMessage()
            }
        </Box>
    )
}

export { ForgotPassword }
