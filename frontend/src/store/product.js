// import { create } from "zustand";
// import axios from "axios"

// export const useProductStore = create((set) => ({
//     products: [],
//     setProducts: (products) => set({ products }),
//     createProduct: async (newProduct) => {
//         if (!newProduct.name || !newProduct.image || !newProduct.price) {
//             return { success: false, message: "Please fill in all fields." };
//         }
//         console.log(newProduct)
//         const res = await axios.post("http://localhost:5000/api/e-commerse-website/t",
//             // body:JSON.stringify(newProduct)
//             newProduct
        
//         )
//         console.log(res)
//         const data=await res.json();
//         set((state)=>({products:[...state.products,data.data]}))
//         return { success: true, message: "Product created successfully." };
//     }
// }));



import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/api/e-commerse-website",{
            method:"post",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        }
        )
        const data=await res.json();
        set((state)=>({products:[...state.products,data.data]}))
        return { success: true, message: "Product created successfully." };
    }
}));



