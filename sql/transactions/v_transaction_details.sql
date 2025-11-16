CREATE OR REPLACE VIEW `v_transaction_details` AS

/* Select Query */
SELECT
  t.uuid,
  t.note,
  t.amount,
  t.type,
  t.time,
  t.date,
  c.uuid AS refCategoriesID,
  t.ref_user_id AS refUserID
FROM
  transactions t 
LEFT JOIN categories c ON t.ref_categories_id = c.uuid;
/* END Select Query */