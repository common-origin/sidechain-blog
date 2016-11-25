var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sidechain Model
 * ==========
 */
var Sidechain = new keystone.List('Sidechain');

Sidechain.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Sidechain.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Sidechain.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
Sidechain.relationship({ ref: 'Review', path: 'reviews', refPath: 'author' });
Sidechain.relationship({ ref: 'Feature', path: 'features', refPath: 'author' });


/**
 * Registration
 */
Sidechain.defaultColumns = 'name, email, isAdmin';
Sidechain.register();
