import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';
import routes from '~/config/routes';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Logo() {
    return (
        <div className={cx('wrapper')}>
            <Link className={cx('wrapper')} to={routes.home}>
                <img src={images.logo} alt="Phoneland" />
            </Link>
        </div>
    );
}

export default Logo;
