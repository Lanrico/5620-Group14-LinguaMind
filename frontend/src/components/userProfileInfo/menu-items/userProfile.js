// assets
import { LogoutOutlined } from '@ant-design/icons';

// icons
const icons = {
    LogoutOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
const userProfile = {
    id: 'group-UserProfile',
    title: 'Profile',
    type: 'group',
    children: [
        {
            id: 'Logout',
            title: 'Logout',
            type: 'item',
            url: '123/123123/123',
            icon: icons.LogoutOutlined,
            breadcrumbs: false
        }
    ]
};

export default userProfile;
