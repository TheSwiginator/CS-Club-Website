import { FC, useRef, useContext, useState } from 'react';
import { LangContext } from '@/app/components/context/lang-context';
import { AuthContext } from '@/app/components/context/auth-context';
import Login from '@/app/components/core/login';
import LanguageSelect from './language-select';
import StyledButton from '@/app/components/core/styled-button';
import LangContent from '@/app/components/types/lang-content';
// import module styles


/*
The UMB CS Club hosted a "Resume Roast" event where students submitted their resumes to be critiqued by industry professionals. The event provided valuable feedback and advice to help students improve their resumes and increase their chances of success in the job market. Students were also able to network with professionals and learn about potential job opportunities.
*/

interface NavBarProps { 
    className?: string;
    ids: {[index:string]:string[]};
}

const testIcon = <svg className={`w-[15px] h-auto fill-transparent group-hover:fill-secondary-50 group-hover:transparent transition-all group-active:group-hover:fill-secondary-400`} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-138 0-251.5-75T53.145 582.923Q50 578 48.5 570.826 47 563.652 47 556t1.5-14.826Q50 534 53.145 529.077 115 406 228.5 331T480 256q138 0 251.5 75t175.355 198.077Q910 534 911.5 541.174 913 548.348 913 556t-1.5 14.826q-1.5 7.174-4.645 12.097Q845 706 731.5 781T480 856Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg>;



type NavItem = {
    label: LangContent;
    id: string;
    icon: React.ReactNode;
}

const NAVIGATION_IDS: NavItem[] = [
    {
        label: {
            "en": "About",
            "ja": "サークルニツイテ",
            "es": "AcercaDe"
        },
        id: "About",
        icon: testIcon,
    },
    {
        label: {
            "en": "Announcements",
            "ja": "オシラセ",
            "es": "Anuncios"
        },
        id: "Announcements",
        icon: testIcon,
    },
    {
        label: {
            "en": "Events",
            "ja": "イベント",
            "es": "Eventos"
        },
        id: "Events",
        icon: testIcon,
    },
    {
        label: {
            "en": "Officers",
            "ja": "ヤクイン",
            "es": "Oficiales"
        },
        id: "Officers",
        icon: testIcon,
    },
]

const NavBar: FC<NavBarProps> = ({ className, ids }) => {
    const { lang, setLang } = useContext(LangContext);
    const [ loginRevealed , setLoginRevealed ] = useState<boolean>(false);
    const { user, logOut } = useContext(AuthContext);
    const [ loginMouseHover, setLoginMouseHover ] = useState<boolean>(false);

    function smoothScroll(id: string){
        document.querySelector(`#${id}`)?.scrollIntoView({
            behavior: 'smooth'
        });
    }

    const LOGIN_ICON = <>{!user.uid ?
        <svg className={`w-[15px] h-auto fill-transparent group-hover:fill-secondary-50 group-hover:transparent  transition-all group-active:group-hover:fill-secondary-400 `} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M489 936v-60h291V276H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366 444l43-43 176 176-174 174Z"/></svg>
        :
        <svg className={`w-[15px] h-auto fill-transparent group-hover:fill-secondary-50 group-hover:transparent  transition-all group-active:group-hover:fill-red-400`} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z"/></svg>
    }</>

    return (
        <div className={`w-full h-auto flex justify-start flex-col md:flex-row md:justify-between items-center z-50 ${ className }`}>
            
            <div className="w-auto flex sm:flex-row gap-3 font-light">
            { NAVIGATION_IDS.map((item: NavItem, index: number) => {
                return (
                    <StyledButton key={`nav-item-${item.id}`} className="border-transparent text-lg text-secondary-100" onClick={() => smoothScroll(item.id)} icon={item.icon}>
                        {item.label[lang]}
                    </StyledButton>
                )
            }) }
            </div>
            <div className='w-auto h-auto flex items-center gap-2 pr-5 text-secondary-200 text-sm font-extrabold overflow-visible'>
                {
                    <StyledButton onMouseEnter={() => setLoginMouseHover(true)} onMouseLeave={() => setLoginMouseHover(false)} onClick={user.uid ? () => logOut && logOut() : () => setLoginRevealed(!loginRevealed)} className={`border-transparent text-lg ${!user.uid ? "hover:bg-primary-500 active:hover:bg-transparent active:hover:border-secondary-400 active:hover:text-secondary-400" : "hover:bg-red-400 active:hover:bg-transparent active:hover:border-red-400 active:hover:text-red-400"}`} icon={LOGIN_ICON}>
                    {!user.uid ? {
                    "en": "Login/Register",
                    "ja": loginMouseHover ? "ログイン/とうろく" : "ログイン/登録",
                    "es": "iniciar la sesión/registrarse"
                    }[lang] : {
                        "en": "Log Out",
                        "ja": loginMouseHover ? "ログインすみ" : "ログイン済み",
                    }[lang]}
                    </StyledButton>
                }
                { (loginRevealed && !user.uid) && <div className='absolute top-[60px] right-[25px] bg-secondary-900 bg-opacity-50 backdrop-blur-sm px-[20px] py-[15px] rounded-md shadow-xl'><Login /></div>}
                <div style={{height: user.uid ? "30px" : "0px"}} className="absolute right-0 bottom-0 translate-y-[40px] rounded-l-md text-sm font-light w-auto bg-secondary-900 transition-all overflow-clip px-[20px] flex items-center">
                    {{
                        "en": "Welcome, ",
                        "ja": "ようこそ、",
                    }[lang]}
                    {user.uid && user.email}
                </div>
                <LanguageSelect availableLanguages={["en", "ja", "es"]} />
            </div>
        </div>
    )
}

export default NavBar;