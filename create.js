const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let schema = `
 create table songs(
 id integer primary key,
 unit_id integer not null,
 title text not null,
 level integer not null,
 combo integer not null
 );
`


db.serialize( () => {
	db.run( schema, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "テーブルを作成しました" );
	});
});
