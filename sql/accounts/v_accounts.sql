CREATE OR REPLACE VIEW `v_accounts` AS

/* Select Query */
SELECT 
    id,
    ref_user_id,
    name,
    type,
    description
FROM 
    accounts;
/* END Select Query */