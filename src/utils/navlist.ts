let navList:any = [
    {
        name: 'navbar.home',
        icon: 'home',
        path:'/home'
    },
    {
        name: 'navbar.schedule',
        icon: 'arrange',
        path:'/test2',
        // disabled: true
    },
    {
        name: 'navbar.assets.assets',
        icon: 'goods',
        path: 'goods',
        subs: [
            { name: 'navbar.assets.warehousing', path:'/A' },
            { name: 'navbar.assets.borrow', path:'/B',disabled: true }
        ]
    },
    {
        name: 'navbar.employees.employees',
        icon: 'people',
        path: 'people',
        subs: [
            {
                name: 'navbar.employees.longTerm',
                path: 'people_A',
                subs: [
                    { name:'navbar.employees.joinOrExit', path:'/C',disabled: true },
                    { name: 'navbar.employees.assignment', path:'/lifecycle' }
                ]
            },
            {
                name: 'navbar.employees.shortTerm',
                path: 'people_B',
                subs: [
                    { name: 'navbar.employees.joinOrExit', path:'/test' },
                    { name: 'navbar.employees.assignment', path:'/E', 
                        subs: [
                            { name: 'navbar.employees.joinOrExit', path:'/F' },
                            { name: 'navbar.employees.assignment', path:'/G' }
                        ] 
                    }
                ]
            }
        ]
    }
]
export {
    navList
}