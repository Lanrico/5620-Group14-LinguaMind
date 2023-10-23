// assets
import { LoginOutlined, ProfileOutlined, HistoryOutlined, HeartOutlined, LikeOutlined } from '@ant-design/icons';

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
        {
            id: 'maintenance',
            title: 'Maintenance',
            type: 'item',
            url: 'maintenance',
            icon: icons.HistoryOutlined,
        },
        {
            id: 'permission_management',
            title: 'Permission management',
            type: 'item',
            url: 'permission_management',
            icon: icons.HeartOutlined,
        },
        {
            id: 'software_update',
            title: 'Software update',
            type: 'item',
            url: 'software_update',
            icon: icons.LikeOutlined,
        }
    ]
};

export default adminApps;
