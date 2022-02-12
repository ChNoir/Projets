
function DeltaFrameRate() {

    return (1 / GameConfig.FrameRate)

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var GameData = {
    
    Energie : 1000 ,
    Energie_max : 1000,

    Food : 0 , 

    Gold : 0 ,

    Stats : [
        { 
            name : "PV",
            stats : 100,
            stats_max : 100, 
        }
    ],

    Skills : [
        {
            name : "constitution" ,
            Game : { Lvl : 0 , Exp : 0 },
            Loop :  { Lvl : 0 , Exp : 0 },
        },
        {
            name : "force" ,
            Game : { Lvl : 0 , Exp : 0 },
            Loop :  { Lvl : 0 , Exp : 0 },
        },
        {
            name : "defense" ,
            Game : { Lvl : 0 , Exp : 0 },
            Loop :  { Lvl : 0 , Exp : 0 },
        },
        {
            name : "intelligence" ,
            Game : { Lvl : 0 , Exp : 0 },
            Loop :  { Lvl : 0 , Exp : 0 },
        },
        {
            name : "agilite" ,
            Game : { Lvl : 0 , Exp : 0 },
            Loop :  { Lvl : 0 , Exp : 0 },
        },
        {
            name : "charisme" ,
            Game : { Lvl : 0 , Exp : 0 },
            Loop :  { Lvl : 0 , Exp : 0 },
        },
        {
            name : "volonte" ,
            Game : { Lvl : 0 , Exp : 0 },
            Loop :  { Lvl : 0 , Exp : 0 },
        }
    ],

    Equipements : {
        Casque : {},
        Plastron : {},
        Gantelet : {},
        Arme_1 : {},
        Arme_2 : {},
        Bracelet : {} ,
        Collier : {}
    },

    p_tache : 0 ,
    taches : [],
    loop : [],
    usingtache: [
        { name : "Marche"                   ,max : 1 , use : 0 },
        { name : "Footing"                  ,max : 1 , use : 0 },
        { name : "Cource"                   ,max : 1 , use : 0 },
        { name : "Courire pour sa vie"      ,max : 1 , use : 0 },
        { name : "Cueillir des champignons" ,max : 1 , use : 0 },
        { name : "Discuter au cafe "        ,max : 1 , use : 0 },
        { name : "Draguer"                  ,max : 1 , use : 0 },
        { name : "Forge"                    ,max : 1 , use : 0 },
        { name : "vente"                    ,max : 1 , use : 0 },
        { name : "Entrainement"             ,max : 1 , use : 0 },
        { name : "Entrainement avance"      ,max : 1 , use : 0 },
        { name : "Combat de rue"            ,max : 1 , use : 0 },
        { name : "Combat amicale "          ,max : 1 , use : 0 }
    ]
   


};

// Clone GameData
var GameRestart = JSON.parse(JSON.stringify(GameData)) ;

var GameConfig = {

    FrameRate : 30 // FPS

}; 

var GameItem = {
    Equipements : {
        Casque : [
            {}
        ],
        Plastron : [
            {}
        ],
        Gantelet : [
            {}
        ],
        Arme_1 : [
            {}
        ],
        Arme_2 : [
            {}
        ],
        Bracelet : [
            {}
        ],
        Collier : [
            {}
        ]
    }
}


