// import { toQuery } from "@/lib/utils";

const ROOTS = {
    AUTH: '/auth',
    ROOT: '/',
    DASHBOARD: '/',
};




const Paths = {
    home: {
        root: ROOTS.ROOT,
    },
    auth: {
        root: ROOTS.AUTH,
        login: `${ROOTS.AUTH}login`,
    },
    dashboard: {
        root: ROOTS.DASHBOARD,
        loans: {
            root: `${ROOTS.DASHBOARD}loans`,
            create: () => `${ROOTS.DASHBOARD}new`,
            view: (loan_id: string) => `${ROOTS.DASHBOARD}loans/${loan_id}`,
        },
        settings: {
            root: `${ROOTS.DASHBOARD}settings`,
        },
    },



}

export {
    Paths,
    ROOTS

}
