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
                uuid,
                name,
                type,
                icon,
                refUserID
            FROM 
                v_categories
            WHERE
                refUserID = :userID
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