# User Table

| Attribute    | Data Type      | Constraints                 | Description                         |
| ------------ | -------------- | --------------------------- | ----------------------------------- |
| `id`         | `SERIAL`       | Primary key, Auto-increment | Unique identifier for each user     |
| `email`      | `VARCHAR(255)` | Unique, Not null            | Email address of the user           |
| `password`   | `VARCHAR(255)` | Not Null                    | Encrypted password of the user      |
| `created_at` | `TIMESTAMP`    | Default: `NOW()`            | Timestamp when the user was created |

# Device Table

| Attribute    | Data Type   | Constraints                 | Description                                                     |
| ------------ | ----------- | --------------------------- | --------------------------------------------------------------- |
| `id`         | `SERIAL`    | Primary key, Auto-increment | Unique identifier for each device                               |
| `user_id`    | `INTEGER`   | Not null                    | Unique identifier of the user(users table) that owns the device |
| `name`       | `TEXT`      | Not Null                    | Encrypted password of the user                                  |
| `created_at` | `TIMESTAMP` | Default: `NOW()`            | Timestamp when the user was created                             |
