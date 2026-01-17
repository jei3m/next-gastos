import {
  CreateCategory,
  EditCategory,
} from '@/types/categories.types';

export const fetchCategories = async (
  type: string | null,
  accountID: string | null,
  dateStart?: string | null,
  dateEnd?: string | null,
  filter?: string
) => {
  try {
    const params = new URLSearchParams();

    if (type) params.append('type', type);
    if (accountID) params.append('accountID', accountID);
    if (dateStart) params.append('dateStart', dateStart);
    if (dateEnd) params.append('dateEnd', dateEnd);
    if (filter) params.append('filter', filter);

    const res = await fetch(
      `/api/categories?${params.toString() || ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    console.error('fetchCategories error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to Fetch Categories');
  }
};

export const fetchCategoryByID = async (id: string) => {
  try {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'GET',
    });
    const data = await res.json();
    if (!data.success) {
      throw Error(data.message);
    }
    return data.data[0] || null;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
    throw Error('Failed to Fetch Category');
  }
};

export const createCategory = async (
  category: CreateCategory
) => {
  try {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    const data = await res.json();
    if (!data.success) {
      throw Error(data.message);
    }
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
    throw Error('Failed to Create Category');
  }
};

export const editCategory = async (
  id: string,
  category: EditCategory
) => {
  try {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    const data = await res.json();
    if (!data.success) {
      throw Error(data.message);
    }
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
    throw Error('Failed to Edit Category');
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!data.success) {
      throw Error(data.message);
    }
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
    throw Error('Failed to Delete Category');
  }
};
