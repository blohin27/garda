Вопрос  Нужно для пользователя с логином ivankrasnov найти созданные им шаблоны

CREATE TABLE `templates` (
                             `template_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                             `template_type` ENUM('TEMPLATE1', 'TEMPLATE2', 'TEMPLATE3') NOT NULL,
                             `name` VARCHAR(120) NOT NULL COMMENT 'Название шаблона' ,
                             `description` VARCHAR(255) NULL COMMENT 'Описание шаблона' ,
                             `json_id` INT UNSIGNED NOT NULL COMMENT 'Ссылка на JSON структуру' ,
                             `ts` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                             PRIMARY KEY (`template_id`),
                             UNIQUE KEY `json`(`json_id`),
                             UNIQUE KEY `unique_name_type` (`name`, `template_type`)
) ENGINE = InnoDB;

CREATE TABLE `json` (
                        `id` INT UNSIGNED NULL PRIMARY KEY AUTO_INCREMENT ,
                        `json_f` MEDIUMTEXT NOT NULL COMMENT 'json формат',
                        `create_ts` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Время добавления json',
                        `create_user_id` INT UNSIGNED NULL DEFAULT NULL COMMENT 'Пользователь, добавивший json'
) ENGINE = InnoDB;


CREATE TABLE `users` (
                         `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Идентификатор пользователя' ,
                         `user_name` VARCHAR(40) NOT NULL COMMENT 'Логин пользователя' ,
                         PRIMARY KEY (`user_id`))
    ENGINE = InnoDB
COMMENT = 'Пользователи системы';

Ответ
SELECT
    t.name AS template_name,
    j.json_f,
    u.user_name
FROM
    templates t
        JOIN json j ON t.json_id = j.id
        JOIN users u ON j.create_user_id = u.user_id
WHERE
    u.user_name = 'ivankrasnov';
