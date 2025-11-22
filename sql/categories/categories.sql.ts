export const createCategory = () => {
    return `CALL manage_categories
            (
                :actionType,
                :id,
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
                id,
                icon,
                name,
                type,
                totalAmount,
                refUserID,
                refAccountsID
            FROM 
                v_categories
            WHERE
                refUserID = :userID
                AND refAccountsID = :accountID
                AND (:filter IS NULL OR type = :filter);`
};

export const getCategoryByID = () => {
    return `SELECT
                id,
                name,
                type,
                icon,
                refUserID
            FROM 
                v_categories
            WHERE
                refUserID = :userID
                AND id = :id;`
};

export const updateCategory = () => {
    return `CALL manage_categories
            (
                :actionType,
                :id,
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
                :id,
                :userID,
                NULL,
                NULL,
                NULL,
                @response
            );
            SELECT @response AS response;`
};