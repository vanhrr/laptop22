import { getCookie } from '~/ultils/cookie';

export const isLogin = () => {
    let data = getCookie('login');
    if (data === null) return false;
    return true;
};
