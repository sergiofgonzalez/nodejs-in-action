# 03: Advanced Types &mdash; Creating Intersection Types
> introducing intersection types

## Exercise 6.03

You are building a user management system for an e-commerce application. You have received the requirements for the user profiles that will be interacting with the system.

You will use *intersection types* to build the user types, so to follow the *DRY* principle.
+ Basic user &mdash; with properties `_id`, `email` and `token`.
+ Admin user &mdash; who will be able to access pages not accessible to a normal user. The user will have the additional properties `accessPages` and `lastLogin`.
+ Backup user &mdash; who will operate the system backups and will features the properties `lastBackup` and `BackupLocation`.

You will define two variables to represent two users leveraging intersection types:
+ `joeAdmin` &mdash; who will merge the properties of a basic user and an admin.
+ `janeOps` &mdash; who will merge the properties of a basic user and the properties of the Backup user described above.