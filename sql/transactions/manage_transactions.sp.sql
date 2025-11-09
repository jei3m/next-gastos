DROP PROCEDURE IF EXISTS `manage_transactions`;

-- START Stored Procedure Script
DELIMITER $$
CREATE PROCEDURE `manage_transactions`(

    IN p_action_type ENUM('create', 'update', 'delete'),
	IN p_uuid CHAR(36),
	IN p_note VARCHAR(20),
	IN p_amount DECIMAL(12,2),
	IN p_type ENUM('income', 'expense'),
    IN p_time TIME,
    IN p_date DATE,
	IN p_ref_accounts_id CHAR(36),
	IN p_ref_categories_id CHAR(36),
	IN p_ref_user_id CHAR(36),

    OUT p_response JSON
)
main: BEGIN

    DECLARE v_affected_rows INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

	START TRANSACTION;

	CASE p_action_type

		WHEN 'create' THEN
			-- INSERT statement
			INSERT INTO transactions(
				uuid,
				note,
				amount,
				type,
                time,
                date,
				ref_categories_id,
				ref_user_id
			)
			VALUES(
				p_uuid,
				p_note,
				p_amount,
				p_type,
                p_time,
                p_date,
				p_ref_categories_id,
				p_ref_user_id
			);

			SET v_affected_rows = ROW_COUNT();

			IF v_affected_rows > 0 THEN
				SET p_response = JSON_OBJECT(
					'responseCode', 200,
					'responseMessage', 'Transaction Successfully Created'
				);
			ELSE
				SET p_response = JSON_OBJECT(
					'responseCode', 500,
					'responseMessage', 'Failed to Create Transaction'
				);
				LEAVE main;
			END IF;
			
		WHEN 'update' THEN
            -- Validate transaction uuid
            IF NOT EXISTS
            (
                SELECT 1
                FROM transactions
                WHERE uuid = p_uuid
                LIMIT 1
            )
            THEN
                SET p_response = JSON_OBJECT(
                    'responseCode', 404,
                    'responseMessage', 'Transaction not found with the specified UUID'
                );
                LEAVE main;
            END IF;

			UPDATE 
				transactions
			SET
				note = p_note,
				amount = p_amount,
				type = p_type,
                time = p_time,
                date = p_date,
				ref_categories_id = p_ref_categories_id
			WHERE
				uuid = p_uuid
				AND ref_user_id = p_ref_user_id
			LIMIT 1;

			SET v_affected_rows = ROW_COUNT();

            IF v_affected_rows > 0 THEN
                SET p_response = JSON_OBJECT(
                    'responseCode', 200,
                    'responseMessage', 'Transaction Updated Sucessfully'
                );
            ELSE  
                SET p_response = JSON_OBJECT(
                    'responseCode', 500,
                    'responseMessage', 'Failed to Update Transaction'
                );
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Failed to Update Transaction';
            END IF;

		WHEN 'delete' THEN
            -- Validate transaction uuid
            IF NOT EXISTS
            (
                SELECT 1
                FROM transactions
                WHERE uuid = p_uuid
                LIMIT 1
            )
            THEN
                SET p_response = JSON_OBJECT(
                    'responseCode', 404,
                    'responseMessage', 'Transaction not found with the specified UUID'
                );
                LEAVE main;
            END IF;

            -- DELETE query
            DELETE FROM
                transactions
            WHERE 
                uuid = p_uuid
                AND ref_user_id = p_ref_user_id
            LIMIT 1;

            SET v_affected_rows = ROW_COUNT();

            IF v_affected_rows > 0 THEN
                SET p_response = JSON_OBJECT(
                    'responseCode', 200,
                    'responseMessage', 'Transaction Deleted Successfully'
                );
            ELSE
                SET p_response = JSON_OBJECT(
                    'responseCode', 500,
                    'responseMessage', 'Failed to Delete Transaction'
                );
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Failed to Delete Transaction';
            END IF;

		ELSE
			SET p_response = JSON_OBJECT(
				'responseCode', 500,
				'responseMessage', 'Invalid Action Type'
			);
		LEAVE main;
	END CASE;

	COMMIT;
END $$
DELIMITER ;