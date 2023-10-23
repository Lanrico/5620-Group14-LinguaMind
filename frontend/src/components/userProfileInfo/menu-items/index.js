// project import
import adminApps from './adminApps';
import studentApps from './studentApps';
import teacherApps from './teacherApps';
import userProfile from './userProfile';


// ==============================|| MENU ITEMS ||============================== //
const menuItems = {
    adminItems: [userProfile, adminApps],
    studentItems: [userProfile, studentApps],
    teacherItems: [userProfile, teacherApps]
    // items: [userProfile, studentApps, config, support],
};

export default menuItems;
