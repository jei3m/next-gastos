DROP PROCEDURE IF EXISTS `transfer_transaction`;

-- START Stored Procedure Script
DELIMITER $$
CREATE PROCEDURE `transfer_transaction`(
    IN p_action_type ENUM('create'),
	IN p_id CHAR(36),
	IN p_note VARCHAR(30),
	IN p_amount DECIMAL(12,2),
    IN p_time TIME,
    IN p_date DATE,
	IN p_ref_accounts_id CHAR(36),
	IN p_transfer_to_account_id CHAR(36),
	IN p_ref_user_id CHAR(36),

    OUT p_response JSON
)
main: BEGIN

    DECLARE v_affected_rows INT;
    DECLARE v_total_balance DECIMAL(12,2);
    DECLARE v_income_categories_id, v_expense_categories_id CHAR(36);
	DECLARE v_transfer_to_account_name VARCHAR(10);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

	START TRANSACTION;

	CASE p_action_type

		WHEN 'create' THEN
            -- Get total_balance from accounts
            SELECT
                total_balance
            INTO
                v_total_balance
            FROM
                accounts
            WHERE
                id = p_ref_accounts_id
                AND ref_user_id = p_ref_user_id
            LIMIT 1;

            -- Validate total_balance
            IF v_total_balance + (p_amount * -1) < 0 THEN
                SET p_response = JSON_OBJECT(
                    'responseCode', 500,
                    'responseMessage', 'Amount exceeds the account''s total balance'
                );
                LEAVE main;
            END IF;

			-- Get both transfer categories id
			SELECT 
				MAX(CASE WHEN type = 'income' THEN id END) AS income_id,
				MAX(CASE WHEN type = 'expense' THEN id END) AS expense_id
			INTO 
				v_income_categories_id, 
				v_expense_categories_id
			FROM 
				categories
			WHERE
				ref_user_id = p_ref_user_id
				AND name = 'Transfer'
				AND type IN ('income', 'expense')
			GROUP BY name;

			-- Check if income and expense transfer category exists
			IF (v_income_categories_id IS NULL OR v_expense_categories_id IS NULL) THEN
				SET p_response = JSON_OBJECT(
					'responseCode', 500,
					'responseMessage', 'You need to create both income and expense categories with the name "Transfer"'
				);
				LEAVE main;
			END IF;

            -- INSERT statement
			INSERT INTO transactions(
				id,
				note,
				amount,
				type,
                time,
                date,
                ref_accounts_id,
				ref_categories_id,
				ref_user_id
			)
			VALUES(
				p_id,
				p_note,
				p_amount,
				'expense',
                p_time,
                p_date,
                p_ref_accounts_id,
				v_expense_categories_id,
				p_ref_user_id
			);

			SET v_affected_rows = ROW_COUNT();

			IF v_affected_rows > 0 THEN
                -- Add or subtract to accounts total_balance
                UPDATE
                    accounts
                SET
                    total_balance = v_total_balance + (p_amount * -1)
                WHERE
                    id = p_ref_accounts_id
                    AND ref_user_id = p_ref_user_id
                LIMIT 1;

				-- Get name of receiving account
				SELECT name
				INTO v_transfer_to_account_name
				FROM accounts
				WHERE
					ref_user_id = p_ref_user_id
					AND id = p_ref_accounts_id
				LIMIT 1;

				-- Create new transaction at receiving account
				CALL manage_transactions(
					'create',
					UUID(),
					CONCAT('Transferred from: ', v_transfer_to_account_name),
					p_amount,
					'income',
					p_time,
					p_date,
					p_transfer_to_account_id,
					v_income_categories_id,
					p_ref_user_id,
					@response
				);

				SET p_response = JSON_OBJECT(
					'responseCode', 200,
					'responseMessage', 'Transaction Successfully Transferred'
				);
			ELSE
				SET p_response = JSON_OBJECT(
					'responseCode', 500,
					'responseMessage', 'Failed to Transfer Transaction'
				);
				LEAVE main;
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