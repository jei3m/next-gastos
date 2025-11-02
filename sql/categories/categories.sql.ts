export const createCategory = () => {
    return `CALL manage_categories
            (
                :actionType,
                :uuid,
                :userID,
                :name,
                :type,
                :icon,
                @response
            );
            SELECT @response AS response;`
};

export const getCategories = () => {
    return `SELECT
                uuid,
                name,
                type,
                ref_user_id
            FROM 
                v_categories
            WHERE
                ref_user_id = :userID;`
};

export const updateCategory = () => {
    return `CALL manage_categories
            (
                :actionType,
                :uuid,
                :userID,
                :name,
                :type,
                :icon,
                @response
            );
            SELECT @response AS response;`
};

export const deleteCategory = () => {
    return `CALL manage_categories
            (
                :actionType,
                :uuid,
                :userID,
                NULL,
                NULL,
                NULL,
                @response
            );
            SELECT @response AS response;`
};