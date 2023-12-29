import Cookies from 'js-cookie';

export function getCookie() {
    const token = Cookies.get('token');
    if (token != undefined || token != null || token != '') {
        return true
    }
    return false
}