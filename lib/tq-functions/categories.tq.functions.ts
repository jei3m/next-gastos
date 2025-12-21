import {
	CreateCategory,
	EditCategory
} from "@/types/categories.types";
import { useQueryClient } from "@tanstack/react-query";

export const fetchCategories = async (
	filter: string | null,
	accountID: string,
	dateStart?: string,
	dateEnd?: string
) => {
	try {
		const res = dateStart && dateEnd
			? await fetch(`/api/categories?filter=${filter}&accountID=${accountID}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
				method: 'GET',
			}) // For categories page
			: await fetch(`/api/categories?filter=${filter}&accountID=${accountID}`,{
				method: 'GET',
			}); // For dropdown select
		const data = await res.json();
    if (!data.success) {
      throw Error(data.message)
    };
		return (data.data);
	} catch (error) {
		if (error instanceof Error) {
			throw Error(error.message)
		};
		throw Error('Failed to Fetch Categories');
	}
};

export const fetchCategoryByID = async (id: string) => {
	try {
		const res = await fetch(`/api/categories/${id}`, {
			method: 'GET',
		});
		const data = await res.json();
    if (!data.success) {
      throw Error(data.message)
    };
		return (data.data)
	} catch (error) {
		if (error instanceof Error) {
			throw Error(error.message)
		};
		throw Error('Failed to Fetch Category');
	}
};

export const createCategory = async (category: CreateCategory) => {
	try {
		const res = await fetch('/api/categories', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(category)
		});
		const data = await res.json();
    if (!data.success) {
      throw Error(data.message)
    };
		return (data.data);
	} catch (error) {
		if (error instanceof Error) {
			throw Error(error.message);
		};
		throw Error('Failed to Create Category');
	};
};

export const editCategory = async (id: string, category: EditCategory) => {
	const queryClient = useQueryClient();
	try {
		const res = await fetch(`/api/categories/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(category)
		});
		const data = await res.json();
    if (!data.success) {
      throw Error(data.message)
    };
		queryClient.invalidateQueries({
			queryKey: ['categories'],
		});
		return (data.data);
	} catch (error) {
		if (error instanceof Error) {
			throw Error(error.message);
		};
		throw Error('Failed to Edit Category');
	};
};

export const deleteCategory = async (id: string) => {
	try {
		const res = await fetch(`/api/categories/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await res.json();
    if (!data.success) {
      throw Error(data.message)
    };
		return (data.data);
	} catch (error) {
		if (error instanceof Error) {
			throw Error(error.message);
		};
		throw Error('Failed to Delete Category');
	};
};