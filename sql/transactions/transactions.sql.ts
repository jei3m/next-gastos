export const createTransaction = () => {
    return `CALL manage_transactions
            (
                :actionType,
                :uuid,
                :note,
                :amount,
                :type,
                :accountID,
                :categoryID,
                :userID,
                @response
            );
            SELECT @response AS response;`;
};

export const updateTransaction = () => {
    return `CALL manage_transactions
            (
                :actionType,
                :uuid,
                :note,
                :amount,
                :type,
                :accountID,
                :categoryID,
                :userID,
                @response
            );
            SELECT @response AS response;`;
};

export const deleteTransaction = () => {
    return `CALL manage_transactions
            (
                :actionType,
                :uuid,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                :userID,
                @response
            );
            SELECT @response AS response;`;
};