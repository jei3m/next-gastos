export interface Category {
    id: number,
    uuid: string,
    name: string,
    type: string
};

export interface CreateCategory {
    name: string,
    type: string
};

export interface EditCategory {
    name: string,
    type: string
};