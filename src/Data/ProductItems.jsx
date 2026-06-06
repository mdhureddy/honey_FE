//Customer data for products
import multiFlowerImg1 from '../Assets/MultiFloer/img1.png';
import multiFlowerImg2 from '../Assets/MultiFloer/img2.png';
import multiFlowerImg3 from '../Assets/MultiFloer/img3.png';


import jamunHoneyImg1 from '../Assets/JamunHoney/img1.png'
import jamunHoneyImg2 from '../Assets/JamunHoney/img2.png'
import jamunHoneyImg3 from '../Assets/JamunHoney/img3.png'
export const items=[
    {
        "Multi Flower":[
            {
                id:1,
                name:'Multi Flower Honey',
                quantity:'500gm(1/2kg)',
                final_price:299,
                tags:['Unprocessed','Healthy','RAW Natural'],
                benefits:['Boosts Immunity','Helps in Reducing Blood Pressure','Reduces Body Weight','Rich in Nutrients and Antioxidants'],
                images:[multiFlowerImg1, multiFlowerImg2, multiFlowerImg3],
            },{
                id:2,
                name:'Multi Flower Honey',
                quantity:'1000gm(1kg)',
                final_price:599,
                tags:['Unprocessed','Healthy','RAW Natural'],
                benefits:['Boosts Immunity','Helps in Reducing Blood Pressure','Reduces Body Weight','Rich in Nutrients and Antioxidants'],
                 images:[multiFlowerImg1, multiFlowerImg2, multiFlowerImg3],
            }
        ]
    },
    {
        "jamun_Honey":[
            {
                id:1,
                name:'Jamun Honey',
                quantity:'500gm(1/2kg)',
                final_price:349,
                // original_price:499,
                // discount:30,
                tags:['Natural','Pure','Healthy'],
                benefits:['Good for Sugar(Diabetes) Patients','Heart Health','Helps in Reducing Bad Fat (Cholesterol)','Useful for Throat Infections,Cold abd Cough','Increase Disease Resistance (Immunity)'],
                images:[jamunHoneyImg1,jamunHoneyImg2,jamunHoneyImg3],
            },
            {
                id:2,
                name:'Jamun Honey',
                quantity:'1000gm(1Kg)',
                final_price:689,
                // original_price:689,
                // discount:30,
                tags:['Natural','Pure','Healthy'],
                benefits:['Good for Sugar(Diabetes) Patients','Heart Health','Helps in Reducing Bad Fat (Cholesterol)','Useful for Throat Infections,Cold abd Cough','Increase Disease Resistance (Immunity)'],
                images:[jamunHoneyImg1,jamunHoneyImg2,jamunHoneyImg3],
            },
        ]
    },{
        "neem_Honey":[
            {
                id:1,
                name:"Neem Honey",
                quantity:'500gm(1/2kg)',
                final_price:349,
                // original_price:499,
                // discount:30,
                tags:['Raw Honey','Unprocessed','Pure'],
                benefits:['Good for sugar (diabetes) patients and obesity','Helps relieve cold-related problems and allergies','Prevents blood clotting problems'],
                images:[],

            },
            {
                id:2,
                name:"Neem Honey",
                quantity:'1000gm(1kg)',
                final_price:689,
                // original_price:499,
                // discount:30,
                tags:['Raw Honey','Unprocessed','Pure'],
                benefits:['Good for sugar (diabetes) patients and obesity','Helps relieve cold-related problems and allergies','Prevents blood clotting problems'],
                images:[],

            }
        ]
    },
    {
        "GingerHoney":[
            {
                id:1,
                name:"Ginger Honey",
                quantity:'500gm(1/2kg)',
                final_price:349,
                tags:['Pure Natural','RAW',"Unprocessed"],
                benefits:['Helps Reduce joint pain','Body pain','Throat Infection','Chest Congestion','Helps in Reducing Body weight','Useful for Acidity,Gas, and Indigestion Problems','Helps Relieve Vomiting and Constipation Problems'],
                images:[],

            },{
                id:2,
                name:"Ginger Honey",
                quantity:'1000gm(1kg)',
                final_price:689,
                tags:['Pure Natural','RAW',"Unprocessed"],
                benefits:['Helps Reduce joint pain','Body pain','Throat Infection','Chest Congestion','Helps in Reducing Body weight','Useful for Acidity,Gas, and Indigestion Problems','Helps Relieve Vomiting and Constipation Problems'],
                images:[],

            }
        ]
    }


]
