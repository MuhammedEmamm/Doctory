const urls = {
    serverUrl: 'http://yakensolution.cloudapp.net/doctoryadmin/api'
};
const endpoints = {
    ContactUs : '/AboutUs/ContactUs' , 
    GetAboutUs:'/AboutUs/GetAboutUs?lang=En', 
    
};
export function endpoint(name) {
    return urls.serverUrl + endpoints[name];
}