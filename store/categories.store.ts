import {
    CreateCategory,
    EditCategory
} from "@/types/categories.types";

export const fetchCategories = async(filter: string | null, accountID: string) => {
    try {
        const res = filter 
            ? await fetch(`/api/categories?filter=${filter}&accountID=${accountID}`)
            : await fetch(`/api/categories?accountID=${accountID}`);
        const data = await res.json();
        return(data.data);
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        };
        throw Error('Failed to Fetch Categories');
    }
};

export const fetchCategoryByID = async (id:string) => {
    try {
        const res = await fetch(`/api/categories/${id}`);
        const data = await res.json();
        return(data.data)
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        };
        throw Error('Failed to Fetch Category');
    }
};

export const createCategory = async(category: CreateCategory) => {
    try {
        const res = await fetch('/api/categories', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(category)
        });
        const data = await res.json();
        if(!res.ok) throw Error(data.message);
        return(data.data);
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message);
        };
        throw Error('Failed to Create Category');
    };
};

export const editCategory = async(id:string, category: EditCategory) => {
    try {
        const res = await fetch(`/api/categories/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(category)
        });
        const data = await res.json();
        if(!res.ok) throw Error(data.message);
        return(data.data);
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message);
        };
        throw Error('Failed to Edit Category');
    };
};

export const deleteCategory = async(id:string) => {
    try {
        const res = await fetch(`/api/categories/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await res.json();
        if(!res.ok) throw Error(data.message);
        return(data.data);
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message);
        };
        throw Error('Failed to Delete Category');
    };
};