import * as httpRequest from '~/ultils/httpRequest';

export const getall = async (n, s) => {
    //console.log(req);
    try {
        const res = await httpRequest.get('customer/getall.php', {
            params: {
                n: n,
                s: s,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const count = async () => {
    try {
        const res = await httpRequest.get('customer/count.php');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const topprice = async () => {
    try {
        const res = await httpRequest.get('customer/topprice.php');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getbyid = async (id) => {
    try {
        const res = await httpRequest.get('customer/getbyid.php', {
            params: {
                id: id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getbyuser = async (user) => {
    try {
        const res = await httpRequest.get('customer/getbyusername.php', {
            params: {
                username: user,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const update = async (req) => {
    try {
        const res = await httpRequest.update('customer/update.php', req);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const register = async (req) => {
    try {
        const res = await httpRequest.post('customer/post.php', req);
        console.log(req);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req) => {
    try {
        const res = await httpRequest.post('customer/login.php', {
            username: req.username,
            password: req.password,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
