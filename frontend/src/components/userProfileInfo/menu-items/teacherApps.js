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

const teacherApps = {
    id: 'Apps',
    title: 'Apps',
    type: 'group',
    children: [
        {
            id: 'AI_notification',
            title: 'AI notification',
            type: 'item',
            url: 'AI_notification',
            icon: icons.HistoryOutlined,
        },
        {
            id: 'AI_schedule',
            title: 'AI schedule',
            type: 'item',
            url: 'AI_schedule',
            icon: icons.HeartOutlined,
        },
        {
            id: 'AI_email',
            title: 'AI email',
            type: 'item',
            url: 'AI_email',
            icon: icons.LikeOutlined,
        }
    ]
};

export default teacherApps;
