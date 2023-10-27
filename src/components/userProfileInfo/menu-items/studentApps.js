// assets
import { LoginOutlined, ProfileOutlined, HistoryOutlined, HeartOutlined, LikeOutlined, TranslationOutlined, ReconciliationOutlined, FormOutlined, CloudUploadOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    HistoryOutlined,
    HeartOutlined,
    LikeOutlined,
    TranslationOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

// const studentApps = {
//     id: 'Apps',
//     title: 'Apps',
//     type: 'group',
//     children: [
//         {
//             id: 'AI_translation',
//             title: 'AI translation',
//             type: 'item',
//             url: 'AI_translation',
//             icon: icons.TranslationOutlined,
//         },
//         {
//             id: 'AI_schedule',
//             title: 'AI schedule',
//             type: 'item',
//             url: 'AI_schedule',
//             icon: icons.HeartOutlined,
//         },
//         {
//             id: 'AI_polish',
//             title: 'AI polish',
//             type: 'item',
//             url: 'AI_polish',
//             icon: icons.LikeOutlined,
//         }
//     ]
// };

const studentApps = {
    id: 'Apps',
    title: 'Apps',
    type: 'group',
    children: [
        {
            id: 'AI_translation',
            title: 'AI translation',
            type: 'item',
            url: 'AI_translation',
            icon: icons.TranslationOutlined,
        },
    
        {
            id: 'AI_schedule',
            title: 'AI schedule',
            type: 'item',
            url: 'AI_schedule',
            icon: icons.HeartOutlined,
        },
        {
            id: 'AI_polish',
            title: 'AI polish',
            type: 'item',
            url: 'AI_polish',
            icon: icons.LikeOutlined,
        }
    ]
};

export default studentApps;
