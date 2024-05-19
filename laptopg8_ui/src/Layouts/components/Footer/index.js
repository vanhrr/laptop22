import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import Logo from '../Logo';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div>
                <div className={'logo'}>
                    <Logo />
                </div>
            </div>
            <div className={cx('intro')}></div>
            <div className={cx('member')}></div>
        </footer>
    );
}

export default Footer;
