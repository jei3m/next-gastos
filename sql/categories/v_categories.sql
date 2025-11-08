CREATE OR REPLACE VIEW `v_categories` AS

/* Select Query */
SELECT 
    uuid,
    name,
    type,
    icon,
    ref_user_id
FROM 
    categories;
/* END Select Query */