
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('employee', {
    state: () => ({
        employees: [
            { employeeId: 1, name: "Sibongile Nkosi" },
            { employeeId: 2, name: "Lungile Moyo" },
            { employeeId: 3, name: "Thabo Molefe" },
            { employeeId: 4, name: "Keshav Naidoo" },
            { employeeId: 5, name: "Zanele Khumalo" },
            { employeeId: 6, name: "Sipho Zulu" },
            { employeeId: 7, name: "Naledi Moeketsi" },
            { employeeId: 8, name: "Farai Gumbo" },
            { employeeId: 9, name: "Karabo Dlamini" },
            { employeeId: 10, name: "Fatima Patel" },
        ]
    }),
})