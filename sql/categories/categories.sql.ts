export const createCategory = () => {
    return `CALL manage_categories
            (
                :actionType,
                :uuid,
                :userID,
                :accountID,
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
                icon,
                ref_user_id
            FROM 
                v_categories
            WHERE
                ref_user_id = :userID
                AND ref_accounts_id = :accountID
                AND (:filter IS NULL OR type = :filter);`
};

export const getCategoryByID = () => {
    return `SELECT
                uuid,
                name,
                type,
                icon,
                ref_user_id
            FROM 
                v_categories
            WHERE
                ref_user_id = :userID
                AND uuid = :uuid;`
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