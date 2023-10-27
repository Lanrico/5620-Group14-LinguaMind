// project import
import adminApps from './adminApps';
import studentApps from './studentApps';
import teacherApps from './teacherApps';
import userProfile from './userProfile';


// ==============================|| MENU ITEMS ||============================== //
const menuItems = {
    adminItems: [adminApps],
    // studentItems: [userProfile, studentApps],
    studentItems: [adminApps],
    teacherItems: [userProfile, teacherApps]
    // items: [userProfile, studentApps, config, support],
};

export default menuItems;
