import logo from './logo.jpg'
import dropdown_icon from './dropdown_icon.png'
import profile from './profile_icon.png'
import arrow_icon from "./arrow_icon.jpg"
import groups from './group_profiles.png'
import Care from './care.jpg'
import Cook from './Cook.jpg'
import Beauty from './Beauty.jpg'
import Laundry from './laundry.jpg'
import Repair from './Repair.jpg'
import Maid from './maid.jpg'
import banner from './banner_team2-removebg-preview.png'
import CookB from './CookB.png'
import pro1 from './Pro1.jpg'
import pro2 from './pro2.jpg'
import pro3 from './pro3.jpg'
import pro4 from './pro4.jpg'
import pro5 from './pro5.jpg'
import arrow_icon_svg from './arrow_icon.svg'
import chat_icon_svg from './chats_icon.svg'
import cross_icon from './cross_icon.png'
import dropdown_png from './dropdown_icon.png'
import dropdown_svg from './dropdown_icon.svg'
import group_profiles from './group_profiles.png'
import menu from './menu_icon.svg'
import profile_icon from './profile_icon.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import upload_area from './upload_area.png' 
import upload_icon from './upload_icon.png'
import verified_icon from './verified_icon.svg'

export const assets = {
    logo,
    dropdown_icon,
    profile,
    arrow_icon,
    groups,
    banner,
    CookB,
    arrow_icon_svg,
    chat_icon_svg,
    cross_icon,
    dropdown_png,
    dropdown_svg,
    group_profiles,
    menu,
    profile_icon,
    razorpay_logo,
    stripe_logo,
    upload_area,
    upload_icon,
    verified_icon
}

export const specialityData = [
    {
        speciality: 'Home Maintenance',
        image: Repair
    },
    {
        speciality: 'Maid Services',
        image: Maid
    },
    {
        speciality: 'Food Cooking',
        image: Cook
    },
    {
        speciality: 'Elder and Child Care',
        image: Care
    },
    {
        speciality: 'Laundry and Dry Clean',
        image: Laundry
    },
    {
        speciality: 'Beauty and Wellness',
        image: Beauty
    },
]

export const professionals = [
    {
        _id: 'pro1',
        name: 'John Doe',
        image: pro1,
        profession: 'Carpenter',
        experience: '5 Years',
        about: 'John is a skilled carpenter specializing in custom furniture, repairs, and home renovations. He ensures quality craftsmanship and customer satisfaction.',
        fees: 100,
        availability: 'Available',
        address: {
            line1: '10th Street',
            line2: 'Downtown, New York'
        }
    },
    {
        _id: 'pro2',
        name: 'Jane Smith',
        image: pro2,
        profession: 'Plumber',
        experience: '7 Years',
        about: 'Jane is an experienced plumber handling pipe installations, leak repairs, and bathroom fittings efficiently.',
        fees: 80,
        availability: 'Busy',
        address: {
            line1: '25th Avenue',
            line2: 'Uptown, Chicago'
        }
    },
    {
        _id: 'pro3',
        name: 'Michael Johnson',
        image: pro3,
        profession: 'Electrician',
        experience: '6 Years',
        about: 'Michael is an expert electrician providing wiring, circuit repair, and home automation services with precision.',
        fees: 90,
        availability: 'On Leave',
        address: {
            line1: '5th Main',
            line2: 'West End, Los Angeles'
        }
    },
    {
        _id: 'pro4',
        name: 'Emily Davis',
        image: pro4,
        profession: 'Beautician',
        experience: '4 Years',
        about: 'Emily offers professional beauty services including makeup, skincare treatments, and hairstyling.',
        fees: 70,
        availability: 'Available',
        address: {
            line1: 'Greenwood Complex',
            line2: 'Midtown, San Francisco'
        }
    },
    {
        _id: 'pro5',
        name: 'Grace Wilson',
        image: pro5,
        profession: 'Maid',
        experience: '3 Years',
        about: 'Robert provides reliable home cleaning, laundry, and household maintenance services.',
        fees: 50,
        availability: 'Available',
        address: {
            line1: 'Elm Street',
            line2: 'Suburb, Houston'
        }
    },
    {
        _id: 'pro6',
        name: 'Robert Kora',
        image: pro5,
        profession: 'Electrician',
        experience: '3 Years',
        about: 'Robert is an expert electrician providing wiring, circuit repair, and home automation services with precision.',
        fees: 50,
        availability: 'Available',
        address: {
            line1: 'Elm Street',
            line2: 'Suburb, Houston'
        }
    }
];

