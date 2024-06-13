import { CiSearch } from "react-icons/ci";
import { FaBookmark, FaRegBookmark, FaRegUser, FaSearch, FaUser } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineBell, HiOutlineMail } from "react-icons/hi";
import { MdEmail, MdFeaturedPlayList, MdHomeFilled, MdOutlineFeaturedPlayList, MdPeople, MdPeopleOutline } from "react-icons/md";
import { PiBellFill, PiDotsThreeCircle } from "react-icons/pi";
import { RiCheckboxIndeterminateFill, RiCheckboxIndeterminateLine } from "react-icons/ri";


export const data = [
    {
        name: "Home",
        icon: <GrHomeRounded />,
        activeIcon: <MdHomeFilled/>,
        link: '/home'
    },
    {
        name: "Explore",
        icon: <CiSearch />,
        activeIcon: <FaSearch />,
        link: '/explore'
    },
    {
        name: "Notifications",
        icon: <HiOutlineBell />,
        activeIcon: <PiBellFill />,
        link: '/notifications'
    },
    {
        name: "Messages",
        icon: <HiOutlineMail />,
        activeIcon: <MdEmail />,
        link: '/messages'
    },
    {
        name: "Grok",
        icon: <RiCheckboxIndeterminateLine />,
        activeIcon: <RiCheckboxIndeterminateFill />,
        link: '/grok'
    },
    {
        name: "Lists",
        icon: <MdOutlineFeaturedPlayList />,
        activeIcon: <MdFeaturedPlayList />,
        link: '/lists'
    },
    {
        name: "Bookmarks",
        icon: <FaRegBookmark />,
        activeIcon: <FaBookmark />,
        link: '/bookmarks'
    },
    {
        name: "Communities",
        icon: <MdPeopleOutline />,
        activeIcon: <MdPeople />,
        link: '/communities'
    },
    {
        name: "Premium",
        icon: <FaXTwitter />,
        activeIcon: <FaXTwitter />,
        link: '/premium'
    },
    {
        name: "Profile",
        icon: <FaRegUser />,
        activeIcon: <FaUser />,
        link: '/profile'
    },
    {
        name: "More",
        icon: <PiDotsThreeCircle />,
    },
]