const UserModel = (sequelize, type) => {
    return sequelize.define('user', {
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notNull: { msg: "Field is required!" }
            },
        },
        password: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Field is required!" }
            },
        },
        firstName: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Field is required!" }
            },
        },
        lastName: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Field is required!" }
            },
        },
        fullName: {
            type: type.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`
            }
        },
        isVerified: {
            type: type.BOOLEAN,
            defaultValue: false,
        }
    });
}

export default UserModel;