import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faTrashCan as farTrashCan,
    faXmarkCircle,
    faCircleCheck,
    faCircleXmark as farCircleXmark,
    faSun as farSun,
    faCalendar,
    faUser,
    faEnvelope,
    
} from "@fortawesome/free-regular-svg-icons";

import {faPhone,faLocationDot,faFileInvoice, faPerson,faGear, faGraduationCap, faRightToBracket,faArrowDown, faChevronDown,faFilePen, faPencilAlt, faEllipsis, faTrashCan, faCircleXmark, faTrash, faArrowsUpToLine, faFileArrowUp, faPlus, faMagnifyingGlass, faBars, faTriangleExclamation, faCircleInfo, faXmark, faMoon, faDesktopAlt, faDesktop, faSun, faAngleLeft, faAngleRight, faLock } from "@fortawesome/free-solid-svg-icons";
import App from './App.vue'
import router from './router'
import "./interceptors/axios";



library.add(
    faPerson,
    faFileInvoice,
    faAngleLeft,
    faAngleRight,
    faLock,
    // faEnvelope,
    faGear,
    faPhone,
    faLocationDot,
    faGraduationCap,
    faEnvelope,
    faArrowDown,
    faRightToBracket,
    faFilePen,
    faUser,
    faEllipsis,
    faTrashCan,
    faPencilAlt,
    faChevronDown,
    faTrash,
    faFileArrowUp,
    farTrashCan,
    faArrowsUpToLine,
    faPlus,
    faCalendar,
    faMagnifyingGlass,
    faDesktop,
    faDesktopAlt,
    faBars,
    faMoon,
    faXmarkCircle,
    faSun,
    faCircleXmark,
    farSun,
    faCircleCheck,
    faTriangleExclamation,
    farCircleXmark,
    faCircleInfo,
    faXmark
)
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
