// assets
import { LoginOutlined, ProfileOutlined, HistoryOutlined, HeartOutlined, LikeOutlined, ReconciliationOutlined, FormOutlined, CloudUploadOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    HistoryOutlined,
    HeartOutlined,
    LikeOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const adminApps = {
    id: 'Apps',
    title: 'Apps',
    type: 'group',
    children: [
        // {
        //     id: 'maintenance',
        //     title: 'Maintenance',
        //     type: 'item',
        //     url: 'maintenance',
        //     icon: icons.HistoryOutlined,
        // },
        // {
        //     id: 'permission_management',
        //     title: 'Permission management',
        //     type: 'item',
        //     url: 'permission_management',
        //     icon: icons.HeartOutlined,
        // },
        // {
        //     id: 'software_update',
        //     title: 'Software update',
        //     type: 'item',
        //     url: 'software_update',
        //     icon: icons.LikeOutlined,
        // },
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: 'dashboard',
            icon: ReconciliationOutlined,
        },
        {
            id: 'profile-mgt',
            title: 'Account MGT',
            type: 'item',
            url: 'profile-mgt',
            icon: FormOutlined,
        },
        {
            id: 'version',
            title: 'Version',
            type: 'item',
            url: 'version',
            icon: CloudUploadOutlined,
        },
    ]
};

export default adminApps;
