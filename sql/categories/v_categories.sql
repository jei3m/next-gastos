CREATE OR REPLACE VIEW `v_categories` AS

/* Select Query */
SELECT 
    c.uuid,
	c.icon,
    c.name,
    c.type,
    SUM(t.amount) AS totalAmount,
    c.ref_user_id AS refUserID,
    c.ref_accounts_id AS refAccountsID
FROM categories c
LEFT JOIN transactions t ON c.uuid = t.ref_categories_id
GROUP BY
    c.uuid,
	c.icon,
    c.name,
    c.type,
    c.ref_user_id,
    c.ref_accounts_id;
/* END Select Query */