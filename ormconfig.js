module.exports = [
	{
		name: 'migration_local',
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: '123456',
		database: 'wedding',
		entities: [`src/entities/*{.ts,.js}`],
		synchronize: true,
		logging: true,
		migrations: [`src/migrations/*.ts`]
	}
];
