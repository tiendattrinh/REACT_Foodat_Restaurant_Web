import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import Validation from './LoginValidation';
import { loginAdminApi, loginApi } from '../../Api';

function Login() {
    const [values, setValues] = useState({
        gmail: '',
        password: '',
        showPassword: false,
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleLogin = async () => {
        try {
            const response2 = await loginAdminApi(values.gmail, values.password);
            console.log(response2);

            if (response2.message == "Admin login successful") {

                localStorage.setItem("gmail", response2.user.gmail);
                localStorage.setItem("role", response2.user.ten);
                localStorage.setItem("id", response2.user.id);
                console.log(response2);
                navigate("/dash-board");

            }

        } catch (error) {
            console.log(error);
            const response = await loginApi(values.gmail, values.password);
            localStorage.setItem("name", response.user.ten);
            localStorage.setItem("tendem", response.user.tendem);
            localStorage.setItem("gmail", response.user.gmail);
            localStorage.setItem("sdt", response.user.sdt);
            localStorage.setItem("diachi", response.user.diachi);
            localStorage.setItem("gioitinh", response.user.gioitinh);
            localStorage.setItem("role", response.user.role);
            localStorage.setItem("id", response.user.id);
            console.log(response);
            if (response.success) {
                navigate("/");


            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
        console.log(values);
        setErrors(Validation(values));
    }

    const handleShowPassword = () => {
        setValues((prev) => ({ ...prev, showPassword: !prev.showPassword }));
    };

    return (
        <>
            <div className='login-background'>
                <div className='login-container row'>
                    <form action='' onSubmit={handleSubmit}>
                        <div className='col-12 text-login'>Đăng nhập</div>
                        <div className='mb-3'>
                            <label htmlFor='email'>
                                <strong>Email</strong>
                            </label>
                            <input
                                type='email'
                                placeholder='Nhập email'
                                name='gmail'
                                onChange={handleInput}
                                className='form-control'
                            />
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password'>
                                <strong>Password</strong>
                            </label>
                            <div className='input-group'>
                                <input
                                    type={values.showPassword ? 'text' : 'password'}
                                    placeholder='Nhập password'
                                    name='password'
                                    onChange={handleInput}
                                    className='form-control'
                                />
                                <button
                                    type='button'
                                    className='btn btn-outline-secondary'
                                    onClick={handleShowPassword}>
                                    {values.showPassword ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
                                </button>
                            </div>
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <button type='submit' className='btn btn-success w-100'>
                            <strong>Truy cập</strong>
                        </button>
                        <div className='edit-text-login'>
                            <p>Bạn chưa có tài khoản !!</p>
                        </div>
                        <Link to="/signup" className='edit-signupp btn btn-default border w-100 bg-light text-decoration-none'>
                            Đăng ký ngay
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
