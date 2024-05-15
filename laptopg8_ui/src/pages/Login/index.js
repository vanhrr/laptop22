import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import AuthForm from '~/components/AuthForm';
import styles from './Login.module.scss';
import FormInput from '~/components/AuthForm/FormInput';
import CheckInput from '~/components/AuthForm/CheckInput';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { login } from '~/ultils/services/userService';
import { getCookie, setCookie } from '~/ultils/cookie';

const cx = classNames.bind(styles);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSucces, setIsSucces] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (getCookie('info')) {
            setUsername(getCookie('info').username);
            if (getCookie('info').password) {
                setPassword(getCookie('info').password);
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        if (!username || !password) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin đăng nhập');
            return;
        }

        try {
            const response = await login(data);
            if (response.status === 'success') {
                if (isChecked) {
                    setCookie('login', {
                        id: response.id,
                        ...data,
                    });
                    setCookie('info', {
                        id: response.id,
                        ...data,
                    });
                } else {
                    setCookie('login', {
                        id: response.id,
                        username: username,
                    });
                }
                //Chuyển hướng đến trang chính sau khi đăng nhập thành công
                setIsSucces(true);
                setTimeout(() => {
                    window.location.href = routes.home;
                }, 1000);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage('Thông tin đăng nhập không chính xác');
        }
    };

    return (
        <AuthForm title="Đăng Nhập" img="https://shopdunk.com/images/uploaded/banner/VNU_M492_08%201.jpeg">
            {isSucces ? (
                <div>Đăng nhập thành công</div>
            ) : (
                <>
                    <div className={cx('wrapper')}>
                        <FormInput value={username} onChange={handleUsernameChange} type="text" label="Username" />
                        <FormInput value={password} onChange={handlePasswordChange} type="password" label="Password" />
                    </div>
                    <div>
                        <CheckInput onChange={handleCheckboxChange} label="Nhớ mật khẩu" type="checkbox" />
                    </div>
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                    <div className={cx('btn')}>
                        <Button onClick={handleSubmit} primary>
                            Đăng nhập
                        </Button>
                    </div>
                    <div>
                        Bạn chưa có tài khoản?
                        <Link className={cx('link')} to={routes.signup}>
                            Tạo tài khoản ngay
                        </Link>
                    </div>
                </>
            )}
        </AuthForm>
    );
}

export default Login;
