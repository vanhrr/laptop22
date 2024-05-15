import { faBagShopping, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { v4 } from 'uuid';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import Logo from '~/Layouts/components/Logo';
import Menu from '~/components/Menu';
import { isLogin } from '~/ultils/cookie/checkLogin';
import Search from '~/components/SearchForm';
import { getall } from '~/ultils/services/categoriesService';
import { deleteCookie } from '~/ultils/cookie';
import { getCart } from '~/ultils/session';
import routes from '~/config/routes';
import styles from './Header.module.scss';
import SearchList from '~/components/SearchForm/SearchList';

const cx = classNames.bind(styles);

function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [cate, setCate] = useState([]);

    const navigate = useNavigate();

    const menuItems = useMemo(() => {
        return isLogin()
            ? [
                  {
                      name: 'Thông tin cá nhân',
                      to: routes.profile,
                  },
                  {
                      name: 'Đơn hàng',
                      to: routes.orders,
                  },
                  {
                      name: 'Đăng xuất',
                      onClick: () => {
                          deleteCookie('login');
                          window.location.href = routes.home;
                      },
                  },
              ]
            : [
                  {
                      name: 'Đăng nhập',
                      to: routes.login,
                  },
                  {
                      name: 'Đăng ký',
                      to: routes.signup,
                  },
              ];
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getall('', '');
            setCate(response.data);
        };
        fetchData();
    }, []);

    const handleToggleSearch = () => {
        if (search) {
            navigate('/search/' + search);
        } else {
            setShowSearch(!showSearch);
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('left-menu')}>
                <Logo />
                {showSearch ? (
                    <SearchList>
                        <Search
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </SearchList>
                ) : (
                    <div className={cx('menu')}>
                        {cate.map((item) => {
                            if (item.type === 0 && item.status === 1)
                                return (
                                    <p key={v4()}>
                                        <Link className={cx('link')} to={`/products/` + item.id}>
                                            {item.name}
                                        </Link>
                                    </p>
                                );
                            return null;
                        })}
                        <p>
                            <Link className={cx('link')} to={routes.articles}>
                                Tin tức
                            </Link>
                        </p>
                    </div>
                )}
            </div>
            <div className={cx('control')}>
                <div className={cx('search-btn')} onClick={handleToggleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className={cx('cart')}>
                    {getCart().length > 0 && <div className={cx('quantity')}>{getCart().length}</div>}
                    <Link to={routes.cart}>
                        <FontAwesomeIcon icon={faBagShopping} />
                    </Link>
                </div>
                <div className={cx('user')}>
                    <Menu menu={menuItems}>
                        <FontAwesomeIcon icon={faUser} />
                    </Menu>
                </div>
            </div>

            <div className={cx('menu-bars')}>
                <div className={cx('cart')}>
                    {getCart().length > 0 && <div className={cx('quantity')}>{getCart().length}</div>}
                    <Link to={routes.cart}>
                        <FontAwesomeIcon icon={faBagShopping} />
                    </Link>
                </div>
                <div
                    className={cx('menu-toggle')}
                    onClick={() => {
                        setShowMenu(!showMenu);
                    }}
                >
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>

            <div
                className={cx('menu-list')}
                onClick={() => {
                    setShowMenu(false);
                }}
                style={showMenu ? { display: 'block' } : { display: 'none' }}
            >
                <div className={cx('profile')}>
                    <Link to={isLogin() ? routes.profile : routes.login}>
                        <FontAwesomeIcon icon={faUser} />
                        <span>Thông tin cá nhân</span>
                    </Link>
                </div>
                <div className={cx('menu-list_list')}>
                    <div className={cx('menu_2')}>
                        {cate.map((item) => {
                            if (item.type === '0' && item.status === '1')
                                return (
                                    <p key={v4()}>
                                        <Link className={cx('link')} to={`/products/` + item.id}>
                                            {item.name}
                                        </Link>
                                    </p>
                                );
                            return null;
                        })}
                        <p>
                            <Link className={cx('link')} to={routes.articles}>
                                Bài Viết
                            </Link>
                        </p>
                    </div>
                </div>
                <div className={cx('menu-list_control')}>
                    {menuItems.map((item) => {
                        return (
                            <Link key={v4()} onClick={item.onClick} to={item.to}>
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}

export default Header;
