const urls = {
    serverUrl: 'http://docpoc.co/DoctoryBackEnd/api'
};
const endpoints = {
    Login: '/User/Login',
    Register: '/User/Register',
    ForgetPas: '/User/ForgetPassword',
    ResetPass: '/User/ResetPassword',
    ContactUs: '/AboutUs/ContactUs',
    GetAboutUs: '/AboutUs/GetAboutUs?lang=En',
    AllSpecs: '/Specialities/GetAll?lang=En',
    AllAreas: '/Areas/GetAll?lang=En',
    AllComps: '/AboutUs/GetInsuranceCompanies?lang=En',
    AllDocs: '/Doctors/GetAll?',
    AllFacs: '/Facilities/GetAll?',
    UploadImage: '/Collection/UploadImage',
    Account: '/User/GetAccount',
    EditProfile: '/User/EditProfile',
    AllRelations: '/Collection/GetAllRelations?Lang=En',
    AllNationalities: '/Collection/GetAllNationalities?Lang=En',
    AllLanguages: '/Collection/GetAllLanguages',
    AllQualifications: '/Collection/GetAllQualifications?Lang=En',
    AllFacTypes : '/Collection/GetAllFacilityTypes?lang=En',
    FamilyMembers :'/Family/GetMyFamily' , 
    AddFamily : '/Family/AddEditFamily' , 
    DoctorDetails:'/Doctors/GetDoctorDetails?',
    FacDetails:'/Facilities/GetFacilityDetails?' , 
    ReqAppiontments:'/Appointments/RequestAppointment' , 
    ReqAppiontmentsSch:'/Appointments/RequestScheduledAppointment' , 
    GetMyAppointments:'/Appointments/GetMyAppointments?',
    UpdateStatusApp : '/Appointments/UpdateAppointmentStatus?' ,
    UpdateStatusAppSch : '/Appointments/UpdateScheduledAppointmentStatus?' ,
    FavouriteFac:'/Facilities/FavoriteFacility' ,
    FavouriteDoc:'/Doctors/FavoriteDoctor' ,
    FavFacs:'/Facilities/GetFavoriteFacilities?', 
    FavDocs:'/Doctors/GetFavoriteDoctors?' ,
    About:'/AboutUs/GetSocialAccounts'
};
export function endpoint(name) {
    return urls.serverUrl + endpoints[name];
}