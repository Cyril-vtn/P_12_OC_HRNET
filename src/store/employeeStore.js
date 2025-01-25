import { create } from "zustand";
import { persist } from "zustand/middleware";

const useEmployeeStore = create(
  persist(
    (set) => ({
      employees: [],
      addEmployee: (employee) =>
        set((state) => ({
          employees: [...state.employees, employee],
        })),
      setEmployees: (employees) => set({ employees }),
    }),
    {
      name: "employee-storage",
    }
  )
);

export default useEmployeeStore;
